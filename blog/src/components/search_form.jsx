// import React from 'react';
// // import React, { useEffect, useState } from 'react';
// import { graphql } from "gatsby";

// class SearchForm extends React.Component {
//     constructor() {
//         this.state = {
//             search: ''
//         }

//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleSubmit(e) {
//         e.preventDefault();

//         const unsortedData = data.allStrapiArticle.edges;
//         const sortedData = unsortedData.sort((a, b) => b.node.id.split('_')[1] - a.node.id.split('_')[1]);

//         const options = {
//             keys: [
//                 'node.category.title'
//             ],
//             includeScore: true,
//         };

//         const fuse = new Fuse(unsortedData, options);
//         const results = fuse.search(this.state.search);
//     }

//     update() {
//         return e => this.setState({
//             [type]: e.currentTarget.value
//         });
//     }

//     render() {
//         const { query } = this.props;

//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <input 
//                     type="text"
//                     value={this.state.search}
//                     onChange={this.update('search')}
//                     placeholder="Tech, life science, people, ..."
//                 />      
//                 <button type="submit">Search</button>          
//             </form>
//         )
//     }
// }

// export default SearchForm;

// // function SearchForm() {
// //     const [query, setQuery] = useState('');

// //     function handleSearch(e) {
// //         e.preventDefault();
// //     }

// //     return (
// //         <form onSubmit={handleSearch}>
// //             <input
// //                 type="text"
// //                 name="search"
// //                 value={search}
// //                 onChange={(e) => setQuery(e.target.value)}
// //             />
// //             <button type="submit">Search</button>
// //         </form>
// //     )
// // }

// export const searchQuery = graphql`
//   query SearchQuery {
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
//             }
//           }
//           title
//           author
//           content
//           category {
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