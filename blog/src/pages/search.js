import React from "react"
// import React, { useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';
// import Layout from "../components/layout"
// import SEO from "../components/seo"
import ReactMarkdown from "react-markdown"
import logo from "../images/logo.png"
// import { globalHistory } from "@reach/router"

import Fuse from "fuse.js"  // fuzzy search
// const FlexSearch = require("flexsearch");

const SearchPage = ({ data, location }) => {
  const unsortedData = data.allStrapiArticle.edges;
  // const sortedData = unsortedData.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]).slice(0, 5);
  // const sortedData = data.allStrapiArticle.edges.sort((a, b) => b.id - a.id).slice(0, 5);

  ///////////////////////////// FLEXSEARCH ///////////////////////////////////
  // let flexIndex = new FlexSearch({
  //   // // SPEED-OPTIMIZED PROFILE
  //   // encode: "icase",
  //   // tokenize: "strict",
  //   // threshold: 1,
  //   // resolution: 3,
  //   // depth: 2,
  //   //
  //   // // MEMORY-OPTIMIZED PROFILE
  //   // tokenize: "forward",
  //   tokenize: "strict",
  //   encode: "extra",
  //   threshold: 0,
  //   resolution: 1,
  //   //
  //   // // ABSOLUTE FASTEST PROFILE
  //   // // tokenize: "forward",
  //   // tokenize: "strict",
  //   // encode: "icase",
  //   // threshold: 8,
  //   // resolution: 9,
  //   // depth: 1,
  //   doc: {
  //     id: "id",
  //     field: [
  //       "title",
  //       "content",
  //       "author",
  //     ]
  //   }
  // });

  // flexIndex.add(data.allStrapiArticle.edges.map(e => e.node));
  // const flexQuery = (location.state === null || !location.state) ? "" : location.state.searchQuery;
  // const flexResults = flexQuery === "" ? data.allStrapiArticle.edges : flexIndex.search(flexQuery);
  // const flexData = !flexResults ? data.allStrapiArticle.edges : flexResults;

  // console.log(flexIndex);
  // console.log(flexIndex.l);
  // console.log(flexResults);
  // console.log(data.allStrapiArticle.edges)

  ///////////////////////////// FLEXSEARCH ///////////////////////////////////

  ///////////////////////////// FUSE SEARCH ///////////////////////////////////
  // const unsortedData = data.allStrapiArticle.edges;
  let index = (location.state === null || !location.state) ? "" : location.state.searchQuery;

  const options = {
      // keys: [
      //     'node.title',
      //     'node.author',
      //     'node.content',
      // ],
      keys: [
        {
            name: 'node.title',
            weight: 0.6,
        },
        {
            name: 'node.author',
            weight: 0.1,
        },
        {
            name: 'node.content',
            weight: 0.3,
        },
      ],
      includeScore: true,
      // shouldSort: true,
  };
  const fuse = new Fuse(unsortedData, options);
  const results = fuse.search(index, { limit: 10 });
  const searchResults = results.length > 0 ? results.map(result => result.item) : unsortedData.slice(0, 5);
  ///////////////////////////// FUSE SEARCH ///////////////////////////////////

  // return (
  //   <Layout location={location}>
  //     <SEO title="Blog index page" />
  //       {
  //         flexQuery === "" ?
  //         <ul>
  //           {data.allStrapiArticle.edges.slice(0, 5).map(document => (
  //             <li key={document.node.id}>
  //               <h2>
  //                 <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}>
  //                   {document.node.title}
  //                 </Link>
  //               </h2>
  //               <h4>By{" "}{document.node.author}</h4>
  //               {
  //                 document.node.image
  //                 ?
  //                 <Img fixed={document.node.image.childImageSharp.fixed} />
  //                 :
  //                 ""
  //               }
  //               <ReactMarkdown
  //                 source={`${document.node.content.slice(0,500)}...`}
  //                 transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
  //               />
  //             </li>
  //           ))}
  //         </ul>
  //         // : flexIndex.l.length === 0 ?
  //         // <div>The article you have searched for does not exist</div>
  //         :
  //         <ul>
  //           {data.allStrapiArticle.edges.slice(0, 5).map(document => (
  //             <li key={document.id}>
  //               <h2>
  //                 <Link to={`/blog/${document.id}`} style={{ textDecoration: `none` }}>
  //                   {document.title}
  //                 </Link>
  //               </h2>
  //               <h4>By{" "}{document.author}</h4>
  //               {
  //                 document.image
  //                 ?
  //                 <Img fixed={document.image.childImageSharp.fixed} />
  //                 :
  //                 ""
  //               }
  //               <ReactMarkdown
  //                 source={`${document.content.slice(0,500)}...`}
  //                 transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
  //               />
  //             </li>
  //           ))}
  //         </ul>
  //       }
  //   </Layout>
  // )

  return (
  // <Layout location={location}>
  // <SEO title="Blog index page" />
  <div>
    <nav className="p-4 text-black mb-12 border-b" style={{ borderBottomColor: '#888888' }}>
      <div className="flex container mx-auto items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link to="/" className="font-semibold text-2xl tracking-tight">
            <img src={logo} alt="Logo" className="h-10 sm:h-8" />
          </Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-md lg:flex-grow">
            <Link to="/blog/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              Blog
          </Link>
            <Link to="/magazine/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              Magazine
          </Link>
            <Link to="/about/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              About Us
          </Link>
            <Link to="/subscribe/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
              Subscribe
          </Link>
          </div>
        </div>
      </div>
    </nav>
    <ul>
      {/* {data.allStrapiArticle.edges.map(document => ( */}
      {/* {flexData.map(document => ( */}
      {searchResults.map(document => (
        <li key={document.node.id}>
        {/* <li key={document.id}> */}
          <h2>
            <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}>
            {/* <Link to={`/blog/${document.id}`} style={{ textDecoration: `none` }}> */}
              {document.node.title}
              {/* {document.title} */}
            </Link>
          </h2>
          <h4>By{" "}{document.node.author}</h4>
          {/* <h4>By{" "}{document.author}</h4> */}
          {
            document.node.image
            // document.image
            ?
            <Img fixed={document.node.image.childImageSharp.fixed} />
            // <Img fixed={document.image.childImageSharp.fixed} />
            :
            ""
          }
          <ReactMarkdown
            source={`${document.node.content.slice(0,500)}...`}
            // source={`${document.content.slice(0,500)}...`}
            transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
          />
        </li>
      ))}
    </ul>
  </div>
  // </Layout>
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