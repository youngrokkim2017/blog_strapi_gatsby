module.exports = {
  siteMetadata: {
    title: `Berkeley Science Review`,
    description: `Gatsby blog with Strapi as headless CMS`,
    // url: ,
    // image: ,
    author: `@gatsbyjs and @strapi`,
  },
  plugins: [
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
          `authors`,
          `article`,
          `category`,
          `issue`,
          `tag`,
          `blog-article`,
          `blog-tag`,
          `magazine-issue`,
          `magazine-tag`,
        ],
        singleTypes: [
          `about`,
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
    // FLEXSEARCH
    {
      resolve: 'gatsby-plugin-flexsearch',
      options: {
        languages: ['en'],
        type: 'allStrapiArticle',
        fields: [
          {
            name: 'title',
            indexed: true,
            resolver: 'allStrapiArticle.edges.node.title',
            attributes: {
              encode: 'balance',
              tokenize: 'strict',
              threshold: 6,
              depth: 3,
            },
            store: true,
          },
          {
            name: 'content',
            indexed: true,
            resolver: 'allStrapiArticle.edges.node.content',
            attributes: {
              encode: 'balance',
              tokenize: 'strict',
              threshold: 6,
              depth: 3,
            },
            store: true,
          },
          {
            name: 'author',
            indexed: true,
            resolver: 'allStrapiArticle.edges.node.author',
            attributes: {
              encode: 'balance',
              tokenize: 'strict',
              threshold: 6,
              depth: 3,
            },
            store: true,
          },
          // {
          //   name: 'url',
          //   indexed: false,
          //   resolver: 'fields.slug',
          //   store: true,
          // },
        ],
      },
    },
    // // GATSBY-LOCAL-SEARCH
    // {
    //   resolve: "gatsby-plugin-local-search",
    //   options: {
    //     name: "blog",
    //     engine: "flexsearch",
    //     engineOptions: {
    //       encode: "icase",
    //       tokenize: "forward",
    //       async: false,
    //     },
    //     query: `
    //       {
    //         allStrapiArticle {
    //           nodes {
    //             id
    //             title
    //             author
    //             content
    //           }
    //         }
    //       }
    //     `,
    //     ref: "id",
    //     index: ["title", "content"],
    //     store: ["id", "title", "author", "content",],
    //     normalizer: ({ data }) =>
    //       data.allStrapiArticle.nodes.map(node => ({
    //         id: node.id,
    //         title: node.title,
    //         author: node.author,
    //         content: node.content,
    //       })),
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`
  ],
}
