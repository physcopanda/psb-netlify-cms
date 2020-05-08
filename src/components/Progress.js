import React, { createRef }  from 'react'
import './all.sass'

class Progress extends React.Component {

    componentDidMount() {
        document.addEventListener('scroll', this.scroll, { capture: false, passive: true})
        window.addEventListener('resize', this.scroll, { capture: false, passive: true})
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scroll, { capture: false, passive: true})
        window.removeEventListener('resize', this.scroll, { capture: false, passive: true})
    }

    constructor() {
        super()
        this.ref = createRef()
    }

    scroll = () => {
        const scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
        const bodyHeight = document.documentElement.scrollHeight
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
        this.ref.current.style.width = (100*scrollTop/(bodyHeight - windowHeight)).toString() + '%'
        if(scrollTop>0){
            if( ! document.getElementsByTagName('body').item(0).classList.contains('scroll')) {
                document.getElementsByTagName('body').item(0).classList.add('scroll')
            }
        } else {
            document.getElementsByTagName('body').item(0).classList.remove('scroll')
        }
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