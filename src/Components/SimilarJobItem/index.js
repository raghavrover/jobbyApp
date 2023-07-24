import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobData, getNewJobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobData

  const onSelectingJobCard = () => {
    getNewJobData()
  }

  return (
    <li className="similar-job-item" onClick={onSelectingJobCard}>
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="company-details-container">
          <img
            src={companyLogoUrl}
            className="company-image"
            alt="similar job company logo"
          />
          <div className="position-container">
            <h1 className="title-text">{title}</h1>
            <div className="company-rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="similar-job-description-title">Description</h1>
        <p className="similar-job-description">{jobDescription}</p>
        <div className="similar-job-location-job-type-container">
          <div className="similar-job-location-container">
            <MdLocationOn className="location-icon" />
            <p className="location-text">{location}</p>
          </div>
          <div className="location-container">
            <BsFillBriefcaseFill className="location-icon" />
            <p className="location-text">{employmentType}</p>
          </div>
        </div>{' '}
      </Link>
    </li>
  )
}

export default SimilarJobItem
