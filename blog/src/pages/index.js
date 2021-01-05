import React from "react";
import Layout from "../components/layout"
import { graphql } from "gatsby"
// import { Link, graphql } from "gatsby"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <div className="bg-red-300">HOME PAGE</div>
    </Layout>
  )
}
  
export default IndexPage;

// gql query
export const splashQuery = graphql`
  query SplashQuery {
    allStrapiArticle(
      limit: 5
      sort: { order: DESC, fields: published_at }
    ) {
      edges {
        node {
          id
          image {
            publicURL
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
  }
`