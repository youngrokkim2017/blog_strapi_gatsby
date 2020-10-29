import React from "react"
import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"
// import Reactmarkdown from "react-markdown"

const SubscribeTemplate = ({ data }) => (
  <Layout>
    <Link to="/" style={{textDecoration: `none`}}>Go back to the homepage</Link>
    <h1>{data.strapiSubscribe.title}</h1>
    <p>{data.strapiSubscribe.content}</p>
  </Layout>
)

export default SubscribeTemplate;

export const query = graphql`
  query SubscribeTemplate($id: String!) {
    strapiSubscribe(id: { eq: $id }) {
      title
      content
    }
  }
`