import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const MagazinePage = () => (
  <Layout>
    <SEO title="Magazine page" />
    <h1>Hi from the Magazine page</h1>
    <p>Welcome to magazine page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default MagazinePage;
