import React, { createRef }  from 'react'
import './all.sass'
import {ThemeContext} from "../context/ThemeContext";

class Progress extends React.Component {

    static contextType = ThemeContext

    componentDidMount() {
        document.addEventListener('scroll', this.scroll, { capture: false, passive: true})
        window.addEventListener('resize', this.scroll, { capture: false, passive: true})
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scroll, { capture: false, passive: true})
        window.removeEventListener('resize', this.scroll, { capture: false, passive: true})
    }

    constructor(props) {
        super(props)
        this.ref = createRef()
    }

    scroll = () => {
        const scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
        const body = document.getElementsByTagName('body').item(0)
        const bodyHeight = document.documentElement.scrollHeight
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
        this.ref.current.style.width = (100*scrollTop/(bodyHeight - windowHeight)).toString() + '%'
        if(scrollTop>0){
            if( ! body.classList.contains('scroll')) {
                body.classList.add('scroll')
            }
        } else {
           body.classList.remove('scroll')
        }
        if(scrollTop > this.context.scrollTop) {
            body.classList.remove('up')
            body.classList.add('down')
        } else {
            body.classList.remove('down')
            body.classList.add('up')
        }
        // finally write the scroll into state for comparison on next scroll
        this.context.setScrollTop(scrollTop)
    }

    render() {
        return <div
            ref={this.ref}
            className="progressbar"
            style={{
                position: 'fixed',
                height: '5px',
                left: '0',
                top: '0',
            }}
        />
    }
}

export default Progress