import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import HomeHeader from '../HomeHeader'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  fetching: 'FETCHING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {jobDetails: {}, jobItemAPIStatus: apiStatus.initial}

  componentDidMount() {
    this.setState(
      {
        jobItemAPIStatus: apiStatus.fetching,
      },
      this.getJobItemData,
    )
  }

  componentWillUnmount() {
    console.log('job-item-component-unmounted')
  }

  getFormattedJobData = jobDetails => ({
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
    title: jobDetails.title,
    skills: jobDetails.skills,
    lifeAtCompany: jobDetails.life_at_company,
  })

  getFormattedSimilarJobs = similarJobs =>
    similarJobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

  getFormattedSkills = skills =>
    skills.map(eachSkill => ({
      name: eachSkill.name,
      imageUrl: eachSkill.image_url,
    }))

  // API call method
  getJobItemData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const newData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = newData
      const formattedJobData = this.getFormattedJobData(jobDetails)
      const formattedSimilarJobs = this.getFormattedSimilarJobs(similarJobs)
      const formattedJobDetails = {formattedJobData, formattedSimilarJobs}

      this.setState({
        jobDetails: formattedJobDetails,
        jobItemAPIStatus: apiStatus.success,
      })
    } else {
      console.log('Job Item Data API failed')
      this.setState({jobItemAPIStatus: apiStatus.failure})
    }
  }

  reloadJobDataAPI = () => {
    this.setState({jobItemAPIStatus: apiStatus.fetching}, this.getJobItemData)
  }

  renderJobDataFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-img"
        alt="failure view"
      />
      <h1 className="failure-view-title">Oops! Something went wrong</h1>
      <p className="failure-view-suggestion">
        We cannot seem to find the page you are looking for.
      </p>

      <button
        type="button"
        className="retry-btn"
        onClick={this.reloadJobDataAPI}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderCompanyDetails = (
    companyLogoUrl,
    title,
    rating,
    employmentType,
    location,
    packagePerAnnum,
  ) => (
    <>
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
    </>
  )

  renderLifeAtCompany = lifeAtCompany => (
    <div className="life-at-company-container">
      <h1 className="life-at-company-title">Life At Company</h1>
      <div className="life-at-company-description-container">
        <p className="description">{lifeAtCompany.description}</p>
        <img
          src={lifeAtCompany.image_url}
          className="company-images"
          alt="life at company"
        />
      </div>
    </div>
  )

  renderSkills = skills => {
    const skillsList = this.getFormattedSkills(skills)

    return (
      <div className="skills-container">
        <h1 className="skills-text">Skills</h1>
        <ul className="skills-list">
          {skillsList.map(eachSkill => (
            <li className="skill-item-container" key={eachSkill.name}>
              <img
                src={eachSkill.imageUrl}
                className="skill-image"
                alt={eachSkill.name}
              />
              <p className="skill-name">{eachSkill.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderDescription = (description, companyWebsiteUrl) => (
    <>
      <div className="description-container">
        <div className="description-title-and-visit-icon-container">
          <h1 className="description-title">Description</h1>
          <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
            <div className="visit-icon-container">
              <p className="visit-text">Visit</p>
              <BsBoxArrowUpRight className="visit-icon" />
            </div>
          </a>
        </div>

        <p className="description">{description}</p>
      </div>
    </>
  )

  renderJobItemDataView = () => {
    const {jobDetails} = this.state
    const {formattedJobData} = jobDetails
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
      lifeAtCompany,
    } = formattedJobData

    return (
      <div className="job-item-content">
        {this.renderCompanyDetails(
          companyLogoUrl,
          title,
          rating,
          employmentType,
          location,
          packagePerAnnum,
        )}
        {this.renderDescription(jobDescription, companyWebsiteUrl)}
        {this.renderSkills(skills)}
        {this.renderLifeAtCompany(lifeAtCompany)}
      </div>
    )
  }

  renderSimilarJobsView = () => {
    const {jobDetails} = this.state
    const {formattedSimilarJobs} = jobDetails
    return (
      <>
        <h1 className="similar-jobs-title">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {formattedSimilarJobs.map(eachJob => (
            <SimilarJobItem
              key={eachJob.id}
              similarJobData={eachJob}
              getNewJobData={this.reloadJobDataAPI}
            />
          ))}
        </ul>
      </>
    )
  }

  renderJobDataView = () => (
    <>
      {this.renderJobItemDataView()}
      {this.renderSimilarJobsView()}
    </>
  )

  renderJobItemDetailsView = () => {
    const {jobItemAPIStatus} = this.state

    switch (jobItemAPIStatus) {
      case apiStatus.success:
        return this.renderJobDataView()

      case apiStatus.fetching:
        return this.renderLoaderView()

      case apiStatus.failure:
        return this.renderJobDataFailureView()
      default:
        return this.renderLoaderView()
    }
  }

  render() {
    return (
      <div className="job-item-page-container">
        <HomeHeader />
        <div className="job-item-details-container">
          {this.renderJobItemDetailsView()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
