import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Preview from "../components/preview"

const CategoryTemplate = ({ data }) => (
  <Layout>
    <div className="">
      <h2 className="font-normal mb-12 text-4xl leading-tight">{data.strapiCategory.title}</h2>
    <ul>
      {data.strapiCategory.articles.reverse().slice(0, 10).map(document => (
        <li key={document.id} className="mb-4">
          <Preview article={document} format="medium" />
        </li>
        // <li key={document.id}  className="flex mb-12 max-w-full border-t pt-8">
        //     <div className="mr-4">
        //       {document.image ?
        //           // <Img fixed={document.image.childImageSharp.fixed} />
        //           <Img fluid={document.image.childImageSharp.fluid} />
        //         :
        //           ""
        //       }
        //     </div>
        //     <div className="antialiased leading-relaxed">
        //       <h2>
        //         {/* <Link to={`/blog/Article_${document.id}`} style={{ textDecoration: `none` }}> */}
        //         <Link to={`/blog/${document.title.split(" ").map((category) => category.toLowerCase()).join("-")}`} style={{ textDecoration: `none` }}>
        //           {document.title}
        //         </Link>
        //       </h2>
        //       <h4>By{" "}{document.author}</h4>
        //       {/* <ReactMarkdown
        //         source={`${document.content.slice(0, 500)}...`}
        //         transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
        //       /> */}
        //   </div>
        // </li>
      ))}
    </ul>
    </div>
  </Layout>
)

export default CategoryTemplate;

export const query = graphql`
  query CategoryTemplate($id: String!) {
    strapiCategory(id: { eq: $id }) {
      id
      title
      articles {
        id
        title
        author
        content
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
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