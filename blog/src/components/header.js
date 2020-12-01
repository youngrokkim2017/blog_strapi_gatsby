import { Link } from "gatsby"
// import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
// import React from "react"
import React, { useState } from "react"

const Header = ({ siteTitle }) => {
  const [query, setQuery] = useState('');

  // function handleOnSearch({ currentTarget = {} }) {
  //   const { value } = currentTarget;

  //   setQuery(value);
  // }

  return (
  <nav className="p-6 text-black">
    <div className="flex container mx-auto items-center justify-between flex-wrap  pb-4 border-b-2" style={{borderColor: '#ee1f60'}}>
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

    {/* SEARCH BAR COMPONENT */}
    <div>
      <form>
        <input 
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link to={'/blog'} state={{ searchQuery: query }}>SEARCH</Link>
      </form>
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

////////////////////////////////////////////////////////////////////////////////

// const Header = ({ siteTitle }) => {
//   const [query, setQuery] = useState('');

//   const unsortedData = data.allStrapiArticle.edges;
//   const sortedData = unsortedData.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]);
//   const options = {
//     keys: [
//       'node.category.title',
//     ],
//     includeScore: true,
//   };

//   function handleOnSearch({ currentTarget = {} }) {
//     e.preventDefault();

//     const { value } = currentTarget;
//     setQuery(value);
//   }

//   return (
//   <nav className="p-6 text-black">
//     <div className="flex container mx-auto items-center justify-between flex-wrap  pb-4 border-b-2" style={{borderColor: '#ee1f60'}}>
//       <div className="flex items-center flex-shrink-0 mr-6">
//         <Link to="/" className="font-semibold text-2xl tracking-tight">
//           {siteTitle}
//         </Link>
//       </div>
//       <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
//         <div className="text-sm lg:flex-grow">
//           <Link to="/blog/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//             Blog
//           </Link>
//           <Link to="/magazine/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//             Magazine
//           </Link>
//           <Link to="/about/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//             About Us
//           </Link>
//           <Link to="/subscribe/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//             Subscribe
//           </Link>
//         </div>
//       </div>
//     </div>
//     {/* SEARCH COMPONENT */}
//     <div>
//       <form onSubmit={handleOnSearch}>
//         <input 
//           type="text"
//           placeholder="Tech, life science, people, ..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>
//     </div>
//   </nav>
//   )
// }

////////////////////////////////////////////////////////////////////////////////

// const Header = ({ siteTitle }) => {
//   const [query, setQuery] = useState('');

//   // function handleOnSearch({ currentTarget = {} }) {
//   //   const { value } = currentTarget;

//   //   setQuery(value);
//   // }

//   return (
//   <nav className="p-6 text-black">
//     <div className="flex container mx-auto items-center justify-between flex-wrap  pb-4 border-b-2" style={{borderColor: '#ee1f60'}}>
//       <div className="flex items-center flex-shrink-0 mr-6">
//         <Link to="/" className="font-semibold text-2xl tracking-tight">
//           {siteTitle}
//         </Link>
//       </div>
//       <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
//         <div className="text-sm lg:flex-grow">
//           <Link to="/blog/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//             Blog
//           </Link>
//           <Link to="/magazine/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//             Magazine
//           </Link>
//           <Link to="/about/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//             About Us
//           </Link>
//           <Link to="/subscribe/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//             Subscribe
//           </Link>
//         </div>
//       </div>
//     </div>

//     {/* SEARCH BAR COMPONENT */}
//     <div>
//       {/* <input 
//         type="text"
//         placeholder="Search"
//         value={query}
//         onChange={handleOnSearch}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <Link to={`/searchQuery=${query}`} state={{ query }}>SEARCH</Link> */}

//       <form
//         onSubmit={event => {
//           event.preventDefault()
//           // navigate(`/${query}`)
//           navigate(
//             '/blog',
//             {
//               state: { query }
//             }
//           )
//         }}
//       >
//         <input 
//           type="text"
//           placeholder="Search"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         {/* <button type="submit">SEARCH</button> */}
//         {/* <Link to={`/searchQuery=${query}`} state={{ query }}>SEARCH</Link> */}
//         <Link to={'/blog'} state={{ searchQuery: query }}>SEARCH</Link>
//       </form>
//     </div>
//   </nav>
//   )
// }

// ORIGINAL
// const Header = ({ siteTitle }) => (
//   <nav className="p-6 text-black">
//     <div className="flex container mx-auto items-center justify-between flex-wrap  pb-4 border-b-2" style={{borderColor: '#ee1f60'}}>
//       <div className="flex items-center flex-shrink-0 mr-6">
//         <Link to="/" className="font-semibold text-2xl tracking-tight">
//           {siteTitle}
//         </Link>
//       </div>
//       <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
//         <div className="text-sm lg:flex-grow">
//           <Link to="/blog/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//             Blog
//           </Link>
//           <Link to="/magazine/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//             Magazine
//           </Link>
//           <Link to="/about/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//             About Us
//           </Link>
//           <Link to="/subscribe/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//             Subscribe
//           </Link>
//         </div>
//       </div>
//     </div>
//   </nav>
// )

////////////////////////////////////////////////////////////////////////////////

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

////////////////////////////////////////////////////////////////////////////////

// export default Header
