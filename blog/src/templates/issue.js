import React from "react"
import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"

const IssueTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiIssue.title}</h1>
    <p>
      By{" "}
      {data.strapiIssue.author}
    </p>
    <p>
      Tags: 
      {
        data.strapiIssue.tag
        ?
        data.strapiIssue.tag.map((t, idx) => <Link to={`/tags/Tag_${t.id}`} key={idx}>{t.title}</Link>)
        :
        'N/A'
      }
    </p>
    {/* {
      data.strapiIssue.image
        ?
        <Img fluid={data.strapiIssue.image.childImageSharp.fluid} />
        :
        ""
    } */}
    <ReactMarkdown
      source={data.strapiIssue.content}
    //   transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
    />
  </Layout>
)

export default IssueTemplate

export const query = graphql`
  query IssueTemplate($id: String!) {
    strapiIssue(id: { eq: $id }) {
      title
      author
      content
      tag {
        id
        title
      }
    }
  }
`