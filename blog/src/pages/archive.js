import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';
import Layout from "../components/layout"
import SEO from "../components/seo"
// import ReactMarkdown from "react-markdown"

const ArchivePage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Archive" />
      <h2>Archive</h2>
      <div>
        <ul>
          {data.allStrapiArticle.edges.map(document => (
            <li key={document.node.id} className="flex mb-12 max-w-full border-t pt-8">
                <div className="mr-4">
                  {
                    document.node.image
                      ?
                      <Img fixed={document.node.image.childImageSharp.fixed} />
                      :
                      ""
                  }
                </div>
                <div className="antialiased leading-relaxed sans-serif">
                  <h2>
                    <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}>
                      {document.node.title}
                    </Link>
                  </h2>
                  <h4>By{" "}{document.node.author}</h4>
                  {/* <ReactMarkdown
                    source={`${document.node.content.slice(0, 500)}...`}
                    transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                  /> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {data.allStrapiIssue.edges.map(document => (
            <li key={document.node.id} className="flex mb-12 max-w-full border-t pt-8">
              <div className="mr-4">
                  {
                    document.node.image
                      ?
                      <Img fixed={document.node.image.childImageSharp.fixed} />
                      :
                      ""
                  }
                </div>
                <div className="antialiased leading-relaxed sans-serif">
                  <h2>
                    <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}>
                      {document.node.title}
                    </Link>
                  </h2>
                  <h4>By{" "}{document.node.author}</h4>
                  {/* <ReactMarkdown
                    source={`${document.node.content.slice(0, 500)}...`}
                    transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                  /> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default ArchivePage;

// gql query
export const archiveQuery = graphql`
  query ArchiveQuery {
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
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
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