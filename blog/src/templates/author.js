import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const AuthorTemplate = ({ data }) => (
    <Layout>
      <h1>{data.strapiAuthor.name}</h1>
      <ul>
        {data.strapiAuthor.articles.map(article => (
          <li key={article.id}>
            <h2>
              <Link to={`/Article_${article.id}`}>{article.title}</Link>
            </h2>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
  
export default AuthorTemplate;

export const query = graphql`
  query AuthorTemplate($id: String!) {
    strapiAuthor(id: { eq: $id }) {
      id
      name
      articles {
        id
        title
        content
      }
    }
  }
`

// const UserTemplate = ({ data }) => (
//     <Layout>
//       <h1>{data.strapiUser.username}</h1>
//       <ul>
//         {data.strapiUser.articles.map(article => (
//           <li key={article.id}>
//             <h2>
//               <Link to={`/Article_${article.id}`}>{article.title}</Link>
//             </h2>
//             <p>{article.content}</p>
//           </li>
//         ))}
//       </ul>
//     </Layout>
//   )
  
// export default UserTemplate;

// export const query = graphql`
//   query UserTemplate($id: String!) {
//     strapiUser(id: { eq: $id }) {
//       id
//       username
//       articles {
//         id
//         title
//         content
//       }
//     }
//   }
// `