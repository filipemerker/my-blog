/**
 * Header component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

import { rhythm, scale } from "../utils/typography"

function Header(props) {
  const { location, title, category } = props

  const home = location.pathname === `${__PATH_PREFIX__}/`
  let heading

  if (home) {
    heading = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginLeft: 7,
          marginTop: 0,
          position: 'absolute'
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    heading = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
          position: 'absolute',
          color: `#353535`
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
            textTransform: `uppercase`,
            fontSize: 20,
            fontWeight: 300
          }}
          to={`/${category}`}
        >
          {` | ${category.split('-').join(' ')}`}
        </Link>
      </h3>
    )
  }

  return (
    <StaticQuery
      query={headerQuery}
      render={data => (
        <header
          style={{
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
            background: home ? `white` : `#b3c7c7`,
            marginBottom: home ? rhythm(2.5) : 0,
            minHeight: 70
          }}
        >
          {home && (
            <Image
              fixed={data.header.childImageSharp.fixed}
              alt={`Bíblia de estudos anotada`}
              style={{
                marginBottom: 0,
                borderRadius: 0,
                width: `100%`,
                opacity: .7
              }}
              imgStyle={{
                borderRadius: 0
              }}
            />
          )}
          {heading}
        </header>
      )}
    />
  )
}

const headerQuery = graphql`
  query HeaderQuery {
    header: file(absolutePath: { regex: "/header.jpg/" }) {
      childImageSharp {
        fixed(width: 1424, height: 250, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default Header
