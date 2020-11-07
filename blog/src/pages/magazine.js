import React from "react"
import { Link, graphql } from "gatsby"
// import Img from 'gatsby-image';

import Layout from "../components/layout"

const MagazinePage = ({ data }) => (
  <Layout>
    <ul>
      {data.allStrapiIssue.edges.reverse().map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/magazine/${document.node.id}`} style={{textDecoration: `none`}}>
              {document.node.title}
            </Link>
          </h2>
          <h4>By{" "}{document.node.author}</h4>
          {/* {
            document.node.image
            ? 
            <Img fixed={document.node.image.childImageSharp.fixed} />
            :
            ""
          } */}
          <p>{document.node.content}</p>
        </li>
      ))}
    </ul>

    <Link to="/page-2/">Go to page 2</Link> <br />
  </Layout>
)

export default MagazinePage;

// gql query
export const magazineQuery = graphql`
  query MagazineQuery {
    allStrapiIssue {
      edges {
        node {
          id
          title
          author
          content
          tag {
            id
            title
          }
        }
      }
    }
  }
`