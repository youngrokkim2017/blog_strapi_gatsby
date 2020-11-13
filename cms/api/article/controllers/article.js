// 'use strict';

// /**
//  * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
//  * to customize this controller
//  */

// module.exports = {
//     // update article record
//     // https://youtu.be/ITk-pYtOCnQ?t=297

//     // async update(ctx) {}

    
// };

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query);
    } else {
      entities = await strapi.services.article.find(ctx.query);
    }

    // entities = entities.sort((a, b) => b.id - a.id);

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.article }));
  },
};