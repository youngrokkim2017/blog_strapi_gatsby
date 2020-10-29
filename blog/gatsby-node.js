/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for article nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getArticles = makeRequest(
    graphql,
    `
    {
      allStrapiArticle {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  // const getAuthors = makeRequest(
  //   graphql,
  //   `
  //   {
  //     allStrapiUser {
  //       edges {
  //         node {
  //           id
  //         }
  //       }
  //     }
  //   }
  //   `
  // ).then(result => {
  //   // Create pages for each user.
  //   result.data.allStrapiUser.edges.forEach(({ node }) => {
  //     createPage({
  //       path: `/authors/${node.id}`,
  //       component: path.resolve(`src/templates/author.js`),
  //       context: {
  //         id: node.id,
  //       },
  //     })
  //   })
  // })

  const getCategories = makeRequest(
    graphql,
    `
    {
      allStrapiCategory {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each Category.
    result.data.allStrapiCategory.edges.forEach(({ node }) => {
      createPage({
        path: `/categories/${node.id}`,
        // path: `/${node.id}`,
        component: path.resolve(`src/templates/category.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  const getAbout = makeRequest(
    graphql,
    `
    {
      allStrapiAbout {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each About.
    result.data.allStrapiAbout.edges.forEach(({ node }) => {
      createPage({
        path: `/about/`,
        // path: `/${node.id}`,
        component: path.resolve(`src/templates/about.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  const getSubscribe = makeRequest(
    graphql,
    `
    {
      allStrapiSubscribe {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each Subscribe.
    result.data.allStrapiSubscribe.edges.forEach(({ node }) => {
      createPage({
        path: `/subscribe/`,
        // path: `/${node.id}`,
        component: path.resolve(`src/templates/subscribe.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  const getBlog = makeRequest(
    graphql,
    `
    {
      allStrapiBlog {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each Blog.
    result.data.allStrapiBlog.edges.forEach(({ node }) => {
      createPage({
        path: `/blog/`,
        // path: `/${node.id}`,
        component: path.resolve(`src/templates/blog.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  const getMagazine = makeRequest(
    graphql,
    `
    {
      allStrapiMagazine {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each Magazine.
    result.data.allStrapiMagazine.edges.forEach(({ node }) => {
      createPage({
        path: `/magazine/`,
        // path: `/${node.id}`,
        component: path.resolve(`src/templates/magazine.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  // Queries for articles and authors nodes to use in creating pages.
  return Promise.all([
    getArticles, 
    // getAuthors,
    getCategories,
    getAbout,
    getSubscribe,
    getBlog,
    getMagazine,
  ])
}