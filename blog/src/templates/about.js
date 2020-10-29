import React from "react"
import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"
// import Reactmarkdown from "react-markdown"

const AboutTemplate = ({ data }) => (
  <Layout>
    <Link to="/" style={{textDecoration: `none`}}>Go back to the homepage</Link>
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