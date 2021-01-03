'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {};

// module.exports = {
//   async find(params, populate) {
//     let articles = await strapi.query("article").find(params, populate);
//     // let author = await strapi.query("author").findOne({ id: authorId }, populate);
//     let author = await strapi.query("authors").findOne({ id: authorId }, populate);
//     articles.author = author
//     return articles;
//   },
// };