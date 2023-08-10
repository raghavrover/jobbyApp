import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const HomeHeader = props => {
  const {history} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar-container">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="nav-brand-logo"
            alt="website logo"
          />
        </Link>
        <div className="nav-bar-mobile-items-container">
          <Link to="/">
            <button className="nav-mobile-item-btn" type="button">
              <AiFillHome className="home-icon" />
            </button>
          </Link>
          <Link to="/jobs">
            <button className="nav-mobile-item-btn" type="button">
              <BsBriefcaseFill className="home-icon" />
            </button>
          </Link>
          <button
            className="nav-mobile-item-btn"
            type="button"
            onClick={onLogout}
          >
            <FiLogOut className="home-icon" />
          </button>
        </div>

        <div className="nav-bar-items-container">
          <Link to="/" className="link-item">
            <p className="nav-item">Home</p>
          </Link>
          <Link to="/jobs" className="link-item">
            <p className="nav-item">Jobs</p>
          </Link>
          <button className="logout-btn" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(HomeHeader)
