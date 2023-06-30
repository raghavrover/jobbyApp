import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const JobFilters = props => {
  const {getSalaryId, getEmploymentId} = props

  const onEmploymentTypeChange = event => {
    getEmploymentId(event.target.value)
  }

  const onSalaryChange = event => {
    getSalaryId(event.target.value)
  }

  const renderEmploymentTypeItem = eachType => (
    <>
      <input
        type="checkbox"
        id={eachType.employmentTypeId}
        onChange={onEmploymentTypeChange}
        className="employment-checkbox"
        value={eachType.employmentTypeId}
      />
      <label htmlFor={eachType.employmentTypeId} className="label-text">
        {eachType.label}
      </label>
    </>
  )

  const renderSalaryItem = eachSalarySlab => (
    <>
      <input
        type="radio"
        name="salary"
        id={eachSalarySlab.salaryRangeId}
        onChange={onSalaryChange}
        value={eachSalarySlab.salaryRangeId}
        className="employment-checkbox"
      />
      <label htmlFor={eachSalarySlab.salaryRangeId} className="label-text">
        {eachSalarySlab.label}
      </label>
    </>
  )

  const renderEmploymentTypes = () => (
    <div className="type-of-employment-container">
      <h1 className="type-of-employment-text">Type of Employment</h1>
      <div className="employment-category-items">
        {employmentTypesList.map(eachType => (
          <div
            key={eachType.employmentTypeId}
            className="employment-item-container"
          >
            {renderEmploymentTypeItem(eachType)}
          </div>
        ))}
      </div>
    </div>
  )

  const renderSalaryRanges = () => (
    <div className="type-of-employment-container">
      <h1 className="type-of-employment-text">Salary Range</h1>
      <div className="employment-category-items">
        {salaryRangesList.map(eachSalarySlab => (
          <div
            key={eachSalarySlab.salaryRangeId}
            className="employment-item-container"
          >
            {renderSalaryItem(eachSalarySlab)}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      {renderEmploymentTypes()}
      {renderSalaryRanges()}
    </>
  )
}

export default JobFilters
