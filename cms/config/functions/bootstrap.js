'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = () => {
    // var test = require('fs').readFileSync('./export.js', 'utf8');
    // var test = JSON.parse(test);
    // // console.log(test[test.length-1]);

    // test.forEach(post => {
    //     strapi.services.article.create({
    //         title: post.title,
    //         content: post.markdown,
    //         author: post.author,
    //         image: post.featured_image
    //     });
    // });
};

// async create(data, { files } = {}) {
//     const entry = await strapi.query('restaurant').create(data);

//     if (files) {
//       // automatically uploads the files based on the entry and the model
//       await strapi.entityService.uploadFiles(entry, files, {
//         model: 'restaurant',
//         // if you are using a plugin's model you will have to add the `plugin` key (plugin: 'users-permissions')
//       });
//       return this.findOne({ id: entry.id });
//     }

//     return entry;
// }

// async update(params, data, { files } = {}) {
//     const entry = await strapi.query('restaurant').update(params, data);

//     if (files) {
//       // automatically uploads the files based on the entry and the model
//       await strapi.entityService.uploadFiles(entry, files, {
//         model: 'restaurant',
//         // if you are using a plugin's model you will have to add the `plugin` key (plugin: 'users-permissions')
//       });
//       return this.findOne({ id: entry.id });
//     }

//     return entry;
//   }