import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import StoreGame from "./StoreGame";
import ScrollArrow from "../layout/ScrollArrow";

const Store = () => {
  const { storeGames, newGames, heading } = useContext(StoreContext);

  return (
    <div className="store">
      {storeGames === undefined || storeGames.length === 0 ? (
        <>
          <h3 className="heading">{heading}</h3>
          <ul className="store-list">
            {newGames &&
              newGames.map((game) =>
                game.background_image !== null || game.name !== null ? (
                  <StoreGame game={game} key={game.id} />
                ) : (
                  ""
                )
              )}
          </ul>
          <ScrollArrow />
        </>
      ) : (
        <>
          <h3 className="heading">{heading}</h3>
          <ul className="store-list">
            {storeGames &&
              storeGames.map((game) =>
                game.background_image !== null || game.name !== null ? (
                  <StoreGame game={game} key={game.id} />
                ) : (
                  ""
                )
              )}
          </ul>
          <ScrollArrow />
        </>
      )}
    </div>
  );
};

export default Store;
