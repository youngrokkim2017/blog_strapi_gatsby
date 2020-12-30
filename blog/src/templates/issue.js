import React from "react"
import { graphql } from "gatsby"
// import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"
// import Preview from "../components/preview"

const MagazineIssueTemplate = ({ data }) => (
  <Layout>
    <div className="">
      <h2 className="font-normal mb-12 text-4xl leading-tight">{data.strapiMagazineIssue.issue}</h2>
    </div>
  </Layout>
)

export default MagazineIssueTemplate;

export const query = graphql`
  query MagazineIssueTemplate($id: String!) {
    strapiMagazineIssue(id: { eq: $id }) {
      id
      issue
    }
  }
`

// export const query = graphql`
//   query CategoryTemplate($id: String!) {
//     strapiCategory(id: { eq: $id }) {
//       id
//       title
//       articles {
//         id
//         title
//         author
//         content
//         image {
//           childImageSharp {
//             fixed(width: 200, height: 125) {
//               ...GatsbyImageSharpFixed
//             }
//             fluid(maxWidth: 1000) {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//     }
//   }
// `

// export const query = graphql`
//   query CategoryTemplate($id: String!) {
//     strapiCategory(id: { eq: $id }) {
//       title
//       articles {
//         id
//         title
//         author
//         content
//         image {
//           childImageSharp {
//             fluid(maxWidth: 500) {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//     }
//   }
// `