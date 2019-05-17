import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Todos os Posts"
          description="Encontre aqui conteúdos relacionados a estudos bíblicos, devocionais e livros cristãos de qualidade."
          keywords={[`Bíblia`, `Estudo bíblico`, `Jesus`, `Cristão`, `Teologia`]}
        />
        <SectionTitle>Estudos, devocionais e esboços</SectionTitle>
        <Description>
          A finalidade desse site é ser um repositório de estudos, esboços, devocionais e meditações sobre a Palavra de Deus.
          <br /><br />
          <blockquote>
            "que a palavra do Senhor se propague e seja glorificada"
            <br /><br />1 Tessalonicenses 3:1
          </blockquote>
          Este era o desejo de Paulo: que à medida que a Palavra se propagasse, o próprio Senhor seria glorificado. 
          Este também é o nosso coração para este projeto. Propagar a palavra por meio do ensino para que o Filho,
          através de quem o Pai fala ainda hoje, receba toda a glória.
          <br /><br />
          Entretanto, a maioria dos artigos neste site será apenas um direcionamento com sugestões e informações
          para que você faça os seus próprios estudos e chegue ao conhecimento de Jesus pessoalmente.
          <br />
          Seja bem vindo e bons estudos!
        </Description>
        
        <SectionSubTitle style={{ marginTop: 30 }}>Textos recentes:</SectionSubTitle>
        {posts.map(({ node }) => {
          const { title, read } = node.frontmatter

          return (
            <Card key={node.fields.slug}>
              <StyledLink style={{ boxShadow: `none` }} to={node.fields.slug}>
                <Title>{title}</Title>
                <Info>{`Leitura de ${read || `5 minutos`}`}</Info>
              </StyledLink>
            </Card>
          )
        })}
      </Layout>
    )
  }
}

const Card = styled.article`
  padding: 10px 0px;
`

const Info = styled.span`
  text-align: left;
  color: #8c8c8c;
  display: block;
  width: 100%;
  font-size: 13px;
  font-weight: 100;
`

const SectionTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  display: inline-block;
  width: 100%;
  margin-top: 0px;
  margin-bottom: 20px;
`

const SectionSubTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  display: inline-block;
  width: 100%;
`

const Description = styled.p`
  width: 100%;
`

const Title = styled.span`
  margin-top: ${rhythm(1 / 4)};
  margin-bottom: 0;
  padding-bottom: 0;
  font-size: 1rem;
  border: none;
  font-weight: 600;
  line-height: 1.1;
  display: block;
`

const StyledLink = styled(Link)`
  color: #7f9e8e;
  transition: all .15s linear;

  &:hover {
    text-decoration: none;
    color: #444;
  }
`

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { page: { in: "post" } } }
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
            read
          }
        }
      }
    }
  }
`
