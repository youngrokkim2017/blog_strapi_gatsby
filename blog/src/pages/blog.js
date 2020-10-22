import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPage = () => (
  <Layout>
    <SEO title="Blog page" />
    <h1>Hi from the blog page</h1>
    <p>Welcome to blog page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default BlogPage;
