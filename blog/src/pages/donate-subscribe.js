import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const DonateSubscribePage = () => (
  <Layout>
    <SEO title="Donate and subscribe page" />
    <h1>Hi from the Donate and Subscribe page</h1>
    <p>Welcome to Donate and Subscribe page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default DonateSubscribePage;
