import React from 'react'
import BackgroundImage from "gatsby-background-image";

class Slide extends React.Component {

    render() {
        const z = 50 - this.props.slide.index
        const inner = <div
            style={{
                display: 'flex',
                zIndex: z + 1,
                height: '150px',
                lineHeight: '1',
                justifyContent: 'space-around',
                alignItems: 'left',
                flexDirection: 'column',
            }}
        >
            <h1
                className="has-text-weight-normal is-size-2-mobile is-size-1-tablet is-size-0-widescreen is-pad-small font-feature hue-shift-180-saturate-3"
                style={{
                    color: this.props.slide.image.colors.lightVibrant,
                }}
            >
                {this.props.slide.heading}
            </h1>
            <h3
                className="has-text-weight-normal is-size-5-mobile is-size-4-tablet is-size-3-widescreen is-pad-small font-feature"
            >
                {this.props.subheading}
            </h3>
        </div>
        if ( ! this.props.slide.image.childImageSharp ) {
            return (
                <div
                    className='full-width-image margin-top-0'
                    ref={this.props.slide.ref}
                    style={{
                        visibility: 'visible',
                        opacity: 1,
                        backgroundImage: 'url("' + this.props.slide.image + '")',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        position: 'absolute',
                        top: 0,
                        width: '100vw',
                        height: '600px',
                        zIndex: z,
                    }}
                >
                    {inner}
                </div>
            )
        } else {
            return (
                <div>
                    <BackgroundImage
                        ref={this.props.slide.ref}
                        Tag='div'
                        className='full-width-image margin-top-0'
                        durationFadeIn={this.props.traceTime}
                        fadeIn={false}
                        onLoad={() => {
                            this.props.callback(this)
                        }}
                        fluid={{
                            aspectRatio: this.props.slide.image.childImageSharp.fluid.aspectRatio,
                            src: this.props.slide.image.childImageSharp.fluid.src,
                            srcSet: this.props.slide.image.childImageSharp.fluid.srcSet,
                            srcWebp: this.props.slide.image.childImageSharp.fluid.srcWebp,
                            srcSetWebp: this.props.slide.image.childImageSharp.fluid.srcSetWebp,
                            sizes: this.props.slide.image.childImageSharp.fluid.sizes,
                        }}
                        style={{
                            visibility: 'visible',
                            position: `absolute`,
                            backgroundSize: `cover`,
                            zIndex: z
                        }}
                    >
                        <div
                            className='full-width-image margin-top-0'
                            style={{
                                visibility: 'visible',
                                opacity: 1,
                                backgroundImage: 'url("' + this.props.slide.image.childImageSharp.fluid.tracedSVG + '")',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                position: 'absolute',
                                top: 0,
                                width: '100vw',
                                height: '600px',
                                zIndex: z,
                            }}
                        />
                    </BackgroundImage>
                    <div className='full-width-image margin-top-0'
                         style={{
                             transition: 'opacity ' + this.props.transitTime + 'ms 0s',
                             opacity: 1,
                             position: 'absolute',
                             top: 0,
                             width: '100vw',
                             height: '600px',
                             zIndex: z
                         }}
                         >
                        {inner}
                    </div>
                </div>
            )
        }
    }
}

class Slides extends React.Component {
    loadedTimes = []
    index = 0
    started = new Date()
    slideState = 0
    cms = false
    constructor(props) {
        for(let i = 0; i < props.slides.length; i++){
            // give our slides an index
            props.slides[i].index = i
            // if not in admin
            if(props.slides[i].image.childImageSharp) {
                // modify the svg colours to use slide image prominent colours
                const fgcol = encodeURIComponent(props.slides[i].image.colors.darkMuted)
                const bgcol = encodeURIComponent(props.slides[i].image.colors.lightMuted)
                props.slides[i].image.childImageSharp.fluid.tracedSVG = props.slides[i].image.childImageSharp.fluid.tracedSVG.replace("fill='white'", "fill='" + fgcol + "'").replace("fill='%23f0f'", "fill='" + bgcol + "'")
            }
            // ensure we can reference the slide in the dom later
            if( ! props.slides[i].ref ) props.slides[i].ref = React.createRef()
        }
        super(props)
        this.state = {
            index: this.index
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => { this.play() }, 10)
        this.cms = !this.props.slides[0].image.childImageSharp
    }

    childLoaded(slide){
        const now = new Date()
        this.loadedTimes[slide.index] = now - this.started
    }

    play(){
        const time = new Date()
        const deltaTime = time - this.started
        const nextIndex =  (this.index + 1) % this.props.slides.length

        // if an cms netlify mode - just switch index dont try and do fancy stuff!
        if(this.cms){
            if(deltaTime > this.props.traceTime + this.props.holdTime + this.props.transitTime) {
                this.index = nextIndex
                this.started = new Date()
                this.setState({index: nextIndex})
            }
        }

        // dom ref always required
        if( ! this.props.slides[this.index].ref || ! this.props.slides[this.index].ref.current || ! this.props.slides[this.index].ref.current.selfRef) return false
        const slide = this.props.slides[this.index].ref.current
        const nextSlide = this.props.slides[nextIndex].ref.current
        // slide states
        // [0: trace ... 1: hold ... 2: transit]...

        // loaded is required to change state
        if( ! this.loadedTimes[this.index] ) return false

        switch(this.slideState){
            case 2:
                if(deltaTime > this.props.traceTime + this.props.holdTime + this.props.transitTime) {
                    this.index = nextIndex
                    this.started = new Date()
                    this.setState({index: nextIndex})
                    if(this.traceTime === 0){
                        this.slideState = 1
                        // play next transition now
                        this.play()
                    } else {
                        this.slideState = 0
                    }
                }
                break
            case 1:
                // check for end of hold
                if(deltaTime > this.props.traceTime + this.props.holdTime){
                    slide.selfRef.style.transition = `visibility 0s ` + this.props.transitTime + `ms, opacity ` + this.props.transitTime + `ms`
                    slide.selfRef.style.opacity = 0
                    nextSlide.selfRef.children[2].style.transition = `opacity ` + this.props.transitTime + `ms`
                    nextSlide.selfRef.children[2].style.opacity = 1
                    nextSlide.selfRef.style.opacity = 1
                    //nextSlide.selfRef.style.visibility = 'hidden'
                    this.slideState = 2
                    nextSlide.selfRef.parentElement.children[1].style.opacity = 1
                    nextSlide.selfRef.parentElement.children[1].style.zIndex = 111
                    slide.selfRef.parentElement.children[1].style.opacity = 0
                    slide.selfRef.parentElement.children[1].style.zIndex = 110
                }
                break
            case 0:
            default:
                // check for end of trace
                if(deltaTime > this.props.traceTime){
                    slide.selfRef.children[2].style.transition = `opacity ` + this.props.fadeTime + `ms`
                    slide.selfRef.children[2].style.opacity = 0
                    slide.selfRef.style.visibility = 'visible'
                    slide.selfRef.style.transition = `transform `+(this.props.holdTime+this.props.transitTime)+`ms`
                    slide.selfRef.style.transform = `scale(1.05)`
                    nextSlide.selfRef.style.transition = `transform 0s`
                    nextSlide.selfRef.style.transform = `scale(1)`
                    this.slideState = 1
                }
                break
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        return false;
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    handleClick = (ev) => {
        if (ev.keyCode === 13) {
            // @todo handle keyboard input?
        }
    }

    render() {
        const inner = (() => {
            if( ! this.cms){
                return this.props.slides.map((slide, key) => {
                    return <Slide
                        callback={() => { this.childLoaded(slide) }}
                        slide={slide}
                        key={key}
                        traceTime={this.props.traceTime}
                        transitTime={this.props.transitTime}
                    />
                })
            } else {
                const slide = this.props.slides[this.index]
                return <Slide
                    callback={() => { this.childLoaded(slide) }}
                    slide={slide}
                    key={0}
                    traceTime={this.props.traceTime}
                    transitTime={this.props.transitTime}
                />
            }
        })()

        return (
            <div
                style={{
                    position: 'relative',
                    height: '600px',
                    overflow: 'hidden',
                }}
                id={this.props.id}
            >
                {inner}
            </div>
        )
    }
}

export default Slides
