/* eslint-disable */
import React from "react"
import styled from 'styled-components'
import { Link, graphql } from "gatsby"
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,

  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const { frontmatter, excerpt, html } = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext
    const siteTitle = this.props.data.site.siteMetadata.title

    console.log(this.props)

    return (
      <Layout location={this.props.location} title={siteTitle} category={frontmatter.category}>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description || excerpt}
        />
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        />
        <Share>
          <FacebookShareButton url={this.props.location.href}>
            <FacebookIcon iconBgStyle={{ fill: '#7f9e8e'}} size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={this.props.location.href}>
            <TwitterIcon iconBgStyle={{ fill: '#7f9e8e'}} size={32} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton url={this.props.location.href}>
            <WhatsappIcon iconBgStyle={{ fill: '#7f9e8e'}} size={32} round={true} />
          </WhatsappShareButton>
          <EmailShareButton url={this.props.location.href}>
            <EmailIcon iconBgStyle={{ fill: '#7f9e8e'}} size={32} round={true} />
          </EmailShareButton>
        </Share>
        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
            margin: 0
          }}
        >
          <li>
            {previous && (
              <StyledLink to={previous.fields.slug} rel="prev">
                ← {
                    previous.frontmatter.title.length > 35
                      ? `${previous.frontmatter.title.slice(0,35)}...`
                      : previous.frontmatter.title
                  }
              </StyledLink>
            )}
          </li>
          <li>
            {next && (
              <StyledLink to={next.fields.slug} rel="next">
                {
                  next.frontmatter.title.length > 35
                    ? `${next.frontmatter.title.slice(0,35)}...`
                    : next.frontmatter.title
                } →
              </StyledLink>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

const Share = styled.section`
  display: flex;
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 200px;
  margin: 0 auto;
`

const StyledLink = styled(Link)`
  color: #7f9e8e;
  transition: all .15s linear;

  &:hover {
    text-decoration: none;
    color: #444;
  }
`

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        category
      }
    }
  }
`
