import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
// import { graphql } from "gatsby"

import Header from "./header"
import Footer from './footer'
import "./css/styles.css"

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <div>
        <main className='container mx-auto'>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
