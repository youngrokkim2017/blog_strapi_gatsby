// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.com/docs/node-apis/
//  */

// // You can delete this file if you're not using it

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
  //    `
  //   {
  //     allStrapiAuthors {
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
  //   result.data.allStrapiAuthors.edges.forEach(({ node }) => {
  //     createPage({
  //       // path: `/authors/${node.id}`,
  //       path: `/authors/${node.name.split(" ").map((category) => category.toLowerCase()).join("-")}`,
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
        // path: `/blog/${article.node.id}`,
        // component: path.resolve(`./src/templates/blog-post.js`),
        path: `/blog/${article.node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: article.node.id,
          previous,
          next,
        }
      })
    })

    // PAGINATION
    const postsPerPage = 10;
    const numPages = Math.ceil(articles.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        // path: i === 0 ? `/` : `/${i + 1}`,
        // component: path.resolve('src/templates/blog-list.js'),
        path: i === 0 ? `/archive/1` : `/archive/${i + 1}`,
        component: path.resolve('src/pages/archive.js'),
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
            articles {
              id
              title
            }
          }
        }
      }
      allStrapiArticle (sort: { fields: [created_at], order: DESC }) {
        edges {
          node {
            id
            title
            categories {
              id
              title
            }
          }
        }
      }
    }
    `
  ).then(result => {
    // // Create pages for each Category.
    result.data.allStrapiCategory.edges.forEach(({ node }) => {
      createPage({
        // path: `/categories/${node.id}`,
        path: `/categories/${node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`,
        component: path.resolve(`src/templates/category.js`),
        context: {
          id: node.id,
        },
      })
    })

    // PAGINATION
    // const postsPerPage = 10;
    // const numPages = Math.ceil(result.allStrapiCategory.edges.node.articles.length / postsPerPage);

    // result.data.allStrapiCategory.edges.forEach(({ node }) => {
    //   const categoryArticles = result.data.allStrapiArticle.edges.filter(article => article.node.catetory.title.split(" ").join("-") == node.title.split(" ").join("-"))
    //   const postsPerPage = 10;
    //   const numPages = Math.ceil(categoryArticles.length / postsPerPage);

    //   // Array.from({ length: numPages }).map((_, i) => {
    //   Array.from({ length: numPages }).forEach((_, i) => {
    //     createPage({
    //       path: i === 0 ? `/categories/${node.title.split(" ").join("-")}/1` : `/categories/${node.title.split(" ").join("-")}/${i + 1}`,
    //       component: path.resolve(`src/templates/category.js`),
    //       context: {
    //         limit: postsPerPage,
    //         skip: i * postsPerPage,
    //         numPages,
    //         currentPage: i + 1,
    //       }
    //     })
    //   })
    // })
  })

  // MAGAZINE CONTENT TYPES
  const getIssues = makeRequest(
    graphql,
    `
    {
      allStrapiMagazineIssue {
        edges {
          node {
            id
            issue
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each Issue.
    result.data.allStrapiMagazineIssue.edges.forEach(({ node }) => {
      createPage({
        // path: `/magazine/${node.id}`,
        path: `/magazine/${node.issue.split(" ").map((category) => category.toLowerCase()).join("-")}}`,
        component: path.resolve(`src/templates/issue.js`),
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
    getAbout,
    getSubscribe,
  ])
}