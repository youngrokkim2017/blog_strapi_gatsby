import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
// import Fuse from "fuse.js"  // fuzzy search

class ArticleTemplate extends React.Component {
  componentDidMount() {
    var sidebar = document.getElementById("sidebar");
    var element = document.getElementById('metadata');
    var bottomPos = element.getBoundingClientRect().bottom + window.scrollY;

    function myScrollFunc() {
      var y = window.scrollY;
      if (y >= bottomPos) {
        sidebar.classList.remove("opacity-0");
        sidebar.classList.add("opacity-1");
        sidebar.classList.add("transition", "duration-500", "ease-in-out");
      } else {
        sidebar.classList.add("opacity-0");
        sidebar.classList.remove("opacity-1");
        sidebar.classList.remove("transition", "duration-500", "ease-in-out");
      }
    }
    window.addEventListener("scroll", myScrollFunc);
  }
  
  render() {
    const { data } = this.props;
    
    function handleDate(e) {
      var d = new Date(e);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return d.toLocaleDateString(undefined, options)
    }

    function clipboard() {
      const clip = document.querySelector('.clipboard');
      navigator.clipboard.writeText(window.location.href);
      clip.classList.add('text-green-400');
    }

    return (
      <Layout>
        <div className="flex justify-between overflow-visible relative items-start">
          <div className='w-1/5 sticky top-0 pt-40 opacity-0' id="sidebar">
            <div className="text-base not-italic leading-5">
              <p className='mb-2 text-base'>
                By <Link to={"#"} className="font-medium underline">
                  {data.strapiArticle.author}
                </Link>
              </p>
              <p className='my-0'>
                Phillip Frankino is a graduate student in molecular and cell biology.
              </p>
            </div>
          </div>
          <div className="flex-none">
            <div className="prose md:prose-lg antialiased leading-relaxed mx-auto text-black mb-12">
              <p className='my-0 tracking-tight text-lg sans-serif flex items-center'>
      {/* Tags: */}
          {
            // data.strapiArticle.categories
            // ?
            // data.strapiArticle.categories.map((c, idx) => <Link to={`/categories/Category_${c.id}`} key={idx}>{c.title}</Link>)
            // :
            // ''
          }
          {/* <Link to={`/categories/Category_${data.strapiArticle.categories.id}`} key={data.strapiArticle.categories.id}>{data.strapiArticle.category.title}</Link> */}
          
                <span>Blog</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Life Sciences & Technology</span>
              </p>
              <h2 className="font-normal mt-2 mb-4 text-4xl leading-tight">{data.strapiArticle.title}</h2>
              <p className="text-lg mb-8">
                As biologists, most of our days are spent toiling in a tucked-away lab prying at core questions important to biology.
            </p>
              <div className="text-base not-italic leading-5 pb-12" id="metadata">
                <p className='mb-2 text-base'>
                  By <Link to={"#"} className="font-medium underline">
                    {data.strapiArticle.author}
                  </Link>
                </p>
                <p className='my-0'>
                  {handleDate(data.strapiArticle.published_at)}
                </p>
              </div>

              <div className="">
                {data.strapiArticle.image ?
                  // <Img fixed={data.strapiArticle.image.childImageSharp.fixed} className="featured-img-container mb-8" />
                  <Img fluid={data.strapiArticle.image.childImageSharp.fluid} className="featured-img-container mb-8" />
                :
                  ""
                }
              </div>

              <ReactMarkdown
                source={data.strapiArticle.content}
                transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
              />

              <div className='mt-12'>
                <div className="inline-flex items-center space-x-8">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&t=${data.strapiArticle.title}`} className="flex items-center space-x-2 no-underline">
                    <svg width="20" height="20" viewBox="0 0 16 16">
                      <path d="M15.117 0H.883A.883.883 0 0 0 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.461V7.389h2.085V5.61c0-2.067 1.262-3.192 3.106-3.192.883 0 1.642.065 1.863.095v2.16h-1.279c-1.002 0-1.196.476-1.196 1.176v1.541h2.39l-.31 2.415h-2.08V16h4.077a.883.883 0 0 0 .883-.883V.883A.883.883 0 0 0 15.117 0"></path>
                    </svg>
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${data.strapiArticle.title}`} className="flex items-center space-x-2 no-underline">
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a href={`mailto:?subject=${data.strapiArticle.title}&body=${window.location.href}`} className="flex items-center space-x-2 no-underline">
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                  <button onClick={clipboard} className="clipboard flex items-center space-x-2 no-underline cursor-pointer active:text-green-400 transition duration-200 ease-in-out">
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='w-1/5'>
            <div className="sticky">
            <h2 className='text-2xl font-semibold m-0 border-b border-black'>
              Related Articles
            </h2>
            </div>
          </div>
        </div>
        <hr className="border-black mt-16" />
        <div className='mt-4 border-black'>
          <h2 className='text-3xl font-semibold m-0'>
            Most Popular
            </h2>
          {/* GOOGLE ANALYTICS gatsby-plugin-google-analytics */}
        </div>
      </Layout >
    )
  }
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
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      categories {
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
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          title
          author
          content
          categories {
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
//       author
//       published_at
//       updated_at
//       content
//       image {
//         childImageSharp {
//           fluid(maxWidth: 500) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//       categories {
//         id
//         title
//       }
//     }
//     allStrapiArticle {
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
//         }
//       }
//     }
//   }
// `