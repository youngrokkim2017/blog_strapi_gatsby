import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';
// import Layout from "../components/layout"
// import SEO from "../components/seo"
import ReactMarkdown from "react-markdown"
import logo from "../images/logo.png"
import Fuse from "fuse.js"  // fuzzy search
import Highlight from 'react-highlighter';

const SearchPage = ({ data, location }) => {
  const [query, setQuery] = useState('');

  const unsortedData = data.allStrapiArticle.edges;
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
  const fuse = new Fuse(unsortedData, options);
  const results = fuse.search(index, { limit: 10 });
  const searchResults = results.length > 0 ? results.map(result => result.item) : unsortedData.slice(0, 5);

  // search query results while on route '/search'
  const currentResults = fuse.search(query, { limit: 10 });
  const currentSearchResults = query.length > 3 ? currentResults.map(result => result.item) : unsortedData.slice(0, 5);

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

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
          {/* <div className="text-md lg:flex-grow">
            {data.allStrapiCategory.edges.map((document, idx) => (
              <Link to={`/categories/Category_${document.node.id}` key={idx}}>{document.node.title}</Link>
            ))}
          </div> */}
        </div>
      </div>
    </nav>
    <div>
      <form>
        <input 
          type="text" 
          placeholder="Search" 
          value={query} 
          onChange={handleOnSearch} 
        />
      </form>
    </div>
    { query.length > 3 ?
    <div>
      <ul>
        {currentSearchResults.map(document => (
          <li key={document.node.id}>
            <h2>
              <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}>
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
            <ReactMarkdown
              source={<Highlight search={query}>{`${document.node.content.slice(0,500)}...`}</Highlight>}
              transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
            />
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
              <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}>
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
            <ReactMarkdown
              source={<Highlight search={query}>{`${document.node.content.slice(0,500)}...`}</Highlight>}
              transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
            />
          </li>
        ))}
      </ul>
    </div>
    }
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
    allStrapiCategory {
      edges {
        node {
          id
          title
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