import React from "react"
import { Link, graphql } from "gatsby"
// import Img from 'gatsby-image';

import Layout from "../components/layout"

const IndexTwoPage = ({ data }) => (
  <Layout>
    <ul>
      {data.allStrapiIssue.edges.reverse().map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`} style={{textDecoration: `none`}}>
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

    {/* <Link to="/page-2/">Go to page 2</Link> <br /> */}
  </Layout>
)

export default IndexTwoPage;

// gql query
export const pageTwoQuery = graphql`
  query IndexTwoQuery {
    allStrapiIssue(
      limit: 5
      sort: { order: DESC, fields: updated_at }
    ) {
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
          updated_at
        }
      }
    }
  }
`

// import React from "react"
// import { Link } from "gatsby"

// import Layout from "../components/layout"
// import SEO from "../components/seo"

// const SecondPage = () => (
//   <Layout>
//     <SEO title="Page two" />
//     <h1>Hi from the second page</h1>
//     <p>Welcome to page 2</p>
//     <Link to="/">Go back to the homepage</Link>
//   </Layout>
// )

// export default SecondPage
