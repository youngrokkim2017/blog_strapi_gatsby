import React from 'react';
import { Link } from 'gatsby';

const RelatedArticles = ({ articles }) => (
    <div>
        <h2>Related Articles</h2>
        <div>
            {articles.map(({ node }) => (
                <div key={node.id}>
                    <Link to={`/blog/${node.permalink}`}>{node.title}</Link>
                </div>
            ))}
        </div>
    </div>
);

export default RelatedArticles;