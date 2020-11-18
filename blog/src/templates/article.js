import React from "react"
import { Link, graphql } from "gatsby"
// import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"

// import FormContainer from '../components/form_container';
import CreateForm from '../components/create_form';

const ArticleTemplate = ({ data }) => (
  <Layout>
    <article className="prose prose-sm sm:prose lg:prose-lg mx-auto antialiased text-gray-900">
      <h2>{data.strapiArticle.title}</h2>
      <p>
        By{" "}
        {/* <Link to={`/authors/User_${data.strapiArticle.user.id}`}>
        {data.strapiArticle.user.username}
      </Link> */}
        {data.strapiArticle.author}
      </p>
      <p>
        Tags:
      {
          data.strapiArticle.category
            ?
            // data.strapiArticle.category.map(c => <span>{c.title}</span>)
            data.strapiArticle.category.map((c, idx) => <Link to={`/categories/Category_${c.id}`} key={idx}>{c.title}</Link>)
            // data.strapiArticle.category.map(c => <Link to={`/Category_${c.id}`}>{c.title}</Link>)
            :
            'N/A'
        }
      </p>
      {
        data.strapiArticle.image
          ?
          <Img fluid={data.strapiArticle.image.childImageSharp.fluid} />
          :
          ""
      }
      <Reactmarkdown
        source={data.strapiArticle.content}
        transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
      />

      
      {/* <FormContainer /> */}
      <CreateForm />
      {/* {
        data.strapiArticle.comment
        ?
        data.strapiArticle.comment.map((com, idx) => (
          <div>
            {com.content}
          </div>
        ))
        :
        ""
      } */}
    </article>

  </Layout>

)

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      id
      title
      author
      content
      image {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      category {
        id
        title
      }
    }
  }
`

// export const query = graphql`
//   query ArticleTemplate($id: String!) {
//     strapiArticle(id: { eq: $id }) {
//       title
//       author
//       content
//       image {
//         childImageSharp {
//           fluid(maxWidth: 500) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//       user {
//         id
//         username
//       }
//     }
//   }
// `