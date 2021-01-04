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

module.exports = () => {
    var data = require('fs').readFileSync('bsr-json-regex/export-2021-01-02.js', 'utf8');
    var data = JSON.parse(data);

    async function create(data, files = {}) {
        if (data.primary_category === null && data.secondary_category === null){
            var categories = []
        }
        else if (data.primary_category !== null && data.secondary_category === null) {
            var primary_category = await strapi.query('category').findOne({ title: data.primary_category });
            var categories = [primary_category.id]
        }
        else if (data.primary_category !== null && data.secondary_category !== null){
            var primary_category = await strapi.query('category').findOne({ title: data.primary_category });
            var secondary_category = await strapi.query('category').findOne({ title: data.secondary_category });
            var categories = [primary_category.id, secondary_category.id]
        }
        
        if (data.author === null){
            var author = null
        }
        else {
            var author = await strapi.query('authors').findOne({ name: data.author });
        }

        if (data.magazine === null){
            var magazine = null
        }
        else {
            var magazine = await strapi.query('magazine-issues').findOne({ title: data.issue });
        }

        // var entry = await strapi.query('article').create({
        //     title: data.title,
        //     published_at: data.created_at,
        //     author: (author) ? author.id : null,
        //     categories: categories,
        //     magazine: (magazine) ? magazine.id : null,
        //     content: data.markdown
        // });

        // if (files) {
        //     await strapi.entityService.uploadFiles(entry, files, {
        //         model: strapi.models.article.modelName
        //     });
        //     return this.findOne({ id: entry.id });
        // }
        // // console.log(categories, author.id, magazine.id)
        // return entry;
    };

    var i = 0;
    data.forEach(post => {
        i += 1;
        try {
            var image_name = path.parse(post.featured_image).base;
            var path_to_img = 'bsr-json-regex/images/'+image_name;
            var fileStat = require('fs').statSync(path_to_img);

            var files = {
                image: {
                    path: path_to_img,
                    name: path.parse(path_to_img).base,
                    type: mime.getType(path_to_img),
                    size: fileStat.size,
                }
            };

            // create(post, files);
        }
        catch (error) {
            // console.error(error);
            // create(post);
        }
        // strapi.query('article').findOne({ id: 22 }).then(val=>{console.log(val)});
        
    });
    console.log(i+'posts for import');


//     var authors = require('fs').readFileSync('bsr-json-regex/authors.js', 'utf8');
//     var authors = JSON.parse(authors);

//     authors.forEach(author => {
//         strapi.query('authors').create({
//          name: author.name
//         })

//     });
};