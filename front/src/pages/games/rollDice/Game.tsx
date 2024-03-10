// import { OrbitControls } from '@react-three/drei'
import Dice from './Dice'
import { Physics } from '@react-three/rapier'
import Floor from './Floor'
import Walls from './Walls'
import { useState } from 'react'
import { Text } from '@react-three/drei'

const Game = () => {
  const [dices, setDices] = useState<typeof Dice[]>([Dice]);
  
  const addDice = () => {
    setDices(prevDices => [...prevDices, Dice]);
  }
  
  const removeDice = () => {
    setDices(prevDices => prevDices.slice(0, -1));
  }
  return (
    <>
      <Physics gravity={ [0, 0, -9.81] }>
        {/* <OrbitControls makeDefault /> */}
        {
          dices.map((DiceC, index) => {
            return <DiceC key={index} />
          })
        }
        <Floor />
        <Walls />
      </Physics>
      <Text position={ [ -2.4, -4, 0 ] } onClick={ addDice } >add</Text>
      <Text position={ [ 2, -4, 0 ] } onClick={ removeDice }>remove</Text>
    </>
  )
}

export default Game