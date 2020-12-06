// import { Link } from "gatsby"
import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
// import React from "react"
import React, { useState } from "react"
import logo from "../images/logo.png"

const Header = ({ siteTitle }) => {
  const [query, setQuery] = useState('');

  // function handleOnSearch({ currentTarget = {} }) {
  //   const { value } = currentTarget;

  //   setQuery(value);
  // }

  return (
    <nav className="p-4 text-black mb-12 border-b" style={{ borderColor: '#c8c8c8' }}>
      <div className="flex container mx-auto items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link to="/" className="font-semibold text-2xl tracking-tight">
            <img src={logo} alt="Logo" className="h-10 sm:h-8"/>
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
          {/* SEARCH BAR COMPONENT */}
          <div>
            <form
              onSubmit={event => {
                event.preventDefault()
                navigate(
                  // "/blog/",
                  "/search/",
                  // { replace: true },
                  {
                    state: { searchQuery: query },
                  }
                )
              }}
            >
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* <Link to={'/blog'} state={{ searchQuery: query }}>SEARCH</Link> */}
              <button type="submit">SEARCH</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header