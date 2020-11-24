import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <nav className="p-6 text-black">
    <div className="flex container mx-auto items-center justify-between flex-wrap  pb-4 border-b-2 border-red-500">
      <div className="flex items-center flex-shrink-0 mr-6">
        <Link to="/" className="font-semibold text-2xl tracking-tight">
          {siteTitle}
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/blog/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            Blog
          </Link>
          <Link to="/magazine/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            Magazine
          </Link>
          <Link to="/about/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            About Us
          </Link>
          <Link to="/subscribe/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            Subscribe
          </Link>
        </div>
      </div>
    </div>
  </nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
