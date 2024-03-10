import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'
import Game from './Game';

const CanvasWrapper = styled.div`
  border: 1px solid black;
  margin-left: 10%;
  margin-right: 10%;
  height: 500px;
`;

const RollDice = () => {
  return (
    <>
      <CanvasWrapper>
        <Canvas
          camera={ {
            fov: 75,
            position: [ 0,-2, 7 ]
          } }
        >
          <Game />
        </Canvas>
      </CanvasWrapper>
      <div style={ { display: 'flex', alignItems: 'center' } }>
        <button>roll</button>
      </div>
    </>
  )
}

export default RollDice