import { CuboidCollider, RigidBody } from '@react-three/rapier'

const TopWall = () => {
  return (
    <>
      <RigidBody type='fixed'>
        <CuboidCollider args={ [ 4, 0.1, 2] } position={ [ 0, 4, 0] } />
      </RigidBody>
    </>
  )
}

const LeftWall = () => {
  return (
    <>
      <RigidBody type='fixed'>
        <CuboidCollider args={ [ 0.1, 4, 2 ] } position={ [ -4, 0, 0 ] } />
      </RigidBody>
    </>
  )
}

const RightWall = () => {
  return (
    <>
      <RigidBody type='fixed'>
        <CuboidCollider args={ [ 0.1, 4, 2 ] } position={ [ 4, 0, 0 ] } />
      </RigidBody>
    </>
  )
}

const BottomWall = () => {
  return (
    <>
      <RigidBody type='fixed'>
        <CuboidCollider args={ [ 4, 0.1, 2] } position={ [ 0, -4, 0] } />
      </RigidBody>
    </>
  )
}

const CoverWall = () => {
  return (
    <>
      <RigidBody type='fixed'>
        <CuboidCollider args={ [ 4, 4, 0.1 ] } position={ [ 0, 0, 2 ] } />
      </RigidBody>
    </>
  )
}

const Walls = () => {
  return (
    <>
      <TopWall />
      <RightWall />
      <BottomWall />
      <LeftWall />
      <CoverWall />
    </>
  )
}

export default Walls