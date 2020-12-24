import React, { useState } from "react"
// import React, { useState, lazy, Suspense } from "react"
// import React, { useState, useRef } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from 'gatsby-image';
// import Layout from "../components/layout"
// import SEO from "../components/seo"
import ReactMarkdown from "react-markdown"
import logo from "../images/logo.png"
import Fuse from "fuse.js"  // fuzzy search
import Highlight from 'react-highlighter'
// import SearchContainer from '../components/searchContainer'
// const SearchComponent = lazy(() => import('../components/searchContainer'));

// const SearchPage = ({ data, location }) => {
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

  console.log(currentResults, location.state.searchQuery, query)

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
            {data.allStrapiCategory.edges.map((document, idx) => (
              <Link 
                to={`/categories/${document.node.id}`} 
                key={idx} 
                className="block mt-4 lg:inline-block lg:mt-0 mr-4"
              >
                {document.node.title}
              </Link>
            ))}
            <Link 
              to="/archive/" 
              className="block mt-4 lg:inline-block lg:mt-0 mr-4"
            >
              Archive
            </Link>
          </div>
        </div>
      </div>
    </nav>
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
              <Link to={`/blog/${document.node.title.split(" ").join("-")}`} style={{ textDecoration: `none` }}>
                <Highlight search={query}>{document.node.title}</Highlight>
              </Link>
            </h2>
            <h4><Highlight search={query}>By{" "}{document.node.author}</Highlight></h4>
            {
              document.node.image
              ?
              <Img fixed={document.node.image.childImageSharp.fixed} />
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
            <h4><Highlight search={query}>By{" "}{document.node.author}</Highlight></h4>
            {
              document.node.image
              ?
              <Img fixed={document.node.image.childImageSharp.fixed} />
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
    <nav>
      <div>
        {/* links to about, subscribe, etc */}
        <div>
          <h2>ABOUT US</h2>
          <Link to="/">Staff</Link>
          <Link to="/">Write for us</Link>
          <Link to="/">Join our team</Link>
        </div>
        <div>
          <h2>CONTACT US</h2>
        </div><div>
          <h2>WRITING RESOURCES</h2>
        </div>
      </div>
    </nav>
  </div>
  // </Layout>
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