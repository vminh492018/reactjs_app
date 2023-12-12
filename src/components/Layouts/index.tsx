import Navbar from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import './Layouts.scss'
const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className='mainOutlet'>
        <Outlet />
      </div>
      <div className='endPage'>
        <Footer />
      </div>
    </>
  )
}

export default Layout
