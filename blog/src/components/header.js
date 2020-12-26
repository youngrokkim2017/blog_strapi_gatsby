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

  function toggleSearchBar() {
    // x = document.getElementById("search-input");
    // x.classList.remove("hidden");
    // x.classList.add("block");
    // console.log("test");
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
              <img src={logo} alt="Logo" className="sm:h-10 mx-auto" />
            </Link>
          </div>
          <div className="relative w-1/4 flex justify-end items-center">
            <div className="block" id="search-input">
              <form onSubmit={handleNavigate} className="border-black text-gray-600 flex items-center py-1 px-2 pr-1 pl-0 border-b focus-within:border-blue-600">
                <input
                  type="text"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent border-none w-full text-black placeholder-gray-600 leading-tight focus:outline-none mr-2"
                />
                <button type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
            <button type="submit" className="inline-block pl-2 py-1 leading-none text-black flex-shrink-0 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button onClick={toggleSearchBar} className="inline-block py-1 leading-none text-black flex-shrink-0 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
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
              <div className="text-base space-x-4 mx-auto">
                {data.allStrapiCategory.edges.map((document, idx) => (

                  <Link
                    // to={`/categories/${document.node.id}`} 
                    to={`/categories/${document.node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`}
                    // to={`/categories/${document.node.title.split(" ").join("-")}/1`} 
                    key={idx}
                    className="block mt-4 lg:inline-block lg:mt-0">
                    {document.node.title}
                  </Link>
                ))}

                <Link
                  to="/archive/1"
                  className="block mt-4 lg:inline-block lg:mt-0">
                  Archive
                </Link>
              </div>
            )}
          />
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