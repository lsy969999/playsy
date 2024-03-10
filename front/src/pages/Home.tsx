import styled from "styled-components"
import RollDice from "./games/rollDice/RollDice";

const GameCardWrapper = styled.div`

`;

const Home = () => {
  return (
    <div>
      <GameCardWrapper>
        <RollDice />
      </GameCardWrapper>
    </div>
  )
}

export default Home