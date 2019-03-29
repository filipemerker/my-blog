const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
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
      post: blogPost
    }
    const posts = result.data.allMarkdownRemark.edges
    const categories = posts.reduce((acc, post) => {
      const category = post.node.fields.slug.split(`/`)
      console.log('')

      return acc.includes(category) ? acc : acc.concat(category)
    }, [])

    console.log(categories)



    categories.forEach((category, index) => {
      const list = posts.filter(({ node: { fields: { slug = '' } } }) => (slug === category))
      console.log(list)

      list.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        createPage({
          path: post.node.fields.slug,
          component: components[post.node.frontmatter.page],
          context: {
            slug: post.node.fields.slug,
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
