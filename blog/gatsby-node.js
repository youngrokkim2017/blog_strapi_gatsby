// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.com/docs/node-apis/
//  */

// // You can delete this file if you're not using it

// const path = require(`path`);

// async function makeArticlesFromMdx({ graphql, actions }) {
//   // const { createPage } = actions;

//   // const articleTemplate = path.resolve('./src/templates/article.js');
//   const { errors, data } = await graphql(
//     `
//     {
//       allStrapiArticle (sort: { fields: [created_at], order: DESC }) {
//         edges {
//           node {
//             id
//           }
//         }
//       }
//     }
//     `
//   );

//   if (errors) {
//     throw new Error('There was an error');
//   }

//   const articles = data.allStrapiArticle.edges;
//   articles.forEach((article) => {
//     actions.createPage({
//       path: `/blog/${article.node.id}`,
//       component: path.resolve(`src/templates/article.js`),
//       context: {
//         id: article.node.id,
//       },
//     })
//   })
// }

// async function paginate({ graphql, actions, collection }) {
//   // const { createPage } = actions;
//   // const paginateTemplate = path.resolve('./src/pages/archive.js');
//   const { errors, data } = await graphql(
//     `
//     {
//       allStrapiArticle (
//         sort: { fields: [created_at], order: DESC }
//         filter: { fields: { collection: { eq: "${collection}" } } }
//         ) {
//         totalCount
//       }
//     }
//     `
//   );

//   console.log(data);
//   if (errors) {
//     throw new Error('There was an error');
//   }

//   const { totalCount } = data.allStrapiArticle;
//   const pages = Math.ceil(totalCount / 10);

//   Array.from({ length: pages }).forEach((_, i) => {
//     // for each page, use createPages api to dynamically create that page

//     actions.createPage({
//       path: `/archive/${i + 1}`,
//       component: path.resolve('./src/pages/archive.js'),
//       context: {
//         skip: i * 10,
//         currentPage: i + 1,
//       },
//     });
//   });
// }

// exports.createPages = async ({ graphql, actions }) => {
//   // const { createPage } = actions;

//   await Promise.all([
//     makeArticlesFromMdx({ graphql, actions }),
//     paginate({ graphql, actions, collection: 'article' }),
//   ])
// }

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   // if (node.internal.type === `MarkdownRemark`) {
//   if (node.internal.type === `Strapi`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       // name: `slug`,
//       id: node.id,
//       node,
//       value,
//     })
//   }
// }

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
            title
          }
        }
      }
    }
    `
  ).then(result => {
    // // Create pages for each article.
    // result.data.allStrapiArticle.edges.forEach(({ node }) => {
    //   createPage({
    //     path: `/blog/${node.id}`,
    //     component: path.resolve(`src/templates/article.js`),
    //     context: {
    //       id: node.id,
    //     },
    //   })
    // })

    if (result.errors) throw result.errors;

    const articles = result.data.allStrapiArticle.edges;
    articles.forEach((article, index) => {
      const previous = index === articles.length - 1 ? null : articles[index + 1].node;
      const next = index === 0 ? null : articles[index - 1].node;

      createPage({
        // path: article.node.id,
        // path: `/blog/${article.node.id}`,
        path: `/blog/${article.node.title.split(" ").join("-")}`,
        component: path.resolve(`src/templates/article.js`),
        // component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          id: article.node.id,
          previous,
          next,
        }
      })
    })

    const postsPerPage = 10;
    const numPages = Math.ceil(articles.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        // path: i === 0 ? `/archive/` : `/archive/${i + 1}`,
        path: i === 0 ? `/archive/1` : `/archive/${i + 1}`,
        // path: i === 0 ? `/` : `/${i + 1}`,
        // component: path.resolve('src/templates/blog-list.js'),
        component: path.resolve('src/pages/archive.js'),
        // component: path.resolve('src/templates/archive.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        }
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


// // // AWAIT / ASYNC

// // exports.createPages = async ({ graphql, actions }) => {
// //   const { createPage, createRedirect } = actions

// //   const result = await graphql(`
// //     query {
// //       allStrapiUser {
// //         edges {
// //           node {
// //             id
// //             name
// //           }
// //         }
// //       }
// //       allStrapiArticle (sort: { fields: [created_at], order: DESC }) {
// //         edges {
// //           node {
// //             id
// //           }
// //         }
// //       }
// //       allStrapiCategory {
// //         edges {
// //           node {
// //             id
// //             title
// //           }
// //         }
// //       }
// //       allStrapiIssue {
// //         edges {
// //           node {
// //             id
// //           }
// //         }
// //       }
// //       allStrapiTag {
// //         edges {
// //           node {
// //             id
// //           }
// //         }
// //       }
// //       allStrapiAbout {
// //         edges {
// //           node {
// //             id
// //           }
// //         }
// //       }
// //       allStrapiSubscribe {
// //         edges {
// //           node {
// //             id
// //           }
// //         }
// //       }
// //     }
// //   `)

// //   // const posts = result.data.allStrapiArticle.nodes
// //   // const postsPerPage = 6
// //   // const numPages = Math.ceil(posts.length / postsPerPage)
// //   // Array.from({ length: numPages }).forEach((_, i) => {
// //   //   createPage({
// //   //     path: i === 0 ? `/archive` : `/archive/page/${i + 1}`,
// //   //     component: path.resolve('./src/templates/blog-page.js'),
// //   //     context: {
// //   //       limit: postsPerPage,
// //   //       skip: i * postsPerPage,
// //   //       numPages,
// //   //       currentPage: i + 1,
// //   //     },
// //   //   })
// //   // })

// //   // result.data.allStrapiUser.edges.forEach(({ node }) => {
// //   //   createPage({
// //   //     path: `/authors/${node.id}`,
// //   //     component: path.resolve(`src/templates/author.js`),
// //   //     context: {
// //   //       id: node.id,
// //   //     },
// //   //   })
// //   // })

// //   result.data.allStrapiArticle.edges.forEach(({ node }) => {
// //     createPage({
// //       path: `/blog/${node.id}`,
// //       component: path.resolve(`src/templates/article.js`),
// //       context: {
// //         id: node.id,
// //       },
// //     })
// //   })

// //   result.data.allStrapiCategory.edges.forEach(({ node }) => {
// //     createPage({
// //       // path: `/categories/${node.id}`,
// //       path: `/categories/${node.title.split(" ").join("-")}`,
// //       component: path.resolve(`src/templates/category.js`),
// //       context: {
// //         id: node.id,
// //       },
// //     })
// //   })

// //   result.data.allStrapiIssue.edges.forEach(({ node }) => {
// //     createPage({
// //       path: `/magazine/${node.id}`,
// //       component: path.resolve(`src/templates/issue.js`),
// //       context: {
// //         id: node.id,
// //       },
// //     })
// //   })

// //   result.data.allStrapiTag.edges.forEach(({ node }) => {
// //     createPage({
// //       path: `/tags/${node.id}`,
// //       component: path.resolve(`src/templates/tag.js`),
// //       context: {
// //         id: node.id,
// //       },
// //     })
// //   })

// //   result.data.allStrapiAbout.edges.forEach(({ node }) => {
// //     createPage({
// //       path: `/about/`,
// //       component: path.resolve(`src/templates/about.js`),
// //       context: {
// //         id: node.id,
// //       },
// //     })
// //   })

// //   result.data.allStrapiSubscribe.edges.forEach(({ node }) => {
// //     createPage({
// //       path: `/subscribe/`,
// //       component: path.resolve(`src/templates/subscribe.js`),
// //       context: {
// //         id: node.id,
// //       },
// //     })
// //   }) 
// // }