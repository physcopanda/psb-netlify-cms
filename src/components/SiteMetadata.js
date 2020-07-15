import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { site, allFile } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
          }
        }
        allFile(
          limit: 1
          filter: {
            name: { eq: "favicon" }
            ext: { eq: ".svg" }
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "" }
          }
        ) {
          nodes {
            publicURL
          }
        }
      }
    `
  )
  return {site, allFile}
}

export default useSiteMetadata
