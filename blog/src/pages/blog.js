import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';
import Layout from "../components/layout"
import SEO from "../components/seo"
import Reactmarkdown from "react-markdown"
// import { globalHistory } from "@reach/router"

import Fuse from "fuse.js"  // fuzzy search
// const FlexSearch = require("flexsearch");

const BlogPage = ({ data, location }) => {
// const BlogPage = ({ data, navigate, location }) => {
  // const unsortedData = data.allStrapiArticle.edges;
  // const sortedData = unsortedData.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]).slice(0, 5);
  // console.log(unsortedData, sortedData)
  // console.log(data.allStrapiArticle.edges)

  // let index = new FlexSearch();
  
  // index.search(searchQuery, function(result){
    //   // array of results
    
    // });
    
  // let searchQuery = location.state.searchQuery;
  // console.log(location.state.searchQuery);
  // console.log(window.__FLEXSEARCH__.en.store);
  // console.log(window.__FLEXSEARCH__.en.index);

  const unsortedData = data.allStrapiArticle.edges;
    // const sortedData = unsortedData.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]);
  let index = location.state.searchQuery === null || !location.state.searchQuery ? "" : location.state.searchQuery;

  const options = {
      keys: [
          'node.title',
          'node.author',
          'node.content',
      ],
      includeScore: true,
  };
  const fuse = new Fuse(unsortedData, options);
  const results = fuse.search(index);
  // const searchResults = results.length > 0 ? results.map(result => result.item) : sortedData.slice(0, 5);
  const searchResults = results.length > 0 ? results.map(result => result.item) : unsortedData;
  location.state.searchQuery = "";
  // console.log(results);
  // console.log(location);
  // console.log(globalHistory)

  return (
  <Layout location={location}>
    <SEO title="Blog index page" />

    <ul>
      {/* {data.allStrapiArticle.edges.sort((a, b) => b.id - a.id).slice(0, 5).map(document => ( */}
      {/* {sortedData.map(document => ( */}
      {/* {data.allStrapiArticle.edges.map(document => ( */}
      {searchResults.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}>
              {document.node.title}
            </Link>
          </h2>
          <h4>By{" "}{document.node.author}</h4>
          {
            document.node.image
            ?
            <Img fixed={document.node.image.childImageSharp.fixed} />
            :
            ""
          }
          <Reactmarkdown
            source={`${document.node.content.slice(0,500)}...`}
            transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
          />
        </li>
      ))}
    </ul>
  </Layout>
  )
}


export default BlogPage;

// gql query
export const blogQuery = graphql`
  query BlogQuery {
    allStrapiArticle(
      limit: 5
      sort: { order: DESC, fields: published_at }
    ) {
      edges {
        node {
          id
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          title
          author
          content
          category {
            id
            title
          }
          published_at
          updated_at
        }
      }
    }
  }
`

// export const blogQuery = graphql`
//   query BlogQuery {
//     allStrapiArticle(
//       limit: 5
//       sort: { order: DESC, fields: id }
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
//         }
//       }
//     }
//   }
// `