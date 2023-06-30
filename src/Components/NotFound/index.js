import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="not-found-img"
      alt="not found"
    />
    <h1 className="page-not-found-text">Page Not Found</h1>
    <p className="page-not-found-suggestion">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
