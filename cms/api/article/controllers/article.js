'use strict';

// /**
//  * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
//  * to customize this controller
//  */

// module.exports = {
//     // update article record
//     // https://youtu.be/ITk-pYtOCnQ?t=297

//     // async update(ctx) {}

    
// };

// // // // CUSTOM API FOR FILTERING BASED ON PUBLISHED
// // // const { sanitizeEntity } = require('strapi-utils');

// // // module.exports = {
// // //   async find(ctx) {
// // //     let entities;

// // //     // const filters = ctx.query;
// // //     // filters.published = true;

// // //     if (ctx.query._q) {
// // //       entities = await strapi.services.article.search(ctx.query);
// // //     //   entities = await strapi.services.article.search(filters);
// // //     } else {
// // //       entities = await strapi.services.article.find(ctx.query);
// // //     //   entities = await strapi.services.article.find(filters);
// // //     }

// // //     // entities = entities.sort((a, b) => b.id - a.id);

// // //     return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.article }));
// // //   },
// // // };

// // // // CUSTOM API FOR POST COMMENTS
// // // const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

// // // module.exports = {
// // //   async comment(ctx) {
// // //     let entity;
// // //     if (ctx.is('multipart')) {
// // //       const { data, files } = parseMultipartData(ctx);
// // //       entity = await strapi.services.comment.create(data, { files });
// // //     } else {
// // //         ctx.request.body.article = ctx.params.id;

// // //       entity = await strapi.services.comment.create(ctx.request.body);
// // //     }
// // //     return sanitizeEntity(entity, { model: strapi.models.comment });
// // //   },
// // // };

// // // // in /api/article/config/routes.jsoin
// // // // // {
// // //          "method": "POST",
// // //          "path": "/articles/:id/comment",
// // //          "handler": "article.comment",
// // //          "config": {
// // //              "policies": []
// // //          }
// // //       }

// const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
// // const axios = require('axios');

// module.exports = {
//   async update(ctx) {
//     const { id } = ctx.params;

//     // const { data } = await axios.get('https://www.berkeleysciencereview.com/wp-json/wp/v2/posts?per_page=4');
//     const temp = require('fs').readFileSync('../../../image-urls', 'utf8');
//     // const { data } = JSON.parse(temp);
//     // const { data } = parseMultipartData(JSON.parse(temp));
//     const { data, files } = parseMultipartData(JSON.parse(temp));
//     const posts = await Promise.all(data.map(post => new Promise(async (resolve, reject) => {
//     //   const { title: { rendered: titleRendered }, slug, content: { rendered: contentRendered }, date, featured_image } = post;
//       const { featured_image } = post;
//       try {
//         const downloaded = await strapi.config.functions.download(featured_image);
//         const [{ id: fileId }] = await strapi.config.functions.upload(downloaded);
        
//         const postData = {
//         //   title: titleRendered,
//         //   content: contentRendered,
//         //   slug,
//           image: [fileId],
//         //   createdAt: date
//         };
//         // const created = await strapi.services.post.create(postData);
//         let updated = await strapi.services.post.update({ id }, data, { files });
//         resolve(updated)
//       } catch(err) {
//         reject(err)
//       }
//     })));
    
//     // ctx.send(posts);
//     ctx.send(posts, { model: strapi.models.articles });
//   }
// };

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.restaurant.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.restaurant.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.restaurant });
  },
};