import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About us page" />
    <h1>Hi from the about us page</h1>
    <p>Welcome to about us page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default AboutPage;
