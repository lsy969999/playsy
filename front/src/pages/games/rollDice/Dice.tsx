import { useTexture } from '@react-three/drei';
import dice1TextureUrl from '../../../assets/texture/dice/dice1.jpg';
import dice2TextureUrl from '../../../assets/texture/dice/dice2.jpg';
import dice3TextureUrl from '../../../assets/texture/dice/dice3.jpg';
import dice4TextureUrl from '../../../assets/texture/dice/dice4.jpg';
import dice5TextureUrl from '../../../assets/texture/dice/dice5.jpg';
import dice6TextureUrl from '../../../assets/texture/dice/dice6.jpg';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';

const Dice = () => {
  const [
    dice1Texture,
    dice2Texture,
    dice3Texture,
    dice4Texture,
    dice5Texture,
    dice6Texture,
  ] = useTexture(
      [
        dice1TextureUrl,
        dice2TextureUrl,
        dice3TextureUrl,
        dice4TextureUrl,
        dice5TextureUrl,
        dice6TextureUrl,
      ]
    )

  const dice = useRef<RapierRigidBody>(null);

  const rollDice = () => {
    dice.current?.applyImpulse({ x: 0, y: 0, z: 7 }, true)
    dice.current?.applyTorqueImpulse({ x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2, z: (Math.random() - 0.5) * 2, }, true)
  }
  return (
    <>
      <RigidBody ref={ dice } >
        <mesh
          position={ [ 0, 0, 1] }
          onClick={ rollDice }
        >
          <boxGeometry />
          <meshBasicMaterial map={dice5Texture} attach="material-0" />
          <meshBasicMaterial map={dice2Texture} attach="material-1" />
          <meshBasicMaterial map={dice3Texture} attach="material-2" />
          <meshBasicMaterial map={dice4Texture} attach="material-3" />
          <meshBasicMaterial map={dice1Texture} attach="material-4" />
          <meshBasicMaterial map={dice6Texture} attach="material-5" />
        </mesh>
      </RigidBody>
    </>
  )
}

export default Dice