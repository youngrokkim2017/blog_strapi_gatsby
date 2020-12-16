/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);

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
// exports.createPages = ({ actions, graphql, page }) => {
  const { createPage } = actions;

  // if (page.path === `/`) {
  //   page.matchPath = `/*`;
  //   createPage(page);
  // }

  // console.log("page - ", page);
  // console.log("page - ", page.path);
  // // if (page.path.match(/^\/app/)) {
  // if (page.matchPath || page.path.match(/^\/search/)) {
  //   // page.matchPath = "/app/*"
  //   page.matchPath = "/search/*"

  //   // // Update the page.
  //   // createPage(page)
  //   createPage({
  //     path: "/search",
  //     matchPath: "/search/*",
  //     component: path.resolve(`src/pages/search.js`)
  //   })
  // }

  // // AUTHOR CONTENT TYPE
  // const getAuthors = makeRequest(
  //   graphql,
  //   `
  //   {
  //     allStrapiUser {
  //       edges {
  //         node {
  //           id
  //           name
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

  // BLOG CONTENT TYPES
  const getArticles = makeRequest(
    graphql,
    `
    {
      allStrapiArticle (sort: { fields: [created_at], order: DESC }) {
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
        path: `/blog/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  const getCategories = makeRequest(
    graphql,
    `
    {
      allStrapiCategory {
        edges {
          node {
            id
            title
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each Category.
    result.data.allStrapiCategory.edges.forEach(({ node }) => {
      createPage({
        // path: `/categories/${node.id}`,
        path: `/categories/${node.title.split(" ").join("-")}`,
        component: path.resolve(`src/templates/category.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  // MAGAZINE CONTENT TYPES
  const getIssues = makeRequest(
    graphql,
    `
    {
      allStrapiIssue {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each Issue.
    result.data.allStrapiIssue.edges.forEach(({ node }) => {
      createPage({
        path: `/magazine/${node.id}`,
        component: path.resolve(`src/templates/issue.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  const getTags = makeRequest(
    graphql,
    `
    {
      allStrapiTag {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each Tag.
    result.data.allStrapiTag.edges.forEach(({ node }) => {
      createPage({
        path: `/tags/${node.id}`,
        component: path.resolve(`src/templates/tag.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  // SINGLE TYPES
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
        component: path.resolve(`src/templates/subscribe.js`),
        context: {
          id: node.id,
        },
      })
    })
  })

  // Queries for articles and authors nodes to use in creating pages.
  return Promise.all([
    // getAuthors,
    getArticles, 
    getCategories,
    getIssues,
    getTags,
    getAbout,
    getSubscribe,
  ])
}


// // AWAIT / ASYNC

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage, createRedirect } = actions

//   const result = await graphql(`
//     query {
//       allStrapiUser {
//         edges {
//           node {
//             id
//             name
//           }
//         }
//       }
//       allStrapiArticle (sort: { fields: [created_at], order: DESC }) {
//         edges {
//           node {
//             id
//           }
//         }
//       }
//       allStrapiCategory {
//         edges {
//           node {
//             id
//             title
//           }
//         }
//       }
//       allStrapiIssue {
//         edges {
//           node {
//             id
//           }
//         }
//       }
//       allStrapiTag {
//         edges {
//           node {
//             id
//           }
//         }
//       }
//       allStrapiAbout {
//         edges {
//           node {
//             id
//           }
//         }
//       }
//       allStrapiSubscribe {
//         edges {
//           node {
//             id
//           }
//         }
//       }
//     }
//   `)

//   // const posts = result.data.allStrapiArticle.nodes
//   // const postsPerPage = 6
//   // const numPages = Math.ceil(posts.length / postsPerPage)
//   // Array.from({ length: numPages }).forEach((_, i) => {
//   //   createPage({
//   //     path: i === 0 ? `/archive` : `/archive/page/${i + 1}`,
//   //     component: path.resolve('./src/templates/blog-page.js'),
//   //     context: {
//   //       limit: postsPerPage,
//   //       skip: i * postsPerPage,
//   //       numPages,
//   //       currentPage: i + 1,
//   //     },
//   //   })
//   // })

//   // result.data.allStrapiUser.edges.forEach(({ node }) => {
//   //   createPage({
//   //     path: `/authors/${node.id}`,
//   //     component: path.resolve(`src/templates/author.js`),
//   //     context: {
//   //       id: node.id,
//   //     },
//   //   })
//   // })

//   result.data.allStrapiArticle.edges.forEach(({ node }) => {
//     createPage({
//       path: `/blog/${node.id}`,
//       component: path.resolve(`src/templates/article.js`),
//       context: {
//         id: node.id,
//       },
//     })
//   })

//   result.data.allStrapiCategory.edges.forEach(({ node }) => {
//     createPage({
//       // path: `/categories/${node.id}`,
//       path: `/categories/${node.title.split(" ").join("-")}`,
//       component: path.resolve(`src/templates/category.js`),
//       context: {
//         id: node.id,
//       },
//     })
//   })

//   result.data.allStrapiIssue.edges.forEach(({ node }) => {
//     createPage({
//       path: `/magazine/${node.id}`,
//       component: path.resolve(`src/templates/issue.js`),
//       context: {
//         id: node.id,
//       },
//     })
//   })

//   result.data.allStrapiTag.edges.forEach(({ node }) => {
//     createPage({
//       path: `/tags/${node.id}`,
//       component: path.resolve(`src/templates/tag.js`),
//       context: {
//         id: node.id,
//       },
//     })
//   })

//   result.data.allStrapiAbout.edges.forEach(({ node }) => {
//     createPage({
//       path: `/about/`,
//       component: path.resolve(`src/templates/about.js`),
//       context: {
//         id: node.id,
//       },
//     })
//   })

//   result.data.allStrapiSubscribe.edges.forEach(({ node }) => {
//     createPage({
//       path: `/subscribe/`,
//       component: path.resolve(`src/templates/subscribe.js`),
//       context: {
//         id: node.id,
//       },
//     })
//   }) 
// }