import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";

import { loadGames } from "../actions/gamesAction";
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
import { useLocation } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  const { popular, newGames, upcoming } = useSelector((state) => state.games);
  return (
    <GameList>
      {pathId && <GameDetail />}
      <h2> Upcoming Games </h2>
      <Games>
        {upcoming.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </Games>
      <h2> Popular Games </h2>
      <Games>
        {popular.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </Games>
      <h2> New Games </h2>
      <Games>
        {newGames.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </Games>
    </GameList>
  );
}

const GameList = styled(motion.div)`
  padding: 0rem 0.5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;
//create a grid
const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default Home;
