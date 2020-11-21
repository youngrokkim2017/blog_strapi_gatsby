import React, { useState } from "react"
// import React, { useEffect, useState } from "react"
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

  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }

  return (
    <Layout>
      <article className="prose prose-sm sm:prose lg:prose-lg mx-auto antialiased leading-relaxed">
        <h2>{data.strapiArticle.title}</h2>
        <div className="meta text-black text-sm not-italic leading-5">
          <p className='my-0'>
            By <Link to={"#"}> {" "}
              {/* <Link to={`/authors/User_${data.strapiArticle.user.id}`}>
          {data.strapiArticle.user.username}
        </Link> */}
              {data.strapiArticle.author}
            </Link>
          </p>
          <p className='my-0'>
            {
              handleDate(data.strapiArticle.published_at) === handleDate(data.strapiArticle.updated_at)
                ?
                handleDate(data.strapiArticle.published_at)
                :
                (<><span className='mr-2'>{`Published ${handleDate(data.strapiArticle.published_at)}`}</span><span>{`Updated ${handleDate(data.strapiArticle.updated_at)}`}</span></>)
          }
          </p>
          <p className='my-0'>
            {/* Tags: */}
          {
              data.strapiArticle.category
                ?
                data.strapiArticle.category.map((c, idx) => <Link to={`/categories/Category_${c.id}`} key={idx}>{c.title}</Link>)
                :
                'N/A'
            }
          </p>
        </div>
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


        <h4>Comments</h4>
        <form onSubmit={handleSubmit} className="mt-6 bg-gray-100 border border-gray-300 text-gray-600 flex items-center rounded-lg py-2 px-4 pr-2 focus-within:border-blue-600">
          <input
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='appearance-none bg-transparent border-none w-full placeholder-gray-600 leading-tight focus:outline-none mr-4'
          />
          <button type="submit" className="inline-block text-lg px-4 py-2 leading-none rounded text-white bg-blue-600 shadow-lg flex-shrink-0">Submit</button>
        </form>


        {
          data.strapiArticle.comments
            ?
            <ul className='list-none'>
              {data.strapiArticle.comments.map((comment, idx) => {
                return (
                  <li key={idx}>
                    <div>
                      {comment.content}
                    </div>
                  </li>
                )
              })}
            </ul>
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
      published_at
      updated_at
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