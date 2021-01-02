import React from "react"
// import { graphql } from "gatsby"
import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
// import Preview from "../components/preview"

const CategoryTemplate = ({ data }) => {
  console.log(data.strapiCategory)
  return (
  <Layout>
    <div className="">
      <h2 className="font-normal mb-12 text-4xl leading-tight">{data.strapiCategory.title}</h2>
    <ul>
      {data.strapiCategory.articles.reverse().slice(0, 10).map(document => (
        // <li key={document.id} className="mb-4">
        //   <Preview article={document} format="medium" />
        // </li>
      <li key={document.id} className="mb-4">
        <div className="flex items-start">
          {/* {
            document.image
              ?
              <div className="mr-6">
                <Img fluid={document.image.childImageSharp.fluid} />
              </div>
              :
              ""
          } */}
          <div>
            <Link to={`/blog/${document.title.split(" ").map((category) => category.toLowerCase()).join("-")}`}>
              <h2 className="font-normal mb-4 text-2xl leading-tight">{document.title}</h2>
            </Link>
            <ReactMarkdown
              source={`${document.content.slice(0, 300)}...`}
              transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
              className="mb-4"
            />
            {data.allStrapiAuthors.edges.map(author => (
              <p className='mb-2 text-base'>
                {+author.node.id.split("_")[1] === document.author ?
                  <Link to={`/authors/${author.node.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
                    By {author.node.name}
                  </Link>
                  :
                  ""
                }
              </p>
            ))}
          </div>
        </div>
      </li>
      ))}
    </ul>
    </div>
  </Layout>
  )
}

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
        magazine
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allStrapiAuthors {
      edges {
        node {
          id
          name
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