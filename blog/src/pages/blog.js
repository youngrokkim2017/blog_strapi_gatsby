import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';

import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"

const BlogPage = ({ data }) => (
  <Layout>
    {/* <Link to="/blog/" style={{ textDecoration: `none` }}>Blog</Link> */}
    {/* <Link to="/magazine/" style={{ textDecoration: `none` }}>Magazine</Link> */}

    <ul>
      {/* {data.allStrapiArticle.edges.map(document => ( */}
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
    </ul>

    {/* <Link to="/page-2/">Go to page 2</Link> <br /> */}
    {/* <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
  </Layout>
)

export default BlogPage;

// gql query
export const blogQuery = graphql`
  query BlogQuery {
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
