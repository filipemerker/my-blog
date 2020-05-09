import React, { memo } from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'
import categories from '../utils/categories'

const Category = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { frontmatter, html } = data.markdownRemark
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout
      location={location}
      title={siteTitle}
      category={pageContext.category}
    >
      <SEO
        title={categories[pageContext.category]}
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <hr
        style={{
          marginTop: rhythm(1),
          marginBottom: rhythm(1),
        }}
      />

      <SectionTitle>Artigos:</SectionTitle>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Card key={node.fields.slug}>
            <StyledLink style={{ boxShadow: `none` }} to={node.fields.slug}>
              <Title>{title}</Title>
              <Excerpt
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </StyledLink>
          </Card>
        )
      })}
    </Layout>
  )

}

const Card = styled.article`
  padding: 10px 0px;
`

const SectionTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  display: inline-block;
`

const Title = styled.h2`
  margin-top: ${rhythm(1 / 4)};
  margin-bottom: 0;
  font-size: 1rem;
  border: none;
`

const Excerpt = styled.p`
  line-height: 1.3rem;
  font-weight: 300;
  font-size: 1rem;
`

const StyledLink = styled(Link)`
  color: #7f9e8e;
  transition: all 0.15s linear;

  &:hover {
    text-decoration: none;
    color: #444;
  }
`

export default memo(Category)

export const pageQuery = graphql`
  query BlogPostsByCategory($category: String, $slug: String!) {
    site {
      siteMetadata {
        title
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___title], order: ASC }
      filter: {
        frontmatter: { category: { eq: $category }, page: { eq: "post" } }
      }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
