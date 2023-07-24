import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="company-details-container">
          <img
            src={companyLogoUrl}
            className="company-image"
            alt="job details company logo"
          />
          <div className="position-container">
            <h1 className="title-text">{title}</h1>
            <div className="company-rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-job-type-ctc-container">
          <div className="location-job-type-container">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="location-text">{location}</p>
            </div>
            <div className="location-container">
              <BsFillBriefcaseFill className="location-icon" />
              <p className="location-text">{employmentType}</p>
            </div>
          </div>
          <p className="ctc-text">{packagePerAnnum}</p>
        </div>
        <h1 className="job-card-description-title">Description</h1>
        <p className="job-card-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
