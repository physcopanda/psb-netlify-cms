import React, {createRef} from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import '../components/all.sass'
import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import BackgroundImage from 'gatsby-background-image'

export class IndexPageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.ref = createRef()
    this.state = {
      scroll: 0
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.scroll, { capture: false, passive: true})
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scroll, { capture: false, passive: true})
  }

  scroll = () => {
    const k = Math.max(0, Math.pow(window.pageYOffset/400, 0.9))
    const f = Math.pow(1920/window.innerWidth,3)
    const el = document.getElementById('feature')
    el.style.opacity = (1-k).toString()
    el.style.backgroundPositionY = (50+10*k*f).toString() + "%"
  }

  render() {
    return (
        <div>
          <BackgroundImage
              Tag="div"
              className="full-width-image margin-top-0 background-zoom-in"
              id="feature"
              ref={this.ref}
              durationFadeIn={500}
              fluid={this.props.image.childImageSharp.fluid}
              style={{
                backgroundAttachment: `fixed`,
                backgroundSize: `120%`,
              }}

          >
            <div
                style={{
                  display: 'flex',
                  height: '150px',
                  lineHeight: '1',
                  justifyContent: 'space-around',
                  alignItems: 'left',
                  flexDirection: 'column',
                }}
            >
              <h1
                  className="has-text-weight-medium is-size-3-mobile is-size-2-tablet is-size-1-widescreen is-pad-small font-feature"
              >
                {this.props.title}
              </h1>
              <h3
                  className="has-text-weight-medium is-size-5-mobile is-size-4-tablet is-size-3-widescreen is-pad-small font-feature"
              >
                {this.props.subheading}
              </h3>
            </div>
          </BackgroundImage>

          <section className="section section--gradient">
            <div className="container">
              <div className="section">
                <div className="columns">
                  <div className="column is-10 is-offset-1">
                    <div className="content">
                      <div className="content">
                        <div className="tile">
                          <h1 className="title">{this.props.mainpitch.title}</h1>
                        </div>
                        <div className="tile">
                          <h3 className="subtitle">{this.props.mainpitch.description}</h3>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column is-12">
                          <h3 className="has-text-weight-semibold is-size-2">
                            {this.props.heading}
                          </h3>
                          <p>{this.props.description}</p>
                        </div>
                      </div>
                      <Features gridItems={this.props.intro.blurbs}/>
                      <div className="columns">
                        <div className="column is-12 has-text-centered">
                          <Link className="btn" to="/products">
                            See all products
                          </Link>
                        </div>
                      </div>
                      <div className="column is-12">
                        <h3 className="has-text-weight-semibold is-size-2">
                          Latest stories
                        </h3>
                        <BlogRoll/>
                        <div className="column is-12 has-text-centered">
                          <Link className="btn" to="/blog">
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
    )
  }
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image{
          childImageSharp {
            fluid(maxWidth: 1920, quality: 80) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`