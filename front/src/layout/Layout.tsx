import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <nav>
        Playsy!11
      </nav>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Layout