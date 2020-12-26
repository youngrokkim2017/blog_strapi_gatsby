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
import MailchimpComponent from '../components/mailchimp'

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
    <nav className="text-black mb-12 container mx-auto sans-serif">
      <div className="border-b py-4" style={{ borderBottomColor: '#ECECF3' }}>
        <div className="flex mx-auto items-center justify-between flex-wrap">
          <div className="w-1/4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <div className="flex items-center text-center">
            <Link to="/" className="font-semibold text-2xl tracking-tight">
              <img src={logo} alt="Logo" className="sm:h-12 mx-auto" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto text-center py-2 border-b border-black">
        <div className="">
            <div className="text-sm space-x-4 mx-auto">
              {data.allStrapiCategory.edges.map((document, idx) => (
                <Link 
                  to={`/categories/${document.node.title.split(" ").join("-")}`} 
                  key={idx} 
                  className="block mt-4 lg:inline-block lg:mt-0 mr-4"
                >
                  {document.node.title}
                </Link>
              ))}

              <Link 
                to="/archive/1" 
                className="block mt-4 lg:inline-block lg:mt-0 mr-4">
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
    <nav className="border-t border-black mt-16 sans-serif bg-white text-black pb-8">
      <div className="container mx-auto mt-8">
        <div className="block flex-grow lg:flex lg:w-auto">
          {/* links to about, subscribe, etc */}
          <div className="text-md lg:flex-grow">
            <h2 className="font-bold mb-2">About Us</h2>
            <ul className="m-0 space-y-2">
              <li><Link to="/">Staff</Link></li>
              <li><Link to="/">Write For Us</Link></li>
              <li><Link to="/">Join Our Team</Link></li>
            </ul>
          </div>
          <div className="text-md lg:flex-grow">
          <h2 className="font-bold mb-2">Contact Us</h2>
            <ul className="m-0 space-y-2">
              <li><Link to="/">Mailing List</Link></li>
              <li><Link to="/">Write Us A Letter</Link></li>
              <li><Link to="/">Email</Link></li>
            </ul>
          </div>
          <div className="text-md lg:flex-grow">
          <h2 className="font-bold mb-2">Writing Resources</h2>
            <ul className="m-0 space-y-2">
              <li><Link to="/">General Writing Advice</Link></li>
              <li><Link to="/">Calendar</Link></li>
              <li><Link to="/">External Resources</Link></li>
            </ul>
          </div>
          <div className="text-md lg:flex-shrink max-w-sm">
            <h2 className="font-bold mb-2">Follow Us</h2>
            <div className="flex flex-col mb-12 space-y-2">
              <a href="https://www.facebook.com/berkeleyscirev" className="flex items-center space-x-2 no-underline">
                <svg width="20" height="20" viewBox="0 0 16 16">
                  <path d="M15.117 0H.883A.883.883 0 0 0 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.461V7.389h2.085V5.61c0-2.067 1.262-3.192 3.106-3.192.883 0 1.642.065 1.863.095v2.16h-1.279c-1.002 0-1.196.476-1.196 1.176v1.541h2.39l-.31 2.415h-2.08V16h4.077a.883.883 0 0 0 .883-.883V.883A.883.883 0 0 0 15.117 0"></path>
                </svg>
                <span>Facebook</span>
              </a>
              <a href="https://twitter.com/BerkeleySciRev" className="flex items-center space-x-2 no-underline">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
                <span>Twitter</span>
              </a>
              {/* <a href="#" className="flex items-center space-x-2 no-underline">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Email</span>
              </a> */}
            </div>
            <MailchimpComponent />
          </div>
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