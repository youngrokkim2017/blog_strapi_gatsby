import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';

import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"
import SEO from "../components/seo"

const BlogPage = ({ data }) => {
  // const unsortedData = data.allStrapiArticle.edges;
  // const sortedData = unsortedData.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]).slice(0, 5);
  // console.log(unsortedData, sortedData)
  // console.log(data.allStrapiArticle.edges)
  return (
  <Layout>
    <SEO title="Blog index page" />
    {/* <Link to="/blog/" style={{ textDecoration: `none` }}>Blog</Link> */}
    {/* <Link to="/magazine/" style={{ textDecoration: `none` }}>Magazine</Link> */}

    <ul>
      {/* {data.allStrapiArticle.edges.map(document => ( */}
      {/* {data.allStrapiArticle.edges.reverse().map(document => ( */}
      {/* {data.allStrapiArticle.edges.reverse().slice(0, 5).map(document => ( */}
      {/* {data.allStrapiArticle.edges.sort((a, b) => b.id - a.id).slice(0, 5).map(document => ( */}
      {/* {data.allStrapiArticle.edges.slice(0, 5).map(document => ( */}
      {/* {sortedData.map(document => ( */}
      {data.allStrapiArticle.edges.map(document => (
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

    {/* <Link to="/page-2/">Go to page 2</Link> <br /> */}
    {/* <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
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