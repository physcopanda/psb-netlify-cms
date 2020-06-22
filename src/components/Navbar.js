import React from 'react'
import { Link } from 'gatsby'
import { ReactComponent as TwitterLogo } from '../img/social/twitter.svg'
import { ReactComponent as FacebookLogo } from '../img/social/facebook.svg'
import { ReactComponent as YouTubeLogo  } from '../img/social/youtube.svg'
import { ReactComponent as InstagramLogo } from '../img/social/instagram.svg'
import { ReactComponent as SoundcloudLogo } from '../img/social/soundcloud.svg'
import { ReactComponent as MyLogo } from '../img/thepianoshopbath-white.svg'
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
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand" style={{flexGrow: 1}}>
            <Link to="/" className="navbar-item" title="Logo">
              <MyLogo alt="ThePianoShopBath" style={{ width: '108px' }} />
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
            <div className="navbar-start has-text-centered" style={{marginRight: 0, marginLeft: 'auto'}}>
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/products">
                Products
              </Link>
              <Link className="navbar-item" to="/blog">
                Design
              </Link>
              <Link className="navbar-item" to="/blog">
                Services
              </Link>
              <Link className="navbar-item" to="/blog">
                Blog
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>
              {/*<Link className="navbar-item" to="/contact/examples">*/}
              {/*  Form Examples*/}
              {/*</Link>*/}
            </div>
            <div className="navbar-end has-text-centered">
              <a
                className="navbar-item"
                href="https://www.facebook.com/thepianoshopbath"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <FacebookLogo alt="Facebook" />
                </span>
              </a>
              <a
                  className="navbar-item"
                  href="https://twitter.com/PianoShopBath"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <span className="icon">
                  <TwitterLogo />
                </span>
              </a>
              <a
                  className="navbar-item"
                  href="https://www.youtube.com/user/ThePianoShopBath"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <span className="icon">
                  <YouTubeLogo alt="Youtube" />
                </span>
              </a>
              <a
                  className="navbar-item"
                  href="https://www.instagram.com/thepianoshopbath/"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <span className="icon">
                  <InstagramLogo alt="Instagram" />
                </span>
              </a>
              <a
                  className="navbar-item"
                  href="https://soundcloud.com/user-241599092"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <span className="icon">
                  <SoundcloudLogo alt="Soundcloud" />
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
