import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';
import Layout from "../components/layout"
import SEO from "../components/seo"
// import ReactMarkdown from "react-markdown"

const ArchivePage = ({ data, pageContext }) => {
  const [articles, setArticles] = useState(data.allStrapiArticle.edges);

  function handleFilter({ currentTarget = {} }) {
    const { value } = currentTarget;

    if (value === "magazine") {
      setArticles(data.allStrapiArticle.edges.filter((document) => document.magazine !== null));
    }

    if (value === "blog") {
      setArticles(data.allStrapiArticle.edges.filter((document) => document.magazine === null));
    }
    
    if (value === "none") {
      setArticles(data.allStrapiArticle.edges);
    }
  }

  return (
    <Layout>
      <SEO title="Archive" />
      <h2>Archive</h2>
      <div>
        <form>
          <input 
            type="button"
            value="blog"
            onClick={handleFilter}
          >
            Blog
          </input>
          <input 
            type="button"
            value="magazine"
            onClick={handleFilter}
          >
            Magazine
          </input>
          <input 
            type="button"
            value="none"
            onClick={handleFilter}
          >
            None
          </input>
        </form>
      </div>
      <div>
        <ul>
          {articles.map(document => (
            <li key={document.node.id} className="flex mb-12 max-w-full border-t pt-8">
                <div className="mr-4">
                  {
                    document.node.image
                      ?
                      <Img fixed={document.node.image.childImageSharp.fixed} />
                      :
                      ""
                  }
                </div>
                <div className="antialiased leading-relaxed sans-serif">
                  <h2>
                    <Link to={`/blog/${document.node.title.split(" ").join("-")}`} style={{ textDecoration: `none` }}>
                      {document.node.title}
                    </Link>
                  </h2>
                  <h4>By{" "}{document.node.author}</h4>
                  {/* <ReactMarkdown
                    source={`${document.node.content.slice(0, 500)}...`}
                    transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                  /> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default ArchivePage;

// gql query
export const archiveQuery = graphql`
  query ArchiveQuery($skip: Int! = 0) {
    allStrapiArticle(
      sort: { fields: [created_at], order: DESC }
      limit: 10
      skip: $skip
    ) {
      totalCount
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
          created_at
          published_at
          updated_at
        }
      }
    }
  }
`