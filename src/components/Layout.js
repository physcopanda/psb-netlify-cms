import React from 'react'
import {Helmet} from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './all.sass'
import useSiteMetadata from './SiteMetadata'
import {graphql, withPrefix} from 'gatsby'
import ThemeContextProvider from "../context/ThemeContext";

const TemplateWrapper = ({children}) => {
    const {site, allFile} = useSiteMetadata()
    return (
        <div>
            <Helmet>
                <html lang="en"/>
                <title>{site.title}</title>
                <meta name="description" content={site.description}/>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href={allFile.nodes[0].publicURL}
                    sizes="any"
                />

                {/*<link*/}
                {/*    rel="mask-icon"*/}
                {/*    href={`${withPrefix('/')}img/safari-pinned-tab.svg`}*/}
                {/*    color="#ff4400"*/}
                {/*/>*/}
                <meta name="theme-color" content="#fff"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta property="og:type" content="business.business"/>
                <meta property="og:title" content={site.title}/>
                <meta property="og:url" content="/"/>
                <meta
                    property="og:image"
                    content={`${withPrefix('/')}img/og-image.jpg`}
                />
            </Helmet>
            <ThemeContextProvider>
                <Navbar/>
            </ThemeContextProvider>
            <div>{children}</div>
            <Footer/>
        </div>
    )
}

export default TemplateWrapper

