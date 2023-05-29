import React from "react";
import { useInfiniteQuery } from "react-query";
import { getPlayer } from "../../apis/player";
import { styles } from "./playerStyle";

const Player = () => {

  // infinite load
  const { data, isLoading, isSuccess, fetchNextPage, isError } =
    useInfiniteQuery("players", ({ pageParam = 0 }) => getPlayer(pageParam), {
      getNextPageParam: (allPages) => {
        const nextPage = Number(allPages.length) + 1;
        return nextPage;
      },
    });

  return (
    <>
      <div className={styles.container}>
        {isError && <div>Error</div>}
        {isLoading && <div>Loading...</div>}
        {isSuccess &&
          data &&
          data.pages.map((page) => {
            return page.data.data.map((player) => (
              <div key={player.id} className={styles.card}>
                <h1 className={styles.title}>
                  {player.first_name} {player.last_name}
                </h1>
                <span className={styles.subtitle}>
                  Position - {player.position ? player.position : "-"}
                </span>
              </div>
            ));
          })}
      </div>
      {isSuccess && (
        <button
          className={styles.loadmore}
          onClick={() => {
            fetchNextPage();
          }}
        >
          Load More
        </button>
      )}
    </>
  );
};

export default Player;
