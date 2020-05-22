import React from 'react'
import BackgroundImage from "gatsby-background-image";

class Slide extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const z = 100-this.props.slide.index
        const inner = <div
            style={{
                display: 'flex',
                zIndex: z+1,
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
                ref={this.props.slide.ref}
                Tag='div'
                className='full-width-image margin-top-0'
                durationFadeIn={this.props.traceTime}
                fadeIn={false}
                onLoad={ () =>{ this.props.callback(this) } }
                fluid={{
                    aspectRatio: this.props.slide.image.childImageSharp.fluid.aspectRatio,
                    src: this.props.slide.image.childImageSharp.fluid.src,
                    srcSet: this.props.slide.image.childImageSharp.fluid.srcSet,
                    srcWebp: this.props.slide.image.childImageSharp.fluid.srcWebp,
                    srcSetWebp: this.props.slide.image.childImageSharp.fluid.srcSetWebp,
                    sizes:this.props.slide.image.childImageSharp.fluid.sizes,
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
                {inner}
            </BackgroundImage>
        )
    }
}

class Slides extends React.Component {
    loadedTimes = []
    index = 0
    started = new Date()
    slideState = 0
    constructor(props) {
        for(let i = 0; i < props.slides.length; i++){
            const fgcol = encodeURIComponent(props.slides[i].image.colors.darkVibrant)
            const bgcol = encodeURIComponent(props.slides[i].image.colors.lightVibrant)
            props.slides[i].index = i
            props.slides[i].image.childImageSharp.fluid.tracedSVG = props.slides[i].image.childImageSharp.fluid.tracedSVG.replace("fill='white'", "fill='"+fgcol+"'").replace("fill='%23f0f'", "fill='"+bgcol+"'")
            props.slides[i].ref = React.createRef()
        }
        super(props)
    }

    componentDidMount() {
        this.interval = setInterval(() => { this.play() }, 100)
    }

    childLoaded(slide){
        const now = new Date()
        this.loadedTimes[slide.index] = now - this.started
    }

    play(){
        const time = new Date()
        const deltaTime = time - this.started

        // dom ref always required
        const slide = this.props.slides[this.index].ref.current
        if( ! slide ) return false

        // slide states
        // [0: show_trace ... 1: trace ... 2: hold ... 3: transit]...
        // after state 0, loaded is required
        const is_loaded = this.loadedTimes[this.index] ? true : false
        const nextIndex =  (this.index + 1) % this.props.slides.length;
        if( this.slideState > 0 && ! is_loaded) return false
        switch(this.slideState){
            case 0:
                slide.selfRef.children[2].style.opacity = 1
                this.slideState = 1
                break;
            case 1:
                // check for end of trace
                if(deltaTime > this.props.traceTime){
                    slide.selfRef.children[2].style.transition = `opacity 500ms`;
                    slide.selfRef.children[2].style.opacity = 0;
                    slide.selfRef.style.visibility = 'visible'
                    this.slideState = 2
                }
                break;
            case 2:
                // check for end of hold
                if(deltaTime > this.props.traceTime + this.props.holdTime){
                    const nextSlide = this.props.slides[nextIndex].ref.current
                    slide.selfRef.style.transition = `visibility 0s ` + this.props.transitTime + `ms, opacity ` + this.props.transitTime + `ms`
                    slide.selfRef.style.opacity = 0;
                    //slide.selfRef.style.visibility = 'hidden'
                    nextSlide.selfRef.children[2].style.transition = `opacity ` + this.props.transitTime + `ms`
                    nextSlide.selfRef.children[2].style.opacity = 1;
                    nextSlide.selfRef.style.opacity = 1;
                    this.slideState = 3
                }
                break;
            case 3:
                if(deltaTime > this.props.traceTime + this.props.holdTime + this.props.transitTime) {
                    this.index = nextIndex
                    this.slideState = 0
                    this.started = new Date()
                }
        }
    }

    checkloaded() {
        let loaded = this.loadedTimes.length === this.props.slides.length
        if(loaded){
            clearInterval(this.interval)
            console.log(this.loadedTimes)
        }
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
        const inner = this.props.slides.map((slide, key) => {
            return <Slide
                callback={() => { this.childLoaded(slide) }}
                slide={slide}
                key={key}
                traceTime={this.props.traceTime}
                transitTime={this.props.transitTime}
            />
        })
        return (
            <div
                style={{
                    position: 'relative',
                    height: '600px'
                }}
                id={this.props.id}
            >
                {inner}
            </div>
        )
    }
}

export default Slides
