import React from "react"
import { Link } from "gatsby"

import "../styles/index.scss"

const LandingPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <div>
      <h1 className="mainTitle">{siteTitle}</h1>
      <section className="buttons">
        <div className="buttonContainer">
          <Link to="./blog" className="btn btn-1" style={{ boxShadow: "none" }}>
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <div className="buttonText">Blog</div>
          </Link>
          <Link
            to="./projects"
            className="btn btn-1"
            style={{ boxShadow: "none" }}
          >
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <div className="buttonText">Projects</div>
          </Link>
          <Link
            to="./about"
            className="btn btn-1"
            style={{ boxShadow: "none" }}
          >
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <div className="buttonText">About Me</div>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
