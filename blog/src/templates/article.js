import React, { useState } from "react"
import { Link, graphql } from "gatsby"
// import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"
import axios from 'axios';

// import CreateForm from '../components/create_form';

const ArticleTemplate = ({ data }) => {
  const [content, setContent] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // fetch('http://localhost:1337/posts', {
    //     method: 'POST',
    //     body: JSON.stringify({ title }),
    // });

    axios.post('http://localhost:1337/comments', {
      article: data.strapiArticle.id.split('_')[1],
      title: data.strapiArticle.title,
      content: content,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

    // window.location.reload(false);
    setContent('');
    }

    // console.log(data.strapiArticle.id)
  return (
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
            data.strapiArticle.category.map((c, idx) => <Link to={`/categories/Category_${c.id}`} key={idx}>{c.title}</Link>)
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

      
      {/* <CreateForm /> */}

      <form onSubmit={handleSubmit}>
        <input 
          type="hidden"
          name="article"
          value={data.strapiArticle.id}
        />
        <input 
          type="hidden"
          name="title"
          value={data.strapiArticle.title}
        />
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {
        data.strapiArticle.comments
        ?
        data.strapiArticle.comments.map((comment, idx) => (
          <div>
            {comment.content}
          </div>
        ))
        :
        ""
      }
    </article>

  </Layout>
  )
}

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
      comments {
        id
        title
        content
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