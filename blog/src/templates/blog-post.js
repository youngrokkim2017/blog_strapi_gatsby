import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

class BlogPostTemplate extends React.Component {
  render() {
    const article = this.props.data.strapiArticle
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} >
        <h1>{article.title}</h1>
        <ul>
          <li>
            {previous && (
              <Link to={previous.id} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.id} rel="next">
              {/* <Link to={`/blog/${document.node.id}`} rel="next"> */}
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const query = graphql`
  query BlogPostTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      id
      title
      author
      published_at
      updated_at
      content
      image {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      category {
        id
        title
      }
    }
  }
`