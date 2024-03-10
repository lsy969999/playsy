import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <nav>
        Playsy!
      </nav>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Layout