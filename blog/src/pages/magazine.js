import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';
import Layout from "../components/layout"
import SEO from "../components/seo"
import ReactMarkdown from "react-markdown"


const MagazinePage = ({ data }) => {
  const unsortedArticles = data.allStrapiArticle.edges;
  const sortedArticles = unsortedArticles.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]).slice(0, 5);
  const unsortedMagazines = data.allStrapiIssue.edges;
  const sortedMagazines = unsortedMagazines.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]).slice(0, 5);

  return (
  <Layout>
    <SEO title="Magazine index page" />
    {/* MAGAZINE ARTICLES */}
    <ul>
      {/* {data.allStrapiIssue.edges.reverse().slice(0, 3).map(document => ( */}
      {sortedMagazines.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/magazine/${document.node.id}`} style={{textDecoration: `none`}}>
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
          <p>{document.node.content}</p>
        </li>
      ))}
    </ul>

    {/* BLOG ARTICLES */}
     <ul>
      {/* {data.allStrapiArticle.edges.reverse().slice(0, 3).map(document => ( */}
      {sortedArticles.map(document => (
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
          <ReactMarkdown
            source={document.node.content}
            transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
          />
        </li>
      ))}
    </ul>
  </Layout>
  )
}

export default MagazinePage;

// gql query
export const magazineQuery = graphql`
  query MagazineQuery {
    allStrapiIssue(
      sort: { order: DESC, fields: id }
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
        }
      }
    }
    allStrapiArticle(
      sort: { order: DESC, fields: id }
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
        }
      }
    }
  }
`