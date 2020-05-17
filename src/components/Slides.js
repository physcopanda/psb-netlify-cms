import React from 'react'
import BackgroundImage from "gatsby-background-image";

class Slide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: props.slide.active
        }
    }

    shouldComponentUpdate(nextProps) {
        let el = document.getElementsByClassName('slide').item(this.props.slide.index)
        if(nextProps.slide.active !== this.state.active){
            this.setState({
                active: nextProps.slide.active
            })
            el.style.opacity = null
            if(nextProps.slide.active) {
                el.classList.remove('slide-off')
                el.classList.add('slide-on')
                el.style.zIndex = 2
            } else {
                el.classList.remove('slide-on')
                el.classList.add('slide-off')
                el.style.zIndex = 1
            }
            return true;
        } else {
            el.style.zIndex = 0
            el.style.opacity = 0
        }
        return false
    }

    render() {
        const inner = <div
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
                className="has-text-weight-normal is-size-3-mobile is-size-2-tablet is-size-1-widescreen is-pad-small font-feature"
            >
                {this.props.slide.heading}
            </h1>
            <h3
                className="has-text-weight-normal is-size-5-mobile is-size-4-tablet is-size-3-widescreen is-pad-small font-feature"
            >
                {this.props.subheading}
            </h3>
        </div>
        return (
            <BackgroundImage
                Tag="div"
                className={"full-width-image margin-top-0 slide"}
                durationFadeIn={1000}
                fluid={this.props.slide.image.childImageSharp.fluid}
                style={{
                    position: `absolute`,
                    backgroundSize: `cover`,
                }}
            >
            {inner}
            </BackgroundImage>
        )
    }
}

class Slides extends React.Component {
    timer = null;
    constructor(props) {
        for(let i=0; i < props.slides.length; i++){
            const fgcol = encodeURIComponent(props.slides[i].image.colors.darkVibrant)
            const bgcol = encodeURIComponent(props.slides[i].image.colors.lightVibrant)
            props.slides[i].index = i
            props.slides[i].image.childImageSharp.fluid.tracedSVG = props.slides[i].image.childImageSharp.fluid.tracedSVG.replace("fill='white'", "fill='"+fgcol+"'").replace("fill='%23f0f'", "fill='"+bgcol+"'")
        }
        super(props);
        this.state = {
            index: 0
        };
    }

    componentDidMount() {
        this.timer = setInterval(this.next, this.props.duration)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    next = (ev) => {
        this.setState({
            index: (this.state.index + 1) % this.props.slides.length
        })
    }

    handleClick = (ev) => {
        if (ev.keyCode === 13) {
            // @todo handle keyboard input?
        }
    }

    render() {
        const inner = this.props.slides.map((slide, key) => {
            slide.active = slide.index === this.state.index;
            return <Slide slide={slide} key={key} />
        })
        return (
            <div
                style={{
                    position: 'relative',
                    height: '600px'
                }}
            >
                {inner}
            </div>
        )
    }
}

export default Slides
