import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import HomeHeader from '../HomeHeader'
import JobFilters from '../JobFilters'
import JobCard from '../JobCard'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  fetching: 'FETCHING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentType: [],
    salaryRange: '',
    profileData: {},
    jobsDataList: [],
    jobsDataApiStatus: apiStatus.initial,
    profileApiStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.setState({
      jobsDataApiStatus: apiStatus.fetching,
      profileApiStatus: apiStatus.fetching,
    })

    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const newData = {profileData: data.profile_details}
      const {profileData} = newData
      const formattedProfileData = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }
      this.setState({
        profileApiStatus: apiStatus.success,
        profileData: formattedProfileData,
      })
    } else {
      console.log('Profile data api failed')
      this.setState({profileApiStatus: apiStatus.failure})
    }
  }

  getJobsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, employmentType, salaryRange} = this.state
    const allEmploymentTypes =
      employmentType.length >= 1 ? employmentType.join(',') : ''

    const url = `https://apis.ccbp.in/jobs?employment_type=${allEmploymentTypes}&minimum_package=${salaryRange}&search=${searchInput}`

    const reqOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, reqOptions)
    if (response.ok) {
      const data = await response.json()
      const {jobs} = data

      const formattedJobsList = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsDataApiStatus: apiStatus.success,
        jobsDataList: formattedJobsList,
      })
    } else {
      console.log('api failed')
      this.setState({jobsDataApiStatus: apiStatus.failure})
    }
  }

  onEnterSearchIcon = () => {
    this.setState({jobsDataApiStatus: apiStatus.fetching}, this.getJobsData)
  }

  onChangeSearchInput = event => {
    if (event.target.value === '') {
      this.setState(
        {
          searchInput: event.target.value,
          jobsDataApiStatus: apiStatus.fetching,
        },
        this.getJobsData,
      )
    }
    this.setState({searchInput: event.target.value})
  }

  getEmploymentId = id => {
    const {employmentType} = this.state
    this.setState({jobsDataApiStatus: apiStatus.fetching})
    if (employmentType.includes(id)) {
      const newEmploymentType2 = employmentType.filter(eachId => eachId !== id)
      this.setState(
        {
          employmentType: [...newEmploymentType2],
        },
        this.getJobsData,
      )
    } else {
      const newEmploymentType = [...employmentType, id]
      this.setState(
        {
          employmentType: [...newEmploymentType],
        },
        this.getJobsData,
      )
    }
  }

  getSalaryId = salaryRange => {
    this.setState(
      {salaryRange, jobsDataApiStatus: apiStatus.fetching},
      this.getJobsData,
    )
  }

  reloadProfileAPI = () => {
    this.setState({profileApiStatus: apiStatus.fetching}, this.getProfileData)
  }

  reloadJobsAPI = () => {
    this.setState({jobsDataApiStatus: apiStatus.fetching}, this.getJobsData)
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        className="retry-btn"
        type="button"
        onClick={this.reloadProfileAPI}
      >
        Retry
      </button>
    </div>
  )

  renderJobsFailureView = () => (
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

      <button type="button" className="retry-btn" onClick={this.reloadJobsAPI}>
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="no-jobs-image"
        alt="no jobs"
      />

      <h1 className="no-jobs-found">No Jobs Found</h1>
      <p className="no-jobs-found-suggestion">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-icon-btn"
          onClick={this.onEnterSearchIcon}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderProfileData = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-image" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="user-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileView = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatus.success:
        return this.renderProfileData()

      case apiStatus.fetching:
        return this.renderLoaderView()

      case apiStatus.failure:
        return this.renderProfileFailureView()

      default:
        return null
    }
  }

  renderProfileAndFiltersView = () => (
    <div className="profile-and-filters-container">
      {this.renderSearchInput()}
      {this.renderProfileView()}
      <JobFilters
        getEmploymentId={this.getEmploymentId}
        getSalaryId={this.getSalaryId}
      />
    </div>
  )

  renderJobsDataListView = () => {
    const {jobsDataList} = this.state

    return (
      <>
        {jobsDataList.length === 0 ? (
          this.renderNoJobsView()
        ) : (
          <ul className="jobs-list">
            {jobsDataList.map(eachJob => (
              <JobCard key={eachJob.id} jobDetails={eachJob} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderJobsDataView = () => {
    const {jobsDataApiStatus} = this.state

    switch (jobsDataApiStatus) {
      case apiStatus.success:
        return this.renderJobsDataListView()

      case apiStatus.fetching:
        return this.renderLoaderView()

      case apiStatus.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  renderJobsData = () => {
    const {searchInput} = this.state

    return (
      <div className="jobs-data-container">
        <div className="search-lg-input-container">
          <input
            value={searchInput}
            type="search"
            className="search-lg-input"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterSearchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-icon-btn"
            onClick={this.onEnterSearchIcon}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderJobsDataView()}
      </div>
    )
  }

  renderAllJobsView = () => (
    <>
      {this.renderProfileAndFiltersView()}
      {this.renderJobsData()}
    </>
  )

  render() {
    return (
      <div className="jobs-page-container">
        <HomeHeader />
        <div className="jobs-content-container">{this.renderAllJobsView()}</div>
      </div>
    )
  }
}

export default Jobs
