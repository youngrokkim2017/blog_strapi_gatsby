import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPage = () => (
  <Layout>
    <SEO title="Blog page" />
    <Link to="/" style={{textDecoration: `none`}}>Go back to the homepage</Link>
    <h1>Hi from the blog page</h1>
    <p>Welcome to blog page</p>
  </Layout>
)

export default BlogPage;
