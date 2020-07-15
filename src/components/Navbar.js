import React from 'react'
import { Link } from 'gatsby'
import { ReactComponent as TwitterLogo } from '../img/social/twitter.svg'
import { ReactComponent as FacebookLogo } from '../img/social/facebook.svg'
import { ReactComponent as YouTubeLogo  } from '../img/social/youtube.svg'
import { ReactComponent as InstagramLogo } from '../img/social/instagram.svg'
import { ReactComponent as SoundcloudLogo } from '../img/social/soundcloud.svg'
import { ReactComponent as MyLogo } from '../img/thepianoshopbath-white.svg'
import Progress from '../components/Progress'
import {ThemeContext} from "../context/ThemeContext";

const Navbar = class extends React.Component {

  static contextType = ThemeContext

  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.scroll, { capture: false, passive: true})
    window.addEventListener('resize', this.scroll, { capture: false, passive: true})
    document.querySelectorAll('.has-dropdown>.navbar-link').forEach(function(navbarLink){
      navbarLink.addEventListener('click', function(ev){
        navbarLink.nextElementSibling.classList.toggle('is-hidden-mobile');
        ev.preventDefault()
      })
    });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scroll, { capture: false, passive: true})
    window.removeEventListener('resize', this.scroll, { capture: false, passive: true})
  }

  scroll = () => {
    console.log('navbar scroll')
    if(this.context.scrollTop > 80){
      console.log(this.ref.current)
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
        ref="mainnav"
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
              <div className="navbar-item has-dropdown is-hoverable is-mega">
                <Link className="navbar-link" to="">
                  About
                </Link>
                <div className="navbar-dropdown is-hidden-mobile">
                  <div className="container is-fluid">
                    <div className="columns">
                      <div className="column">
                        <h1 className="title is-6 is-mega-menu-title">More Info</h1>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          Meet the Team
                        </Link>
                        <Link className="navbar-item" to="/">
                          Community Projects
                        </Link>
                        <Link className="navbar-item" to="/">
                          Private Showroom Appointments
                        </Link>
                        <Link className="navbar-item" to="/">
                          Piano Tuition
                        </Link>
                        <Link className="navbar-item" to="/">
                          Jobs
                        </Link>
                        <Link className="navbar-item" to="/">
                          Terms, Conditions and Privacy
                        </Link>
                      </div>
                      <div className="column">
                        <h1 className="title is-6 is-mega-menu-title">News &amp; Reviews</h1>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          News
                        </Link>
                        <Link className="navbar-item" to="/">
                          Piano Reviews
                        </Link>
                      </div>
                      <div className="column">
                        <h1 className="title is-6 is-mega-menu-title">Piano Finance</h1>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          0% Interest Free Credit
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable is-mega">
                <Link className="navbar-link" to="/products">
                  Products
                </Link>
                <div className="navbar-dropdown is-hidden-mobile">
                  <div className="container is-fluid">
                    <div className="columns">
                      <div className="column">
                        <h1 className="title is-6 is-mega-menu-title">Pianos</h1>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          New Grand Pianos
                        </Link>
                        <Link className="navbar-item" to="/">
                          Secondhand Grand Pianos
                        </Link>
                        <hr className="navbar-divider"/>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          New Upright Pianos
                        </Link>
                        <Link className="navbar-item" to="/">
                          Secondhand Upright Pianos
                        </Link>
                        <hr className="navbar-divider"/>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          Digital Pianos
                        </Link>
                        <Link className="navbar-item" to="/">
                          Self Playing Pianos
                        </Link>
                        <Link className="navbar-item" to="/">
                          Designer Pianos
                        </Link>
                      </div>
                      <div className="column">
                        <h1 className="title is-6 is-mega-menu-title">Accessories</h1>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          Premium Stools
                        </Link>
                        <Link className="navbar-item" to="/">
                          Budget Stools
                        </Link>
                        <Link className="navbar-item" to="/">
                          Premium Castor Caps
                        </Link>
                        <Link className="navbar-item" to="/">
                          Budget Castor Caps
                        </Link>
                        <Link className="navbar-item" to="/">
                          Artisan Furniture
                        </Link>
                      </div>
                      <div className="column">
                        <h1 className="title is-6 is-mega-menu-title">Makers</h1>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          Steinway Pianos
                        </Link>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          Yamaha Pianos
                        </Link>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          Kawai Pianos
                        </Link>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          Blüthner Pianos
                        </Link>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          Petrof Pianos
                        </Link>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          Bechstein Pianos
                        </Link>
                        <Link className="navbar-item" to="/" tabIndex="0">
                           John Broadworrd &amp; Sons Pianos
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <Link className="navbar-item" to="/blog">
                Design
              </Link>
              <div className="navbar-item has-dropdown is-hoverable is-mega">
                <Link className="navbar-link" to="/services">
                  Services
                </Link>
                <div className="navbar-dropdown is-hidden-mobile">
                  <div className="container is-fluid">
                    <div className="columns">
                      <div className="column">
                        <h1 className="title is-6 is-mega-menu-title">Our Services</h1>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          Repairs &amp; Restoration
                        </Link>
                        <Link className="navbar-item" to="/">
                          Piano Removals
                        </Link>
                        <Link className="navbar-item" to="/">
                          Piano Disposal &amp; Recycling
                        </Link>
                        <Link className="navbar-item" to="/">
                          Piano Tuning
                        </Link>
                        <Link className="navbar-item" to="/">
                          Piano Hire for Events
                        </Link>
                        <Link className="navbar-item" to="/">
                          Piano Valuations &amp; Sell my Piano
                        </Link>
                      </div>
                      <div className="column">
                        <h1 className="title is-6 is-mega-menu-title">Learn to Play</h1>
                        <Link className="navbar-item" to="/" tabIndex="0">
                          Find a Teacher
                        </Link>
                        <hr className="navbar-divider"/>
                        <Link className="navbar-item" to="/">
                          Bath &amp; Northeast Somerset
                        </Link>
                        <Link className="navbar-item" to="/">
                          City of Bath
                        </Link>
                        <Link className="navbar-item" to="/">
                          City of Bristol
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
                <Link className="navbar-item" to="/contact">
                  Contact
                </Link>
                {/*<Link className="navbar-item" to="/contact/examples">*/}
                {/*  Form Examples*/}
                {/*</Link>*/}
              </div>
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
