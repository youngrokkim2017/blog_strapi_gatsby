module.exports = {
  siteMetadata: {
    title: `Berkeley Science Review`,
    description: `Gatsby blog with Strapi as headless CMS`,
    // url: ,
    // image: ,
    author: `@gatsbyjs and @strapi`,
  },
  plugins: [
    // {
    //   resolve: `gatsby-plugin-lunr`,
    //   options: {
    //     languages: [{ nane: 'en' }],
    //     fields: [
    //       { name: `title`, store: true },
    //       { name: `author`, store: true },
    //       { name: `content`, store: true },
    //     ],
    //   }
    // },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        contentTypes: [
          `user`,
          `article`,
          `category`,
          `issue`,
          `tag`,
        ],
        singleTypes: [
          `about`,
          `blog`, 
          `magazine`,
          `subscribe`,
        ],
        queryLimit: 1000000,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`
  ],
}
