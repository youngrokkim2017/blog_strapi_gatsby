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
    const jsonData = require('fs').readFileSync('./export.js');
    const importData = JSON.parse(jsonData);

    importData.forEach((entry) => {
        strapi.services.article.create({
            title: entry.title,
            content: entry.markdown,
            author: entry.author,
            image: entry.featured_image,
        });
    });
};
