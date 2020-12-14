import React, { useState } from "react"
import { Link, navigate, StaticQuery, graphql } from "gatsby"
// import PropTypes from "prop-types"
import logo from "../images/logo.png"

const Header = () => {
// const Header = ({ siteTitle }) => {
  const [query, setQuery] = useState('');

  function handleNavigate(e) {
    e.preventDefault()

    navigate(
      "/search/",
      // `/search/${query}`,
      {
        state: { searchQuery: query },
      }
    )
  }

  return (
    <nav className="p-4 text-black mb-12 border-b" style={{ borderBottomColor: '#888888' }}>
      <div className="flex container mx-auto items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link to="/" className="font-semibold text-2xl tracking-tight">
            <img src={logo} alt="Logo" className="h-10 sm:h-8" />
          </Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <StaticQuery
            query={graphql`
              query HeadingQuery {
                allStrapiCategory {
                  edges {
                    node {
                      id
                      title
                    }
                  }
                }
              }
            `}
            render={data => (
              <div className="text-md lg:flex-grow">
                {data.allStrapiCategory.edges.map((document, idx) => (
                  <Link 
                    to={`/categories/${document.node.id}`} 
                    key={idx} 
                    className="block mt-4 lg:inline-block lg:mt-0 mr-4"
                  >
                    {document.node.title}
                  </Link>
                ))}
                <Link 
                  to="/archive/" 
                  className="block mt-4 lg:inline-block lg:mt-0 mr-4"
                >
                  ARCHIVE
                </Link>
              </div>
            )}
          />
          <div>
            <form onSubmit={handleNavigate}>
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* <Link to={'/blog'} state={{ searchQuery: query }}>SEARCH</Link> */}
              <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {/* <span>Quick search
                      <span class="hidden sm:inline"> for anything
                      </span>
                </span> */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header