import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// import ReactMarkdown from "react-markdown"

const AboutTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiAbout.title}</h1>
    <p>{data.strapiAbout.content}</p>
  </Layout>
)

export default AboutTemplate;

export const query = graphql`
  query AboutTemplate($id: String!) {
    strapiAbout(id: { eq: $id }) {
      title
      content
    }
  }
`