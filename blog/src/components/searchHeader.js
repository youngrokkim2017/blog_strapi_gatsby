import React from "react"
import { Link } from "gatsby"
import logo from "../images/logo.png"

const SearchHeader = ({ categories }) => {
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
              
            </div>
          </div>
        </div>
        <div className="container mx-auto text-center py-2 border-b border-black">
          <div className="">
            <div className="text-sm space-x-4 mx-auto">
              {categories.map((document, idx) => (
                <Link 
                  to={`/categories/${document.node.title.split(" ").map((category) => category.toLowerCase()).join("-")}`} 
                  key={idx} 
                  className="block mt-4 lg:inline-block lg:mt-0"
                >
                  {document.node.title}
                </Link>
              ))}
              <Link 
                to="/archive/1" 
                className="block mt-4 lg:inline-block lg:mt-0">
                Archive
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default SearchHeader
