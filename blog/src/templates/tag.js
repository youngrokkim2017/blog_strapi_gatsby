import React from "react"
import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"

const TagTemplate = ({ data }) => (
  <Layout>
    <div>
      {/* <Link to={`/Tag_${data.strapiTag.title}`}> */}
        <h3>{data.strapiTag.title}</h3>
      {/* </Link> */}
    </div>
    <div>
        {data.strapiTag.issue.map((a, idx) => {
            return (
                <ul key={idx}>
                    <li>
                        <Link to={`/Issue_${a.id}`}>{a.title}</Link>
                        <div>{a.content}</div>
                    </li>
                </ul>
            )
        })}
    </div>
  </Layout>
)

export default TagTemplate;

export const query = graphql`
  query TagTemplate($id: String!) {
    strapiTag(id: { eq: $id }) {
      title
      issues {
          id
          title
          author
          content
      }
    }
  }
`