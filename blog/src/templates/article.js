import React from "react"
// import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
// import Fuse from "fuse.js"  // fuzzy search

const ArticleTemplate = ({ data }) => {
  function handleDate(e) {
    var d = new Date(e);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString(undefined, options)
  }
  
  function collapseSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove("block");
    sidebar.classList.add('transition', 'transition-all', 'duration-200', 'ease-in-out', 'opacity-0');
    // sidebar.classList.add('hidden')

    // const content = document.querySelector('.content');
    // content.classList.add('justify-center');
    
  }



  // const unsortedData = data.allStrapiArticle.edges;
  // // const query = data.strapiArticle.category.title;

  // const options = {
  //     keys: [
  //         'node.category.title',
  //     ],
  //     includeScore: true,
  // };
  // const fuse = new Fuse(unsortedData, options);
  // // const results = fuse.search(query);
  // const results = fuse.search(data.strapiArticle.category.title);
  // const searchResults = results.map(result => result.item);

  // const relatedArticles = data.allStrapiArticle.edges.filter((document) => document.node.category.title === data.strapiArticle.category.title).slice(0,3);
  // const relatedArticles = data.allStrapiArticle.edges
  //   .filter((article) => article.node.category.title === data.strapiArticle.category.title)
  //   .slice(0, 3)

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="prose md:prose-xl antialiased leading-relaxed max-w-full text-black mb-8">
          <p className='my-0 font-bold tracking-tight sans-serif text-md uppercase'>
            {/* Tags: */}
            {
              // data.strapiArticle.category
              // ?
              // data.strapiArticle.category.map((c, idx) => <Link to={`/categories/Category_${c.id}`} key={idx}>{c.title}</Link>)
              // :
              // ''
            }
            {/* <Link to={`/categories/Category_${data.strapiArticle.category.id}`} key={data.strapiArticle.category.id}>{data.strapiArticle.category.title}</Link> */}
            <span>Blog / </span><span style={{ color: '#EE1F60' }}>Life Sciences & Technology</span>
          </p>
          <h2 className="font-normal my-2">{data.strapiArticle.title}</h2>
          <p className="text-lg">
            As biologists, most of our days are spent toiling in a tucked-away lab prying at core questions important to biology.
          </p>
          <div className="text-base not-italic leading-5">
            <p className='mb-2 text-base'>
              By <Link to={"#"} className="font-medium underline">
                {data.strapiArticle.author}
              </Link>
            </p>
            <p className='my-0'>
              {`Published ${handleDate(data.strapiArticle.published_at)}`}
            </p>
          </div>
        </div>

        <div className='content flex-wrap lg:flex lg:space-x-4'>
          <article className="prose prose-sm sm:prose lg:prose-lg antialiased leading-relaxed pb-20">
            {
              data.strapiArticle.image
                ?
                <Img fluid={data.strapiArticle.image.childImageSharp.fluid} className="featured-img-container" />
                :
                ""
            }
            <ReactMarkdown
              source={data.strapiArticle.content}
              transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
            />
            <div className='pt-6'>
              {/* <hr /> */}
              <div className="flex items-center space-x-8 mx-auto">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&t=${data.strapiArticle.title}`} className="flex items-center space-x-2 no-underline">
                  <svg width="20" height="20" viewBox="0 0 16 16">
                    <path d="M15.117 0H.883A.883.883 0 0 0 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.461V7.389h2.085V5.61c0-2.067 1.262-3.192 3.106-3.192.883 0 1.642.065 1.863.095v2.16h-1.279c-1.002 0-1.196.476-1.196 1.176v1.541h2.39l-.31 2.415h-2.08V16h4.077a.883.883 0 0 0 .883-.883V.883A.883.883 0 0 0 15.117 0"></path>
                  </svg>
                  {/* <span>Facebook</span> */}
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${data.strapiArticle.title}`} className="flex items-center space-x-2 no-underline">
                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                  {/* <span>Twitter</span> */}
                </a>
                <a href={`mailto:?subject=${data.strapiArticle.title}&body=${window.location.href}`} className="flex items-center space-x-2 no-underline">
                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {/* <span>Email</span> */}
                </a>
                {/* <a href={`mailto:?subject=${data.strapiArticle.title}&body=${window.location.href}`} className="flex items-center space-x-2 no-underline">
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              COPY TO CLIPBOARD
            </a> */}
              </div>
            </div>
          </article>


          {/* RELATED ARTICLES */}
          <div className='flex-grow sticky top-0 block sidebar'>
            <div className='my-0 font-bold tracking-tight sans-serif text-lg uppercase border-b pb-2 flex items-center' style={{ borderColor: '#888888' }}>
              <h2 className="flex-grow">Related Articles</h2>
              <button onClick={collapseSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/*<ul> */}
            {/* {relatedArticles.map(document => ( */}
            {/* {data.allStrapiArticle.edges */}
            {/* {data.allStrapiArticle.edges.reverse().slice(0, 3).map(document => (
            // .filter((article) => article.node.category.title === data.strapiArticle.category.title)
            // .slice(0, 3)
            // .map(document => (
            <li key={document.node.id}>
              <h2>
                <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}>
                  {document.node.title}
                </Link>
              </h2>
              <h4>By{" "}{document.node.author}</h4>
              {
                document.node.image
                  ?
                  <Img fixed={document.node.image.childImageSharp.fixed} />
                  :
                  ""
              }
            </li>
          ))} */}
            {/* </ul> */}
          </div>
        </div>
      </div>
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
    allStrapiArticle {
      edges {
        node {
          id
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          title
          author
          content
          category {
            id
            title
          }
        }
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