import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allStrapiArticle.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Layout location={this.props.location} >
        {posts.map(({ node }) => {
          const title = node.title
          return (
            <div key={node.id}>
              {/* <Link to={`/blog/${document.node.id}`}> */}
              <Link to={`/blog/${node.id}`}>
                {title}
              </Link>
            </div>
          )
        })}
        <ul>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <li key={`pagination-number${i + 1}`}>
              <Link to={`/${i === 0 ? '' : i + 1}`}>
                {i + 1}
              </Link>
            </li>
          ))}
          {!isLast && (
            <Link to={nextPage} rel="next">
              Next Page →
            </Link>
          )}
        </ul>
      </Layout>
    )
  }
}

export default BlogIndex

export const blogListQuery = graphql`
  query BlogListQuery($skip: Int! = 0, $limit: Int!) {
    allStrapiArticle(
      sort: { fields: [created_at], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
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
          created_at
          published_at
          updated_at
        }
      }
    }
  }
`