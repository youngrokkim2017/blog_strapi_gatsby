import React from "react"
// import { graphql } from "gatsby"
import { Link, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"
import ReactMarkdown from "react-markdown"
// import Preview from "../components/preview"

const CategoryTemplate = ({ data }) => {
  console.log(data.strapiCategory)
  return (
  <Layout>
    <div className="">
      <h2 className="font-normal mb-12 text-4xl leading-tight">{data.strapiCategory.title}</h2>
    <ul>
      {/* {data.strapiCategory.articles.reverse().slice(0, 10).map(document => ( */}
      {data.strapiCategory.articles.sort((a, b) => b.published_at - a.published_at).slice(0, 10).map(document => (
        // <li key={document.id} className="mb-4">
        //   <Preview article={document} format="medium" />
        // </li>
      <li key={document.id} className="mb-4">
        <div className="flex items-start">
          {/* {
            document.image
              ?
              <div className="mr-6">
                <img src={document.image.publicURL} />
              </div>
              :
              ""
          } */}
          <div>
            <Link to={`/article/${document.title.split(" ").map((category) => category.toLowerCase()).join("-")}`}>
              <h2 className="font-normal mb-4 text-2xl leading-tight">{document.title}</h2>
            </Link>
            <ReactMarkdown
              source={`${document.content.slice(0, 300)}...`}
              transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
              className="mb-4"
            />
            {data.allStrapiAuthors.edges.map(author => (
              <p className='mb-2 text-base' key={author.node.id}>
                {+author.node.id.split("_")[1] === document.author ?
                  <Link 
                    className="font-medium underline"
                    to={`/author/${author.node.name.split(" ").map((a) => a.toLowerCase()).join("-")}`}
                  >
                    By {author.node.name}
                  </Link>
                  :
                  ""
                }
              </p>
            ))}
          </div>
          

          
        </div>
      </li>
      ))}
    </ul>
    </div>
  </Layout>
  )
}

export default CategoryTemplate;

export const query = graphql`
  query CategoryTemplate($id: String!) {
    strapiCategory(id: { eq: $id }) {
      id
      title
      articles {
        id
        title
        author
        content
        magazine
        image {
          publicURL
        }
        published_at
      }
    }
    allStrapiAuthors {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`