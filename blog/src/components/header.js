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
    <nav className="text-black mb-12 container mx-auto sans-serif">
      <div className="border-b py-4" style={{ borderBottomColor: '#ECECF3' }}>
        <div className="flex mx-auto items-center justify-between flex-wrap">
          <div className="w-1/4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <div className="flex items-center text-center">
            <Link to="/" className="font-semibold text-2xl tracking-tight">
              <img src={logo} alt="Logo" className="sm:h-12 mx-auto" />
            </Link>
          </div>
          <div className="relative w-1/4 flex justify-end">
            <form onSubmit={handleNavigate}>
              {/* <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              /> */}
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
      <div className="container mx-auto text-center py-2 border-b border-black">
        <div className="">
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
              <div className="text-sm space-x-4 mx-auto">
                {data.allStrapiCategory.edges.map((document, idx) => (

                  <Link 
                    // to={`/categories/${document.node.id}`} 
                    to={`/categories/${document.node.title.split(" ").join("-")}`} 
                    // to={`/categories/${document.node.title.split(" ").join("-")}/1`} 
                    key={idx} 
                    className="block mt-4 lg:inline-block lg:mt-0 mr-4">
                    {document.node.title}
                  </Link>
                ))}

                <Link 
                  to="/archive/1" 
                  className="block mt-4 lg:inline-block lg:mt-0 mr-4">
                  Archive
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