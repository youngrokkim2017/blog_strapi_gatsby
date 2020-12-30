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

// module.exports = async () => {
module.exports = () => {
    // var test = require('fs').readFileSync('./bsr-json-regex/export-2020-12-26.js', 'utf8');
    // var test = JSON.parse(test);
    // // console.log(test[test.length-1]);

    // test.forEach(post => {
    //     // await strapi.services.article.create({
    //     strapi.services.article.create({
    //         // wp_id: post.id || "",
    //         title: post.title || "",
    //         author: post.author || "",
    //         magazine: post.issue || "",
    //         imageURL: `![](${post.featured_image})` || "",
    //         content: post.markdown || "",
    //         categories: (post.primary_category !== null && post.secondary_category !== null) ? [post.primary_category, post.secondary_category]
    //             : (post.primary_category !== null && post.secondary_category === null) ? [post.primary_category]
    //             : [],
    //         // categories: [post.primary_category, post.secondary_category],
    //         Created_at: post.created_at,
    //         // wp_created_at: post.created_at,
    //     });
    // });

    //

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

    // var test = require('fs').readFileSync('./image-urls.json', 'utf8');
    // var test = JSON.parse(test);
    // // console.log(test[test.length-1]);

    // test.forEach(post => {
    //     const downloaded = strapi.config.functions.download(post.featured_image);
    //     const [{ id: fileId }] = strapi.config.functions.upload(downloaded);

    //     strapi.services.testimage.create({
    //         // title: post.title,
    //         // content: post.markdown,
    //         // author: post.author,
    //         // imageURL: post.featured_image || "",
    //         image: fileId,
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