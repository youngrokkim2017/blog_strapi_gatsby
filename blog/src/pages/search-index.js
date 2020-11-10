import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';
import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"
import SEO from "../components/seo"
import Fuse from "fuse.js"  // fuzzy search

const SearchPage = ({ data }) => {
    const [query, setQuery] = useState('');

    const unsortedData = data.allStrapiArticle.edges;
    // console.log(unsortedData);
    const fuse = new Fuse(unsortedData, {
        keys: [
            'node.title',
            // 'node.author',
            // 'node.content',
        ],
        includeScore: true,
    });
    console.log('fuse', fuse);
    // const results = fuse.search('science');
    const results = fuse.search(query);
    console.log(results);

    // const searchResults = results.map(result => result.item)
    const searchResults = query ? results.map(result => result.item) : unsortedData.reverse();
    // console.log(searchResults);
    // console.log(query);

    function handleOnSearch({ currentTarget = {} }) {
        const { value } = currentTarget;
        setQuery(value);
    }

    return (
        <Layout>
        <SEO title="Search index page" />

        <div>
            <form>
                <input type="text" placeholder="Search" value={query} onChange={handleOnSearch} />
            </form>
        </div>

        {/* <ul>
            {data.allStrapiArticle.edges.reverse().map(document => (
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
                    source={document.node.content}
                    transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                />
                </li>
            ))}
        </ul> */}

        <ul>
            {/* {searchResults.reverse().map(document => ( */}
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
                    source={document.node.content}
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
export const searchQuery = graphql`
  query SearchQuery {
    allStrapiArticle {
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
        }
      }
    }
  }
`

// import React, { useReact } from "react"
// import { Link, graphql } from "gatsby"

// const BlogIndex = props => {
//   const { data } = props
//   const allPosts = data.allMarkdownRemark.edges
//   const emptyQuery = ""
//   const [state, setState] = useState({
//     filteredData: [],
//     query: emptyQuery,
//   })
//   const handleInputChange = event => {
//     console.log(event.target.value)
//     const query = event.target.value
//     const { data } = props
//     const posts = data.allMarkdownRemark.edges || []
//     const filteredData = posts.filter(post => {
//       const { description, title, tags } = post.node.frontmatter
//       return (
//         description.toLowerCase().includes(query.toLowerCase()) ||
//         title.toLowerCase().includes(query.toLowerCase()) ||
//         (tags &&
//           tags
//             .join("")
//             .toLowerCase()
//             .includes(query.toLowerCase()))
//       )
//     })
//     setState({
//       query,
//       filteredData,
//     })
//   }
//   const { filteredData, query } = state
//   const hasSearchResults = filteredData && query !== emptyQuery
//   const posts = hasSearchResults ? filteredData : allPosts
//   return (
//     <>
//       <h1 style={{ textAlign: `center` }}>Writing</h1>
//       <div className="searchBox">
//         <input
//           className="searchInput"
//           type="text"
//           aria-label="Search"
//           placeholder="Type to filter posts..."
//           onChange={handleInputChange}
//         />
//       </div>
//       {posts.map(({ node }) => {
//         const { excerpt } = node
//         const { slug } = node.fields
//         const { tags, title, date, description } = node.frontmatter
//         return (
//           <article key={slug}>
//             <header>
//               <h2>
//                 <Link to={slug}>{title}</Link>
//               </h2>
//               <p>{date}</p>
//             </header>
//             <section>
//               <p
//                 dangerouslySetInnerHTML={{
//                   __html: description || excerpt,
//                 }}
//               />
//             </section>
//             <hr />
//           </article>
//         )
//       })}
//     </>
//   )
// }
// export default BlogIndex
// export const pageQuery = graphql`
//   query {
//     allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
//       edges {
//         node {
//           excerpt(pruneLength: 200)
//           id
//           frontmatter {
//             title
//             description
//             date(formatString: "MMMM DD, YYYY")
//             tags
//           }
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   }
// `