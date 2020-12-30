import React, { useState } from "react"
// import React, { useState, lazy, Suspense } from "react"
// import React, { useState, useRef } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from 'gatsby-image';
import ReactMarkdown from "react-markdown"
// import logo from "../images/logo.png"
import Fuse from "fuse.js"  // fuzzy search
import Highlight from 'react-highlighter'
// import MailchimpComponent from '../components/mailchimp'
import SearchHeader from '../components/searchHeader'
import SearchFooter from '../components/searchFooter'
// import SearchContainer from '../components/searchContainer'
// const SearchComponent = lazy(() => import('../components/searchContainer'));

const SearchPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query SearchResultsQuery {
      allStrapiArticle(
        sort: { fields: [created_at], order: DESC }
      ) {
        edges {
          node {
            id
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title
            content
            categories {
              id
              title
            }
            published_at
            updated_at
          }
        }
      }
      allStrapiCategory {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `)

  // const data = useStaticQuery(graphql`
  //   query SearchResultsQuery {
  //     allStrapiArticle(
  //       sort: { fields: [created_at], order: DESC }
  //     ) {
  //       edges {
  //         node {
  //           id
  //           image {
  //             childImageSharp {
  //               fixed(width: 200, height: 125) {
  //                 ...GatsbyImageSharpFixed
  //               }
  //               fluid(maxWidth: 1000) {
  //                 ...GatsbyImageSharpFluid
  //               }
  //             }
  //           }
  //           title
  //           author
  //           content
  //           categories {
  //             id
  //             title
  //           }
  //           published_at
  //           updated_at
  //         }
  //       }
  //     }
  //     allStrapiCategory {
  //       edges {
  //         node {
  //           id
  //           title
  //         }
  //       }
  //     }
  //   }
  // `)

  const [query, setQuery] = useState('');
  // const [query, setQuery] = useState(location.state.searchQuery);
  // const [input, setInput] = useState('');

  // const unsortedData = data.allStrapiArticle.edges;
  // const sortedData = unsortedData.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]).slice(0, 5);
  // const sortedData = data.allStrapiArticle.edges.sort((a, b) => b.id - a.id).slice(0, 5);

  ///////////////////////////// FUSE SEARCH ///////////////////////////////////
  // const unsortedData = data.allStrapiArticle.edges;
  let index = (location.state === null || !location.state) ? "" : location.state.searchQuery;

  const options = {
      // keys: [
      //     'node.title',
      //     'node.author.name',
      //     'node.content',
      // ],
      keys: [
        {
            name: 'node.title',
            weight: 0.6,
        },
        {
            // name: 'node.author',
            name: 'node.author.name',
            weight: 0.1,
        },
        {
            name: 'node.content',
            weight: 0.3,
        },
      ],
      includeScore: true,
      shouldSort: true,
      threshold: 0.3,  // default 0.6
  };
  // const fuse = new Fuse(unsortedData, options);
  const fuse = new Fuse(data.allStrapiArticle.edges, options);
  const results = fuse.search(index, { limit: 10 });
  // const searchResults = results.length > 0 ? results.map(result => result.item) : unsortedData.slice(0, 5);
  const searchResults = results.length > 0 ? results.map(result => result.item) : data.allStrapiArticle.edges.slice(0, 5);

  // search query results while on route '/search'
  const currentResults = fuse.search(query, { limit: 10 });
  // const currentSearchResults = query.length > 3 ? currentResults.map(result => result.item) : unsortedData.slice(0, 5);
  const currentSearchResults = query.length > 2 ? currentResults.reverse().map(result => result.item) : data.allStrapiArticle.edges.slice(0, 5);

  // console.log(currentResults, location.state.searchQuery, query)

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);

    // const { value } = currentTarget;
    // setInput(value);
  }

  // function handleSubmit(e, { currentTarget = {} }) {
  //   e.preventDefault();

  //   const { value } = currentTarget;
  //   setQuery(value);
  // }

  ///////////////////////////// FUSE SEARCH ///////////////////////////////////

  return (
  <div>
    <SearchHeader categories={data.allStrapiCategory.edges} />
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      {/* <form> */}
        <input 
          type="text" 
          placeholder="Search" 
          value={query} 
          // value={input} 
          onChange={handleOnSearch} 
        />
        {/* <button tpe="submit">SEARCH</button> */}
      {/* </form> */}
    </div>
    {/* <SearchContainer query={query} articles={data.allStrapiArticle.edges} location={location} dangerouslySetInnerHTML={createMarkup()}/> */}
    {/* <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchComponent query={query} articles={data.allStrapiArticle.edges} location={location} />
      </Suspense>
    </div> */}
    { query.length > 2 ?
    <div>
      <ul>
        {currentSearchResults.map(document => (
          <li key={document.node.id}>
            <h2>
              <Link to={`/blog/${document.node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}>
                <Highlight search={query}>{document.node.title}</Highlight>
              </Link>
            </h2>
            {/* <h4><Highlight search={query}>By{" "}{document.node.author}</Highlight></h4> */}
            {/* <h4><Highlight search={query}>By{" "}{document.node.author.name}</Highlight></h4> */}
            {document.node.image ?
              // <Img fixed={document.node.image.childImageSharp.fixed} />
              <Img fluid={document.node.image.childImageSharp.fluid} />
            :
              ""
            }
            <Highlight search={query}>
              <ReactMarkdown
                source={`${document.node.content.slice(0,500)}...`}
                transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
              />
            </Highlight>
          </li>
        ))}
      </ul>
    </div>
    :
    <div>
      <ul>
        {searchResults.map(document => (
          <li key={document.node.id}>
            <h2>
              <Link to={`/blog/${document.node.title.split(" ").join("-")}`} style={{ textDecoration: `none` }}>
                <Highlight search={query}>{document.node.title}</Highlight>
              </Link>
            </h2>
            {/* <h4><Highlight search={query}>By{" "}{document.node.author}</Highlight></h4> */}
            {/* <h4><Highlight search={query}>By{" "}{document.node.author.name}</Highlight></h4> */}
            {document.node.image ?
              // <Img fixed={document.node.image.childImageSharp.fixed} />
              <Img fluid={document.node.image.childImageSharp.fluid} />
            :
              ""
            }
            <Highlight search={query}>
              <ReactMarkdown
                source={`${document.node.content.slice(0,500)}...`}
                transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
              />
            </Highlight>
          </li>
        ))}
      </ul>
    </div>
    }
    <SearchFooter />
  </div>
  )
}


export default SearchPage;

// // gql query
// export const fuseQuery = graphql`
//   query FuseQuery {
//     allStrapiArticle(
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


// // DYNAMIC SEARCH PAGE
// import React from 'react'
// import { Router } from '@reach/router';
// import FuseSearch from '../components/fusesearch';

// const SearchPage = ({ location }) => {
//   return (
//     <div>
//       <Router>
//         <FuseSearch path="/search/:query" />
//       </Router>
//     </div>
//   )
// }

// export default SearchPage;