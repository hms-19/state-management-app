import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeam, getTeam } from "../../features/team/teamSlice";
import { styles } from "./teamStyle";
import Modal from "../modal/Modal";
import Swal from 'sweetalert2'

const Team = () => {
  const [open, setOpen] = useState(false);
  const  data  = useSelector(getTeam) || [];
  const [value, setValue] = useState({});
  const dispatch = useDispatch();

  // delete Team
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Do you want to delete?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTeam(id))
        Swal.fire({
          title: 'Success!',
          text: 'Team Deleted Successfully !',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      } 
    })
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        {data.length > 0 && (
          <span className="text-sm font-medium">
            Total Team - {data.length}
          </span>
        )}
        {data.length === 0 && (
          <span className="">No Team</span>
        )}
        <button
          className={styles.create}
          onClick={() => {
            setValue({});
            setOpen(true);
          }}
        >
          Create Team
        </button>
      </div>
      <div className={styles.container}>
        { data.length > 0 &&
          data.map((team, index) => (
            <div key={index} className={styles.card}>
              <h1 className="font-bold">{team.name}</h1>
              <div>
                <span className="text-sm opacity-50 font-semibold my-1">
                  Player Count - {team.player_count}
                </span>
                <div>
                  <button
                    className="border p-2 rounded-md mr-2"
                    onClick={() => {
                      setValue({ ...team });
                      setOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 p-2 border rounded-md"
                    onClick={() => handleDelete(team.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {open && (
          <Modal
            open={setOpen}
            defaultValue={value}
          />
        )}
    </div>
  );
};

export default Team;
