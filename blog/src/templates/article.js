import React from "react"
// import { Link, graphql } from "gatsby"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

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
    <p>{data.strapiArticle.content}</p>
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
      user {
        id
        username
      }
    }
  }
`

//

// const ArticleTemplate = ({ data }) => (
//   <Layout>
//     <h1>{data.strapiArticle.title}</h1>
//     <p>
//       by{" "}
//       <Link to={`/authors/User_${data.strapiArticle.author.id}`}>
//         {data.strapiArticle.author.username}

//         {/* ADD THE ACTUAL WRITER'S NAME */}
//         {/* {data.strapiArticle.submitter.name} */}
//       </Link>
//     </p>
//     <Img fluid={data.strapiArticle.image.childImageSharp.fluid} />
//     <p>{data.strapiArticle.content}</p>
//   </Layout>
// )

// export default ArticleTemplate

// export const query = graphql`
//   query ArticleTemplate($id: String!) {
//     strapiArticle(id: { eq: $id }) {
//       title
//       content
//       image {
//         childImageSharp {
//           fluid(maxWidth: 500) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//       submitter {
//         id
//         name
//       }
//     }
//   }
// `

//

// const ArticleTemplate = ({ data }) => (
//   <Layout>
//     <h1>{data.strapiArticle.title}</h1>
//     <p>
//       by{" "}
//       <Link to={`/authors/User_${data.strapiArticle.author.id}`}>
//         {data.strapiArticle.author.name}
//       </Link>
//     </p>
//     <Img fluid={data.strapiArticle.image.childImageSharp.fluid} />
//     <p>{data.strapiArticle.content}</p>
//   </Layout>
// )

// export default ArticleTemplate

// export const query = graphql`
//   query ArticleTemplate($id: String!) {
//     strapiArticle(id: { eq: $id }) {
//       title
//       content
//       image {
//         childImageSharp {
//           fluid(maxWidth: 500) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//       author {
//         id
//         name
//       }
//     }
//   }
// `