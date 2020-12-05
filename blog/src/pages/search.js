// import React from "react"
import React, { useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';
import Layout from "../components/layout"
import SEO from "../components/seo"
import Reactmarkdown from "react-markdown"
// import { globalHistory } from "@reach/router"

import Fuse from "fuse.js"  // fuzzy search
const FlexSearch = require("flexsearch");

const SearchPage = ({ data, location }) => {
// const BlogPage = ({ data, navigate, location }) => {
  // const unsortedData = data.allStrapiArticle.edges;
  // const sortedData = unsortedData.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]).slice(0, 5);
  // console.log(unsortedData, sortedData)
  // console.log(data.allStrapiArticle.edges)

  ///////////////////////////// FLEXSEARCH ///////////////////////////////////
  let flexIndex = new FlexSearch({
    // // SPEED-OPTIMIZED PROFILE
    // encode: "icase",
    // tokenize: "strict",
    // threshold: 1,
    // resolution: 3,
    // depth: 2,
    //
    // // MEMORY-OPTIMIZED PROFILE
    // encode: "extra",
    // // tokenize: "forward",
    // tokenize: "strict",
    // threshold: 0,
    // resolution: 1,
    //
    // ABSOLUTE FASTEST PROFILE
    // tokenize: "forward",
    tokenize: "strict",
    encode: "icase",
    threshold: 8,
    resolution: 9,
    depth: 1,
    doc: {
      id: "id",
      field: [
        "title",
        "content",
        "author",
      ]
    }
  });

  flexIndex.add(data.allStrapiArticle.edges.map(e => e.node));

  // searchResults() {
  //   if (this.index === null || this.searchTerm.length < 3) return [];
  //   return this.index.search({
  //     query: this.searchTerm,
  //     limit: 10
  //   });
  // }

  const flexQuery = (location.state === null || !location.state) ? "" : location.state.searchQuery;

  // const flexResults = (flexIndex === null || location.state === null || !location.state || location.state.searchQuery < 3) ? data.allStrapiArticle.edges : flexIndex.search({
  // const flexResults = flexIndex.search({
  //     // query: flexQuery,
  //     query: location.state.searchQuery,
  //     limit: 5,
  //   });
  const flexResults = flexIndex.search(flexQuery)
  
  const flexData = !flexResults ? data.allStrapiArticle.edges : flexResults;

    console.log(flexIndex);
    console.log(flexResults);
    console.log(data.allStrapiArticle.edges)

  ///////////////////////////// FLEXSEARCH ///////////////////////////////////

  ///////////////////////////// FUSE SEARCH ///////////////////////////////////
  const unsortedData = data.allStrapiArticle.edges;
  let index = (location.state === null || !location.state) ? "" : location.state.searchQuery;

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
  // let results;
  const searchResults = results.length > 0 ? results.map(result => result.item) : unsortedData;
  // let searchResults;

  // const searchQueryRef = useRef(null);
  // const resultsRef = useRef(null);
  // const fuseRef = useRef(null);
  // // const locationStateRef = useRef(null);

  // const fuseSearchResults = useEffect(() => {
  //   const getSearchIndex = () => {
  //     fuseRef.current = fuse.search(location.state.searchQuery);
  //     // locationStateRef = location.state;

  //     if (location.state === null || !location.state) {
  //       // searchResults = unsortedData;
  //       searchQueryRef.current = unsortedData;
  //     } else {
  //       // results = fuse.search(location.state.searchQuery);
  //       // resultsRef.current = fuse.search(location.state.searchQuery);
  //       resultsRef.current = fuseRef;
  //       // if (!results.length) {
  //       if (!resultsRef.length) {
  //         // searchResults = unsortedData;
  //         return searchQueryRef.current = unsortedData;
  //       } else {
  //         // searchResults = results.map(result => result.item)
  //         return searchQueryRef.current = resultsRef.map(result => result.item)
  //       }
  //     }
  //   }

  //   getSearchIndex();
  // }, [fuse, location.state, unsortedData]);

  // function getSearchIndex() {
  //   if (location.state === null || !location.state) {
  //     searchResults = unsortedData;
  //   } else {
  //     results = fuse.search(location.state.searchQuery);
  //     if (!results.length) {
  //       searchResults = unsortedData;
  //     } else {
  //       searchResults = results.map(result => result.item)
  //     }
  //   }
  // }
  ///////////////////////////// FUSE SEARCH ///////////////////////////////////

  return (
  <Layout location={location}>
    <SEO title="Blog index page" />

    <ul>
      {/* {data.allStrapiArticle.edges.sort((a, b) => b.id - a.id).slice(0, 5).map(document => ( */}
      {/* {sortedData.map(document => ( */}
      {/* {data.allStrapiArticle.edges.map(document => ( */}
      {/* {searchResults.map(document => ( */}
      {/* {searchQueryRef.current.map(document => ( */}
      {flexData.map(document => (
        // <li key={document.node.id}>
        <li key={document.id}>
          <h2>
            {/* <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}> */}
            <Link to={`/blog/${document.id}`} style={{ textDecoration: `none` }}>
              {/* {document.node.title} */}
              {document.title}
            </Link>
          </h2>
          {/* <h4>By{" "}{document.node.author}</h4> */}
          <h4>By{" "}{document.author}</h4>
          {
            // document.node.image
            document.image
            ?
            // <Img fixed={document.node.image.childImageSharp.fixed} />
            <Img fixed={document.image.childImageSharp.fixed} />
            :
            ""
          }
          <Reactmarkdown
            // source={`${document.node.content.slice(0,500)}...`}
            source={`${document.content.slice(0,500)}...`}
            transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
          />
        </li>
      ))}
    </ul>
  </Layout>
  )
}


export default SearchPage;

// gql query
export const fuseQuery = graphql`
  query FuseQuery {
    allStrapiArticle(
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

// export const fuseQuery = graphql`
//   query FuseQuery {
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