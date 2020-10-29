import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const MagazinePage = () => (
  <Layout>
    <SEO title="Magazine page" />
    {/* <Link to="/">Go back to the homepage</Link> */}
    <Link to="/" style={{textDecoration: `none`}}>Go back to the homepage</Link>
    <h1>Hi from the Magazine page</h1>
    <p>Welcome to magazine page</p>
  </Layout>
)

export default MagazinePage;
