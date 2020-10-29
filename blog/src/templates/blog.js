import React from "react"
import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"
// import Reactmarkdown from "react-markdown"

const BlogTemplate = ({ data }) => (
  <Layout>
    <Link to="/" style={{textDecoration: `none`}}>Go back to the homepage</Link>
    <h1>{data.strapiBlog.title}</h1>
    <p>{data.strapiBlog.content}</p>
  </Layout>
)

export default BlogTemplate;

export const query = graphql`
  query BlogTemplate($id: String!) {
    strapiBlog(id: { eq: $id }) {
      title
      content
    }
  }
`