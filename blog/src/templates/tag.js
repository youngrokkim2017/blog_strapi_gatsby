import React from "react"
import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"

const TagTemplate = ({ data }) => (
  <Layout>
    <p>
      {/* <Link to={`/Tag_${data.strapiTag.title}`}> */}
        <h3>{data.strapiTag.title}</h3>
      {/* </Link> */}
    </p>
    <p>
        {data.strapiTag.issue.map(a => {
            return (
                <ul>
                    <li>
                        <Link to={`/Issue_${a.id}`}>{a.title}</Link>
                        <div>{a.content}</div>
                    </li>
                </ul>
            )
        })}
    </p>
  </Layout>
)

export default TagTemplate;

export const query = graphql`
  query TagTemplate($id: String!) {
    strapiTag(id: { eq: $id }) {
      title
      issue {
          id
          title
          author
          content
      }
    }
  }
`