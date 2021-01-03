import React from "react";
import Layout from "../components/layout"
import { graphql } from "gatsby"
// import { Link, graphql } from "gatsby"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <div className="bg-red-300">HOME PAGE</div>
    </Layout>
  )
}
  
export default IndexPage;

// gql query
export const splashQuery = graphql`
  query SplashQuery {
    allStrapiArticle(
      limit: 5
      sort: { order: DESC, fields: published_at }
    ) {
      edges {
        node {
          id
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          title
          content
          categories {
            id
            title
          }
          published_at
          updated_at
        }
      }
    }
  }
`

// export const splashQuery = graphql`
//   query SplashQuery {
//     allStrapiArticle(
//       limit: 5
//       sort: { order: DESC, fields: published_at }
//     ) {
//       edges {
//         node {
//           id
//           image {
//             childImageSharp {
//               fixed(width: 200, height: 125) {
//                 ...GatsbyImageSharpFixed
//               }
//               fluid(maxWidth: 1000) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//           title
//           author
//           content
//           categories {
//             id
//             title
//           }
//           published_at
//           updated_at
//         }
//       }
//     }
//   }
// `

// import React, { useState } from "react";
// import { Router } from '@reach/router';
// import { Router, Link } from '@reach/router';
// import { Link, navigate } from "gatsby";
// import logo from "../images/logo.png";
// const Contact = React.lazy(() => import('../components/Contact'));
// const About = React.lazy(() => import('../components/About'));

// const LazyComponent = ({ Component, ...props }) => (
//   <React.Suspense fallback={'<p>Loading...</p>'}>
//     <Component {...props} />
//   </React.Suspense>
// );

// const Home = () => <h2>Hello and Welcome</h2>;

// const IndexPage = () => {
//   const [query, setQuery] = useState('');

//   function handleNavigate(e) {
//     e.preventDefault()

//     navigate(
//       "/search/",
//       {
//         state: { searchQuery: query },
//       }
//     )
//   }
//   return (
//     <div>
//       <nav className="p-4 text-black mb-12 border-b" style={{ borderColor: '#c8c8c8' }}>
//         <div className="flex container mx-auto items-center justify-between flex-wrap">
//           <div className="flex items-center flex-shrink-0 mr-6">
//             <Link to="/" className="font-semibold text-2xl tracking-tight">
//               <img src={logo} alt="Logo" className="h-10 sm:h-8"/>
//             </Link>
//           </div>
//           <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
//             <div className="text-sm lg:flex-grow">
//               <Link to="/blog/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//                 Blog
//             </Link>
//               <Link to="/magazine/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//                 Magazine
//             </Link>
//               <Link to="/about/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//                 About Us
//             </Link>
//               <Link to="/subscribe/" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
//                 Subscribe
//             </Link>
//             </div>
//             <div>
//               <form
//                 onSubmit={handleNavigate}
//               >
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                 />
//                 <button type="submit">SEARCH</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <Router>
//         <Home path="/" />
//         {/* <LazyComponent Component={Contact} path="contact" /> */}
//         {/* <LazyComponent Component={About} path="about-us" /> */}
//       </Router>
//     </div>
//   )
// }

// export default IndexPage;
