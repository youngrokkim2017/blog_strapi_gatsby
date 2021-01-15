import React from "react";
import Layout from "../components/layout"
import { graphql } from "gatsby"
// import { Link, graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const sortedByDate = this.props.data.allStrapiArticle.edges.sort((a, b) => {
    let aDate = parseInt(a.node.published_at.split("T")[0].split("-").join(""))
    let bDate = parseInt(b.node.published_at.split("T")[0].split("-").join(""))
    return (bDate - aDate)
  });

  const recentArticles = sortedByDate.slice(0, 3);

  const labscopeArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title === 'Labscope')
    // document.node.categories[0].title === 'Labscope'
  )).slice(0, 5);

  const noteworthyArticles = sortedByDate.filter(document => (
    document.node.categories.map(cat => cat.title === 'Noteworthy News')
    // document.node.categories[0].title === 'Noteworthy News'
  )).slice(0, 5);

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