import {Link} from 'react-router-dom'
import HomeHeader from '../HomeHeader'
import Footer from '../Footer'

import './index.css'

const Home = () => (
  <>
    <div className="home-page-container">
      <div className="home-banner-container">
        <HomeHeader />
        <div className="home-content">
          <h1 className="home-header-content">
            Find The Job That Fits Your Life
          </h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="find-jobs-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  </>
)

export default Home
