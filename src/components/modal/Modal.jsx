import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers, setPlayers } from "../../features/player/playerSlice";
import { getSelectedPlayer, getTeam, setNewTeam, updateTeam } from "../../features/team/teamSlice";
import { formatData } from "../../utlis/formatPlayerData";
import { getPlayer } from "../../apis/getPlayer";
import Select from "react-select";
import { styles } from "./modalStyle";
import Swal from 'sweetalert2'

const Modal = ({ defaultValue, open }) => {
  const players = useSelector(getPlayers);

  const teams = useSelector(getTeam)
  const selectedPlayer = useSelector(getSelectedPlayer)
  const valRef = useRef();

  const dispatch = useDispatch();

  const [team, setTeam] = useState({
    id: "",
    name: "",
    player_count: 0,
    region: "",
    country: "",
    players: [],
  });

  const { data, isLoading, isSuccess, fetchNextPage, isError } =
    useInfiniteQuery("players", ({ pageParam = 0 }) => getPlayer(pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    });

  const enterTextField = (key, value) => {
    setTeam((prev) => ({ ...prev, [key]: value }));
  };

  const handleChange = (e) => {
    setTeam((prev) => ({
      ...prev,
      players: Array.isArray(e)
        ? e.map((x) => ({ id: x.value, name: x.label }))
        : [],
      player_count: Array.isArray(e)
        ? e.map((x) => ({ id: x.value, name: x.label })).length
        : 0,
    }));
  };

  const clearData = () => {
    setTeam({
      id: "",
      name: "",
      player_count: 0,
      region: "",
      country: "",
      players: [],
    });
  };

  const createTeam = () => {
    if (Object.keys(defaultValue).length === 0) {
      if (
        team.name !== "" &&
        team.region !== "" &&
        team.country !== ""
      ) {
        let existTeam = teams.find(
          (t) => team.name.toLowerCase() === t.name.toLowerCase()
        );

        if (existTeam === undefined) {
          if (selectedPlayer.length > 0) {
            let existPlayer = selectedPlayer.map((item) => {
              return teams.find((player) => {
                return player.id === item.id;
              });
            });
            let data = existPlayer.filter((i) => i !== undefined);
            if (data.length < 1) {
              dispatch(setNewTeam(team));
              clearData();
              open(false);
              Swal.fire({
                title: 'Success!',
                text: 'Team Created Successfully !',
                icon: 'success',
                confirmButtonText: 'OK'
              })
            } else {
              Swal.fire({
                title: 'Warning!',
                text: 'Player already exist in another team',
                icon: 'warning',
                confirmButtonText: 'OK'
              })
            }
          } else {
            dispatch(setNewTeam(team));
            clearData();
            open(false);
            Swal.fire({
              title: 'Success!',
              text: 'Team Created Successfully !',
              icon: 'success',
              confirmButtonText: 'OK'
            })
            
          }
        } else {
          Swal.fire({
            title: 'Warning!',
            text: 'Team Already Exist',
            icon: 'warning',
            confirmButtonText: 'OK'
          })
        }
      } else {
        Swal.fire({
          title: 'Warning!',
          text: 'Please fill all field',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }
    } else {
      if (
        team.name !== "" &&
        team.player_count !== 0 &&
        team.region !== "" &&
        team.country !== "" 
      ) {
        let existTeam = teams.filter((t) => t.id !== team.id).find((player) => team.name.toLowerCase() === player.name.toLowerCase());
        
        if (existTeam) {
          
          Swal.fire({
            title: 'Warning!',
            text: 'Team already exist !',
            icon: 'warning',
            confirmButtonText: 'OK'
          })

          return 
        
        }
        const data = teams.filter((t) => team.id !== t.id);

        let final = data.map((d) => d.players);

        const last_team = final.flat(final.length);
        const existPlayers = last_team.map((t) => teams.find((p) => p.id === t.id)).filter((f) => f !== undefined);
        
        if (existPlayers.length < 1) {
          dispatch(updateTeam(team));
          clearData();
          open(false);
          Swal.fire({
            title: 'Success!',
            text: 'Team Updated Successfully !',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        } else {
          Swal.fire({
            title: 'Warning!',
            text: 'Player already exist in another team',
            icon: 'warning',
            confirmButtonText: 'OK'
          })
        }
      } else {
        Swal.fire({
          title: 'Warning!',
          text: 'Please fill all field',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }
    }
  };
  
  const formatPlayerData = (data) => {
    return data.map((player) => ({
      value: player.id,
      label: player.name,
    }));
  };

  useEffect(() => {
    if (Object.keys(defaultValue).length !== 0) {
      setTeam({
        id: defaultValue.id,
        name: defaultValue.name,
        player_count: defaultValue.player_count,
        region: defaultValue.region,
        country: defaultValue.country,
        players: defaultValue.players,
      });
    }
  }, [defaultValue]);

  useEffect(() => {
    if (data && data.pages.length > 0) {
      dispatch(setPlayers(formatData(data)));
    }
  }, [data]);

  return (
    <>
      <div
        className={styles.bg_overlay}
      />
      <div
        className={styles.fcontainer}
      >
        <div className="flex flex-row justify-between items-start mb-6">
          <h1 className={styles.title}>
            {Object.keys(defaultValue).length === 0 ? "Create" : "Update"} 
          </h1>
          <span
            className="border px-1 rounded hover:bg-[#efefef] transition-all"
            onClick={() => open(false)}
          >
          </span>
        </div>
        <div className={styles.form}>
          
          <div className="w-full">
            <label className={styles.label}>Team Name</label>
            <input
              type="text"
              placeholder="Enter team name"
              className={styles.input}
              value={team.name}
              onChange={(e) => enterTextField("name", e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className="text-sm font-medium">Region</label>
            <input
              type="text"
              placeholder="Enter team region"
              className={styles.input}
              value={team.region}
              onChange={(e) => enterTextField("region", e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className={styles.label}>Country</label>
            <input
              type="text"
              placeholder="Enter team country"
              className={styles.input}
              value={team.country}
              onChange={(e) => enterTextField("country", e.target.value)}
            />
          </div>

          <div className="w-full">
            <div className={styles.scontainer}>
              <div className="w-[70%]">
                {isLoading && (
                  <Select
                    ref={valRef}
                    openMenuOnFocus={true}
                    isMulti
                    options={[]}
                    isDisabled
                    className="disabled:opacity-20"
                  />
                )}
                {Object.keys(defaultValue).length === 0 &&
                  isSuccess &&
                  players.length > 0 && (
                    <Select
                      ref={valRef}
                      openMenuOnFocus={true}
                      isMulti
                      options={players}
                      onChange={handleChange}
                      isClearable
                    />
                  )}

                {Object.keys(defaultValue).length !== 0 &&
                  isSuccess &&
                  players.length > 0 &&
                  defaultValue.players.length > 0 && (
                    <Select
                      ref={valRef}
                      openMenuOnFocus={true}
                      isMulti
                      options={players}
                      onChange={handleChange}
                      defaultValue={formatPlayerData(defaultValue.players)}
                      isClearable
                    />
                  )}
              </div>

              <button
                className={styles.loadmore}
                onClick={() => {
                  fetchNextPage();
                  if (valRef.current) {
                    valRef.current.focus();
                  }
                }}
              >
                Load More
              </button>
            </div>
          </div>

          <button className={styles.submit} onClick={createTeam}>
            {Object.keys(defaultValue).length === 0 ? "Create" : "Update"}
          </button>
          <button className={styles.close} onClick={() => open(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
