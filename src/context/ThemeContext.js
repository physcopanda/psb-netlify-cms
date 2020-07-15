import React, {Component, createContext} from "react"

const defaultState = {
    scrollTop: 0,
}

export const ThemeContext = createContext(defaultState)

class ThemeContextProvider extends Component {
    state = {
        scrollTop: 0,
    }

    setScrollTop = (scrollTop) => {
        this.setState({ scrollTop })
        localStorage.setItem("scrollTop", JSON.stringify(this.state.scrollTop))
    }

    componentDidMount() {
        // Getting dark mode value from localStorage!
        const scrollTop = JSON.parse(localStorage.getItem("scrollTop"))
        this.setState({ scrollTop })
    }

    render() {
        return (
            <ThemeContext.Provider
                value={{
                    ...this.state,
                    setScrollTop: this.setScrollTop,
                }}
            >
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}

export default ThemeContextProvider