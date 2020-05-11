import React from 'react'
import { Link } from 'gatsby'
import twitter from '../img/social/twitter.svg'
import facebook from '../img/social/facebook.svg'
import youtube from '../img/social/youtube.svg'
import instagram from '../img/social/instagram.svg'
import soundcloud from '../img/social/soundcloud.svg'
import logo from '../img/thepianoshopbath.svg'
import Progress from '../components/Progress'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  handleClick = (ev) => {
    if (ev.keyCode === 13) {
      this.toggleHamburger()
    }
  }

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="ThePianoShopBath" style={{ width: '88px' }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
              onKeyDown={(ev) => this.handleClick(ev)}
              tabIndex="0"
              role="button"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/products">
                Products
              </Link>
              <Link className="navbar-item" to="/blog">
                Blog
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>
              <Link className="navbar-item" to="/contact/examples">
                Form Examples
              </Link>
            </div>
            <div className="navbar-end has-text-centered">
              <a
                className="navbar-item"
                href="https://www.facebook.com/thepianoshopbath"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={facebook} alt="Facebook" />
                </span>
              </a>
              <a
                  className="navbar-item"
                  href="https://twitter.com/PianoShopBath"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={twitter} alt="Twitter" />
                </span>
              </a>
              <a
                  className="navbar-item"
                  href="https://www.youtube.com/user/ThePianoShopBath"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={youtube} alt="Youtube" />
                </span>
              </a>
              <a
                  className="navbar-item"
                  href="https://www.instagram.com/thepianoshopbath/"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={instagram} alt="Instagram" />
                </span>
              </a>
              <a
                  className="navbar-item"
                  href="https://soundcloud.com/user-241599092"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={soundcloud} alt="Soundcloud" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <Progress/>
      </nav>
    )
  }
}

export default Navbar
