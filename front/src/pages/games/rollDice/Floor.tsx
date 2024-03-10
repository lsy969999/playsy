import { RigidBody } from "@react-three/rapier"

const Floor = () => {
  return (
    <>
      <RigidBody type="fixed">
        <mesh position={ [0, 0, -2] } scale={ [8, 8, 0.1] }>
          <boxGeometry />
          <meshBasicMaterial color="lightgreen" />
        </mesh>
      </RigidBody>
    </>
  )
}

export default Floor