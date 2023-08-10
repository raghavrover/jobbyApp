import {Link} from 'react-router-dom'
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa'
import {MdSend} from 'react-icons/md'
import './index.css'

const Footer = () => (
  <>
    <div className="footer-container">
      <div className="footer-content">
        <div className="contact-us-container">
          <h1 className="follow-us-text">Contact Us</h1>
          <div className="contact-us-content">
            <textarea
              type="text"
              placeholder="Communicate your query..."
              className="mail-content-input"
            />
            <div className="gmail-bar-container">
              <input
                className="gmail"
                type="text"
                placeholder="example@gmail.com"
              />
              <button type="button" className="send-button">
                <MdSend className="send-icon" />
              </button>
            </div>
          </div>
        </div>

        <div className="contact-us-container follow-us-container">
          <h1 className="follow-us-text">Follow Us on</h1>
          <div className="social-media-container">
            <Link to="/">
              <div className="social-media-icon-container">
                <FaInstagram className="social-media-icon" />
              </div>
            </Link>

            <Link to="/">
              <div className="social-media-icon-container">
                <FaFacebookF className="social-media-icon" />
              </div>
            </Link>

            <Link to="/">
              <div className="social-media-icon-container">
                <FaTwitter className="social-media-icon" />
              </div>
            </Link>

            <Link to="/">
              <div className="social-media-icon-container">
                <FaYoutube className="social-media-icon" />
              </div>
            </Link>

            <Link to="/">
              <div className="social-media-icon-container">
                <FaLinkedinIn className="social-media-icon" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="conditions-and-copyright-content">
        <div className="copy-right-content">
          <a href="#a" className="copyright-text conditions-text">
            Conditions of use
          </a>
          <a href="#a" className="copyright-text">
            Privacy Policy
          </a>
        </div>
        <span className="copyright-text">
          Copyright 2020-2023, JobbyApp.in, Inc
        </span>
      </div>
    </div>
  </>
)

export default Footer
