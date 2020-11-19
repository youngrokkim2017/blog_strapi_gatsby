'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    // update article record
    // https://youtu.be/ITk-pYtOCnQ?t=297

    // async update(ctx) {}

    
};

// // CUSTOM API FOR FILTERING BASED ON PUBLISHED
// const { sanitizeEntity } = require('strapi-utils');

// module.exports = {
//   async find(ctx) {
//     let entities;

//     // const filters = ctx.query;
//     // filters.published = true;

//     if (ctx.query._q) {
//       entities = await strapi.services.article.search(ctx.query);
//     //   entities = await strapi.services.article.search(filters);
//     } else {
//       entities = await strapi.services.article.find(ctx.query);
//     //   entities = await strapi.services.article.find(filters);
//     }

//     // entities = entities.sort((a, b) => b.id - a.id);

//     return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.article }));
//   },
// };

// // CUSTOM API FOR POST COMMENTS
// const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

// module.exports = {
//   async comment(ctx) {
//     let entity;
//     if (ctx.is('multipart')) {
//       const { data, files } = parseMultipartData(ctx);
//       entity = await strapi.services.comment.create(data, { files });
//     } else {
//         ctx.request.body.article = ctx.params.id;

//       entity = await strapi.services.comment.create(ctx.request.body);
//     }
//     return sanitizeEntity(entity, { model: strapi.models.comment });
//   },
// };