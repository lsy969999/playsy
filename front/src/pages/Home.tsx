import styled from "styled-components"
import RollDice from "./games/rollDice/RollDice";

const GameCardWrapper = styled.div`

`;

const Home = () => {
  const btnClickHandler = async () => {
    const res = await fetch('http://localhost:4000/sample')
    console.log(res)
  }
  return (
    <div>
      <GameCardWrapper>
        <RollDice />
      </GameCardWrapper>
      <button onClick={ btnClickHandler } >test</button>
    </div>
  )
}

export default Home