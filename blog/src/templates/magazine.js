import React from "react"
import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"
// import Reactmarkdown from "react-markdown"

const MagazineTemplate = ({ data }) => (
  <Layout>
    <Link to="/" style={{textDecoration: `none`}}>Go back to the homepage</Link>
    <h1>{data.strapiMagazine.title}</h1>
    <p>{data.strapiMagazine.content}</p>
  </Layout>
)

export default MagazineTemplate;

export const query = graphql`
  query MagazineTemplate($id: String!) {
    strapiMagazine(id: { eq: $id }) {
      title
      content
    }
  }
`