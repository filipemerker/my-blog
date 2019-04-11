/**
 * Header component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from 'styled-components'
import Image from "gatsby-image"

import { scale } from "../utils/typography"
import categoriesDictionary from "../utils/categories"

function Header(props) {
  const { location, title, category } = props

  const home = location.pathname === `${__PATH_PREFIX__}/`
  let heading

  if (home) {
    heading = (
      <div
        style={{
          position: 'absolute',
          color: `#fff`,
          textAlign: `center`,
          padding: `5px 10px`,
          marginTop: `-25px`
        }}
      >
        <PrimaryLogo />
        <PrimaryHeader style={{...scale(1.5)}}>
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
        </PrimaryHeader>
        <Headline>Uma busca pelas insondáveis riquezas de <strong>Cristo</strong>.</Headline>
      </div>
    )
  } else {
    heading = (
      <SecondaryHeader>
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
            position: 'relative'
          }}
          to={`/`}
        >
          <SecondaryLogo />
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
          {` | ${categoriesDictionary[category]}`}
        </Link>
      </SecondaryHeader>
    )
  }

  return (
    <StaticQuery
      query={headerQuery}
      render={data => (
        <StyledHeader home={home}>
          {home && (
            <Image
              fixed={data.header.childImageSharp.fixed}
              alt={`Bíblia de estudos anotada`}
              style={{
                marginBottom: 0,
                borderRadius: 0,
                width: `100%`,
                opacity: .35
              }}
              imgStyle={{
                borderRadius: 0
              }}
            />
          )}
          {heading}
          <Nav>
            {data.allMarkdownRemark.edges.map(({ node: { frontmatter } }) => (
              <NavLink
                key={`nav-${frontmatter.category}`}
                active={(frontmatter.category === category) ? 1 : 0}
                to={`/${frontmatter.category}`}
              >
                {categoriesDictionary[frontmatter.category]}
              </NavLink>
            ))}
          </Nav>
        </StyledHeader>
      )}
    />
  )
}


const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.home ? `#000` : `#b3c7c7`};
  margin-bottom: ${props => props.home ? `30px` : `0px`};
  min-height: 70px;
  flex-direction: column;
`

const Nav = styled.nav`
  background: #F8F8F8;
  width: 100%;
  border-bottom: 1px solid #dadada;
  padding: 15px 0px;
  text-align: center;
`

const NavLink = styled(Link)`
  margin: 0px 10px;
  color: #7f9e8e;
  transition: all .2s linear;

  &:hover {
    text-decoration: none;
    color: #444;
  }

  ${props => props.active && `
    color:  #444;
    cursor: default;
  `}
`

const PrimaryHeader = styled.h1`
  margin-bottom: 5px;
  margin-top: 0;
  color: #efefef;
  font-weight: 700;
`

const PrimaryLogo = styled.div`
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEyNSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtOTUyLjM2MjE4KSI+PHBhdGggc3R5bGU9ImNvbG9yOiNiM2M3Yzc7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZTsiIGQ9Im0gMTgsOTY2LjM2MjIgMCw1OCBjIDEyLjc5MzE2MywtMC4wNjkgMjIuMzI2MzgsNi45MDk3IDMwLDEzLjMxMjUgbCAwLC01OS4zMTI1MiBDIDM5LjUwODM2Miw5NzEuMjQ0NjMgMjkuOTYzMzI0LDk2Ni4zNTEzIDE4LDk2Ni4zNjIyIHogbSA2NCwwIGMgLTExLjk2MzMyNCwtMC4wMTA5IC0yMS41MDgzNjIsNC44ODI0MyAtMzAsMTEuOTk5OTggbCAwLDU5LjMxMjUyIGMgNy42NzM2MiwtNi40MDI3IDE3LjIwNjgzNywtMTMuMzgxNCAzMCwtMTMuMzEyNSB6IG0gLTc0LDggMCw1OCAzNSw2IGMgLTYuNjUxNzUyLC01LjAxNTMgLTE1LjA0MjY3NSwtMTAuMDU0IC0yNSwtMTAgbCAtMiwwIGMgLTEuMDQ3MTY5LC0xMGUtNSAtMS45OTk4OTUsLTAuOTUyOSAtMiwtMiBsIDAsLTIgMCwtNDkuMTU2MjUgeiBtIDg0LDAgLTYsMC44NDM3NSAwLDQ5LjE1NjI1IDAsMiBjIC0xLjA1ZS00LDEuMDQ3MiAtMC45NTI4MzEsMS45OTk5IC0yLDIgbCAtMiwwIGMgLTkuOTU3MzI1LC0wLjA1NCAtMTguMzQ4MjQ4LDQuOTg0NyAtMjUsMTAgbCAzNSwtNiB6IiBmaWxsPSIjYjNjN2M3IiBzdHJva2U9Im5vbmUiIG1hcmtlcj0ibm9uZSIgdmlzaWJpbGl0eT0idmlzaWJsZSIgZGlzcGxheT0iaW5saW5lIiBvdmVyZmxvdz0idmlzaWJsZSIvPjwvZz48L3N2Zz4=);
  width: 53px;
  height: 80px;
  display: inline-block;
  margin-bottom: -25px;
  background-repeat: no-repeat;
  background-position: center center;
`

const Headline = styled.span`
  font-weight: 200;
  font-size: 20px;
  line-height: 20px;
  display: inline-block;
  max-width: 420px;
  color: #efefef;
`

const SecondaryHeader = styled.h3`
  font-family: Oswald, sans-serif;
  margin-top: 25px;
  margin-bottom: 22px;
  position: relative;
  color: rgb(53, 53, 53);
  padding: 0px 7%;
`

const SecondaryLogo = styled.div`
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEyNSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtOTUyLjM2MjE4KSI+PHBhdGggc3R5bGU9ImNvbG9yOiMzNTM1MzU7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZTsiIGQ9Im0gMTgsOTY2LjM2MjIgMCw1OCBjIDEyLjc5MzE2MywtMC4wNjkgMjIuMzI2MzgsNi45MDk3IDMwLDEzLjMxMjUgbCAwLC01OS4zMTI1MiBDIDM5LjUwODM2Miw5NzEuMjQ0NjMgMjkuOTYzMzI0LDk2Ni4zNTEzIDE4LDk2Ni4zNjIyIHogbSA2NCwwIGMgLTExLjk2MzMyNCwtMC4wMTA5IC0yMS41MDgzNjIsNC44ODI0MyAtMzAsMTEuOTk5OTggbCAwLDU5LjMxMjUyIGMgNy42NzM2MiwtNi40MDI3IDE3LjIwNjgzNywtMTMuMzgxNCAzMCwtMTMuMzEyNSB6IG0gLTc0LDggMCw1OCAzNSw2IGMgLTYuNjUxNzUyLC01LjAxNTMgLTE1LjA0MjY3NSwtMTAuMDU0IC0yNSwtMTAgbCAtMiwwIGMgLTEuMDQ3MTY5LC0xMGUtNSAtMS45OTk4OTUsLTAuOTUyOSAtMiwtMiBsIDAsLTIgMCwtNDkuMTU2MjUgeiBtIDg0LDAgLTYsMC44NDM3NSAwLDQ5LjE1NjI1IDAsMiBjIC0xLjA1ZS00LDEuMDQ3MiAtMC45NTI4MzEsMS45OTk5IC0yLDIgbCAtMiwwIGMgLTkuOTU3MzI1LC0wLjA1NCAtMTguMzQ4MjQ4LDQuOTg0NyAtMjUsMTAgbCAzNSwtNiB6IiBmaWxsPSIjMzUzNTM1IiBzdHJva2U9Im5vbmUiIG1hcmtlcj0ibm9uZSIgdmlzaWJpbGl0eT0idmlzaWJsZSIgZGlzcGxheT0iaW5saW5lIiBvdmVyZmxvdz0idmlzaWJsZSIvPjwvZz48L3N2Zz4=);
  width: 35px;
  height: 35px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  left: -40px;
  top: -3px;

  @media (max-width: 650px) {
    display: none;
  }
`

const headerQuery = graphql`
  query HeaderQuery {
    header: file(absolutePath: { regex: "/header.jpg/" }) {
      childImageSharp {
        fixed(width: 1424, height: 285, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMarkdownRemark(filter: {frontmatter: {page: { eq: "category" }}}) {
      edges {
        node {
          frontmatter {
            category
          }
        }
      }
    }
  }
`

export default Header
