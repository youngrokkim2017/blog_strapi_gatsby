import React from "react"
// import React, { useState } from "react"
// import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
// import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
// import RelatedArticles from '../components/relatedArticles';

const ArticleTemplate = ({ data }) => {
  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }
  
  // const { relatedArticles } = this.props.pathContext;
  // const { relatedArticles } = this.props.pageContext;

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
        <ReactMarkdown
          source={data.strapiArticle.content}
          transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
        />
        <div>
          <h2>SHARE</h2>
          <div>
            
          </div>
        </div>
      </article>

      {/* SIDEBAR */}
      {/* <div>
        {
          relatedArticles.length 
          ? 
          <RelatedArticles articles={relatedArticles} />
          :
          ""
        }
      </div> */}
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
    }
  }
`

// export const query = graphql`
//   query ArticleTemplate($id: String!) {
//     strapiArticle(id: { eq: $id }) {
//       id
//       title
//       content
//       published_at
//       created_at
//       image {
//         childImageSharp {
//           fluid(maxWidth: 500) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//       author {
//         id
//         name
//         twitterURL
//         about
//       }
//     }
//   }
// `