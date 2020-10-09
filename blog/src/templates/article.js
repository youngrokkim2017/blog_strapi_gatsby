import React from "react"
// import { Link, graphql } from "gatsby"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"

const ArticleTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiArticle.title}</h1>
    <p>
      By{" "}
      {/* <Link to={`/authors/User_${data.strapiArticle.user.id}`}>
        {data.strapiArticle.user.username}
      </Link> */}
      {data.strapiArticle.author}
    </p>
    {/* <Img fluid={data.strapiArticle.image.childImageSharp.fluid} /> */}
    {
      data.strapiArticle.image
        ?
        <Img fluid={data.strapiArticle.image.childImageSharp.fluid} />
        :
        ""
    }
    <Reactmarkdown
      source={data.strapiArticle.content}
      transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
    />
  </Layout>

)

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      title
      author
      content
      image {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

// export const query = graphql`
//   query ArticleTemplate($id: String!) {
//     strapiArticle(id: { eq: $id }) {
//       title
//       author
//       content
//       image {
//         childImageSharp {
//           fluid(maxWidth: 500) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//       user {
//         id
//         username
//       }
//     }
//   }
// `