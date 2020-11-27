import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';
import Layout from "../components/layout"
import SEO from "../components/seo"
import ReactMarkdown from "react-markdown"


const MagazinePage = ({ data }) => {
  // const unsortedArticles = data.allStrapiArticle.edges;
  // const sortedArticles = unsortedArticles.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]).slice(0, 5);
  // const unsortedMagazines = data.allStrapiIssue.edges;
  // const sortedMagazines = unsortedMagazines.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]).slice(0, 5);

  return (
  <Layout>
    <SEO title="Magazine index page" />
    {/* MAGAZINE ARTICLES */}
    <ul>
      {/* {data.allStrapiIssue.edges.reverse().slice(0, 3).map(document => ( */}
      {/* {sortedMagazines.map(document => ( */}
      {data.allStrapiIssue.edges.map(document => (
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
          <p>{`${document.node.content.slice(0,500)}...`}</p>
        </li>
      ))}
    </ul>

    {/* BLOG ARTICLES */}
     <ul>
      {/* {data.allStrapiArticle.edges.reverse().slice(0, 3).map(document => ( */}
      {/* {sortedArticles.map(document => ( */}
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
          <ReactMarkdown
            source={`${document.node.content.slice(0,500)}...`}
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

// export const magazineQuery = graphql`
//   query MagazineQuery {
//     allStrapiIssue(
//       limit: 5
//       sort: { order: DESC, fields: id }
//     ) {
//       edges {
//         node {
//           id
//           title
//           author
//           content
//           image {
//             childImageSharp {
//               fixed(width: 200, height: 125) {
//                 ...GatsbyImageSharpFixed
//               }
//             }
//           }
//           tag {
//             id
//             title
//           }
//         }
//       }
//     }
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