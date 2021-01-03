'use strict';

const path = require('path');
const mime = require('mime');

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
    var data = require('fs').readFileSync('bsr-json-regex/export-2020-12-26-copy.js', 'utf8');
    var data = JSON.parse(data);
    // var _ = '';


    // function find_category(name) {
    //     var value = strapi.query('category').findOne({ title: name });
    //     return value.id
    // }

    async function create(data, files = {}) {
        // const primary_category = await strapi.query('category').findOne({ title: data.primary_category });
        // const secondary_category = await strapi.query('category').findOne({ title: data.secondary_category });
        // const author = await strapi.query('author').findOne({ name: data.author });
        // const magazine = await strapi.query('magazine').findOne({ issue: data.issue });

        const entry = await strapi.query('article').create({
            title: data.title,
            author: data.author,
            // categories: [primary_category.id, secondary_category.id],
            // magazine: magazine.id,
            content: data.markdown
        });

        if (files) {
            await strapi.entityService.uploadFiles(entry, files, {
                model: strapi.models.article.modelName
            });
            return this.findOne({ id: entry.id });
        }
        return entry;
    };

    data.forEach(post => {
        // var image_name = path.parse(post.featured_image).base;
        // console.log(image_name);

        const path_to_img = 'bsr-json-regex/dog.png';
        const fileStat = require('fs').statSync(path_to_img);

        const files = {
            image: {
                path: path_to_img,
                name: path.parse(path_to_img).base,
                type: mime.getType(path_to_img),
                size: fileStat.size,
            }
        };
        create(post, files);

    });

};