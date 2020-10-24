import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Img from 'gatsby-image';

const BlogPage = ({ data }) => (
  <Layout>
    <SEO title="Blog page" />
    <Link to="/" style={{textDecoration: `none`}}>Go back to the homepage</Link>
    <h1>Hi from the blog page</h1>
    <p>Welcome to blog page</p>

    {/* <ul>
      {data.allStrapiArticle.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`}>
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
    </ul> */}
  </Layout>
)

export default BlogPage;

// export const pageQuery = graphql`
//   query BlogQuery {
//     allStrapiArticle {
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