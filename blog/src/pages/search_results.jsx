// import React from "react"
// // import React, { useState } from "react"
// import { Link, graphql } from "gatsby"
// import Img from 'gatsby-image';
// import Layout from "../components/layout"
// import Reactmarkdown from "react-markdown"
// import SEO from "../components/seo"
// import Fuse from "fuse.js"  // fuzzy search

// const SearchResults = ({ data }) => {
//     // const [query, setQuery] = useState('');

//     const { query } = this.props;

//     const unsortedData = data.allStrapiArticle.edges;
//     const sortedData = unsortedData.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]);

//     const options = {
//         keys: [
//             'node.category.title',
//         ],
//         includeScore: true,
//     };

//     const fuse = new Fuse(unsortedData, options);
//     const results = fuse.search(query);
//     const searchedResults = query.length > 3 ? results.map(result => result.item) : sortedData.slice(0, 5);

//     return (
//         <Layout>
//         <SEO title="Search index page" />

//         <ul>
//             {searchedResults.map(document => (
//                 <li key={document.node.id}>
//                     <h2>
//                         <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}>
//                             {document.node.title}
//                         </Link>
//                     </h2>
//                     <h4>By{" "}{document.node.author}</h4>
//                 {
//                     document.node.image
//                     ?
//                     <Img fixed={document.node.image.childImageSharp.fixed} />
//                     :
//                     ""
//                 }
//                 <Reactmarkdown
//                     // source={document.node.content}
//                     source={`${document.node.content.slice(0,500)}...`}
//                     transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
//                 />
//                 </li>
//             ))}
//         </ul>
//         </Layout>
//     )
// }

// export default SearchResults;

// export const searchQuery = graphql`
//   query SearchQuery {
//     allStrapiArticle(
//       limit: 5
//       sort: { order: DESC, fields: published_at }
//     ) {
//       edges {
//         node {
//           id
//           image {
//             childImageSharp {
//               fixed(width: 200, height: 125) {
//                 ...GatsbyImageSharpFixed
//               }
//             }
//           }
//           title
//           author
//           content
//           category {
//             id
//             title
//           }
//           published_at
//           updated_at
//         }
//       }
//     }
//   }
// `