import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

const CategoryTemplate = ({ data }) => (
  <Layout>
    <h2>{data.strapiCategory.title}</h2>
    <ul>
      {data.strapiCategory.articles.map(document => (
        <li key={document.id}  className="flex mb-12 max-w-full border-t pt-8">
            <div className="mr-4">
              {document.image ?
                  <Img fixed={document.image.childImageSharp.fixed} />
                :
                  ""
              }
            </div>
            <div className="antialiased leading-relaxed sans-serif">
              <h2>
                <Link to={`/blog/Article_${document.id}`} style={{ textDecoration: `none` }}>
                  {document.title}
                </Link>
              </h2>
              <h4>By{" "}{document.author}</h4>
              {/* <ReactMarkdown
                source={`${document.content.slice(0, 500)}...`}
                transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
              /> */}
          </div>
        </li>
      ))}
    </ul>
  </Layout>
)

export default CategoryTemplate;

export const query = graphql`
  query CategoryTemplate($id: String!) {
    strapiCategory(id: { eq: $id }) {
      title
      articles {
        id
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
  }
`
