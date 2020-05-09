/* eslint-disable */
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'
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

import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const { frontmatter, excerpt, html } = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <>
        <Layout
          isPost
          location={this.props.location}
          title={siteTitle}
          category={frontmatter.category}
        >
          <Page>
            <Content>
              <SEO
                title={frontmatter.title}
                description={frontmatter.description || excerpt}
                category={frontmatter.category}
              />
              <Title>{frontmatter.title}</Title>
              <Info>{`Leitura de ${frontmatter.read || `5 minutos`}`}</Info>
              <div dangerouslySetInnerHTML={{ __html: html }} />
              <hr
                style={{
                  marginTop: rhythm(1),
                  marginBottom: rhythm(1),
                }}
              />
              <CTA>
                Esse post foi importante para você?{' '}
                <strong>Clique abaixo</strong> e compartilhe para edificar
                outros.
              </CTA>
              <hr
                style={{
                  marginTop: rhythm(1),
                  marginBottom: rhythm(1),
                }}
              />

              <Share>
                <FacebookShareButton ariaLabel="Share on Facebook" url={this.props.location.href}>
                  <FacebookIcon
                    iconBgStyle={{ fill: '#7f9e8e' }}
                    size={32}
                    round={true}
                  />
                  <Aria aria-hidden="true">facebook_share</Aria>
                </FacebookShareButton>
                <TwitterShareButton ariaLabel="Share on Twitter" url={this.props.location.href}>
                  <TwitterIcon
                    iconBgStyle={{ fill: '#7f9e8e' }}
                    size={32}
                    round={true}
                  />
                  <Aria aria-hidden="true">facebook_share</Aria>
                </TwitterShareButton>
                <WhatsappShareButton ariaLabel="Share on Whatsapp" url={this.props.location.href}>
                  <WhatsappIcon
                    iconBgStyle={{ fill: '#7f9e8e' }}
                    size={32}
                    round={true}
                  />
                  <Aria aria-hidden="true">facebook_share</Aria>
                </WhatsappShareButton>
                <EmailShareButton ariaLabel="Share via Email" url={this.props.location.href}>
                  <EmailIcon
                    iconBgStyle={{ fill: '#7f9e8e' }}
                    size={32}
                    round={true}
                  />
                  <Aria aria-hidden="true">facebook_share</Aria>
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
                  margin: 0,
                }}
              >
                <li>
                  {previous && (
                    <StyledLink to={previous.fields.slug} rel="prev">
                      ←{' '}
                      {previous.frontmatter.title.length > 35
                        ? `${previous.frontmatter.title.slice(0, 35)}...`
                        : previous.frontmatter.title}
                    </StyledLink>
                  )}
                </li>
                <li>
                  {next && (
                    <StyledLink to={next.fields.slug} rel="next">
                      {next.frontmatter.title.length > 35
                        ? `${next.frontmatter.title.slice(0, 35)}...`
                        : next.frontmatter.title}{' '}
                      →
                    </StyledLink>
                  )}
                </li>
              </ul>
            </Content>
            <Aside>
              <SectionTitle>Outros Posts</SectionTitle>
              <SectionList>
                {posts.map(post => {
                  const { title } = post.node.frontmatter
                  const { slug } = post.node.fields

                  return (
                    <SidebarItem key={title}>
                      <StyledLink style={{ boxShadow: `none` }} to={slug}>
                        {title}
                      </StyledLink>
                    </SidebarItem>
                  )
                })}
              </SectionList>
            </Aside>
          </Page>
        </Layout>
      </>
    )
  }
}

const Aria = styled.span`
  font-size: 0px;
  visibility: hidden;
`

const SectionTitle = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 20px;
`

const SectionList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const SidebarItem = styled.li`
  list-style: none;
  border-bottom: 1px solid #e7e7e7;
  margin-bottom: 10px;
  padding-bottom: 13px;
  font-size: 14px;
  line-height: 1rem;
  width: 210px;
`

const CTA = styled.p`
  text-align: center;
  color: #8c8c8c;

  em {
    font-size: 13px;
    line-height: 15px;
    display: block;
  }
`

const Info = styled.span`
  margin: 0px 0px 10px 0px;
  text-align: left;
  color: #8a8a8a;
  display: inline-block;
  font-size: 14px;
  font-weight: 100;
`

const Title = styled.h1`
  margin-bottom: 7px;
`

const Share = styled.section`
  display: flex;
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 200px;
  margin: 0 auto;
`

const Aside = styled.aside`
  padding: 10px 0px 10px 30px;
  border-radius: 10px;
  margin-top: 105px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1050px) {
    display: none;
  }
`

const Content = styled.section`
  img {
    width: 100%;
  }
  .gatsby-resp-image-wrapper {
    max-width: 100% !important;
  }
`

const Page = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`

const StyledLink = styled(Link)`
  color: #7f9e8e;
  transition: all 0.15s linear;

  &:hover {
    text-decoration: none;
    color: #444;
  }
`

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($category: String, $slug: String!) {
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
        read
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___title], order: ASC }
      limit: 10
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
          }
        }
      }
    }
  }
`
