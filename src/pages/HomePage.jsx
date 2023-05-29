import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";

import PlayerList from "../components/player/Player";
import Team from "../components/team/Team";

const HomePage = () => {
  const [listType, setListType] = useState("team");
  return (
    <div className="container  mx-auto px-5 md:px-0 py-5">
      <Navbar />
      <div className="flex flex-row justify-start items-center space-x-4 mb-4 border-b-2 border-zinc-200">
        <button
          className={`${listType !== "player" && "border-zinc-400"} border-b-2`}
          onClick={() => setListType("team")}
        >
          Team List
        </button>
        <button
          className={`${listType === "player" && "border-zinc-400"} border-b-2`}
          onClick={() => setListType("player")}
        >
          Player List
        </button>
      </div>
      {listType === "player" ? <PlayerList /> : <Team />}
    </div>
  );
};

export default HomePage;
