module.exports = {
  siteMetadata: {
    title: `Examinando as Escrituras`,
    author: `Filipe Merker`,
    description: `O lugar certo para encontrar estudos bíblicos aprofundados, devocionais e bons livros cristãos.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      twitter: `filipemerker`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`
    },
    {
      resolve: `gatsby-plugin-remove-serviceworker`
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: `nofollow`
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 690,
              quality: 60
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: true,
        useMozJpeg: true,
        defaultQuality: 60,
        quality: 60,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-28548241-3'
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Examinando as Escrituras`,
        short_name: `Examinando as Escrituras`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#b3c7c7`,
        display: `minimal-ui`,
        icon: `content/assets/book.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
