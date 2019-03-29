const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const BlogPost = path.resolve(`./src/templates/blog-post.js`)
  const Category = path.resolve(`./src/templates/category.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                category
                title
                page
                tags
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const components = {
      category: Category,
      post: BlogPost
    }
    const nodes = result.data.allMarkdownRemark.edges
    const categories = nodes.reduce((acc, post) => {
      const category = post.node.frontmatter.category

      return acc.includes(category) ? acc : acc.concat(category)
    }, [])

    categories.forEach((category, index) => {
      const posts = nodes
        .filter(post => post.node.frontmatter.category === category)
        .filter(post => post.node.frontmatter.page === 'post')
      const pages = nodes
        .filter(post => post.node.frontmatter.page !== 'post')

      // create pages without navigation
      pages.forEach(({ node }, index) => {
        const { fields, frontmatter } = node

        createPage({
          path: fields.slug,
          component: components[frontmatter.page],
          context: { category }
        })
      })

      // create posts with navigation
      posts.forEach(({ node }, index) => {
        const { fields, frontmatter } = node
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        createPage({
          path: fields.slug,
          component: components[frontmatter.page],
          context: {
            slug: fields.slug,
            category,
            previous,
            next,
          },
        })
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
