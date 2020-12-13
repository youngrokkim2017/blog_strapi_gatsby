// import React, { useState } from "react"
import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';
import Layout from "../components/layout"
import SEO from "../components/seo"
// import ReactMarkdown from "react-markdown"
// import Fuse from "fuse.js"

const ArchivePage = ({ data }) => {
  // const [query, setQuery] = useState('');
  // const options = {
  //   keys: [
  //     {
  //       name: 'node.title',
  //       weight: 0.6,
  //     },
  //     {
  //       name: 'node.author',
  //       weight: 0.1,
  //     },
  //     {
  //       name: 'node.content',
  //       weight: 0.3,
  //     },
  //   ],
  //   includeScore: true,
  //   shouldSort: true,
  //   threshold: 0.3,  // default 0.6
  // };
  // const unsortedData = data.allStrapiArticle.edges; // or magazine issues
  const collection = [...data.allStrapiArticle.edges, ...data.allStrapiIssue.edges]
  // // const fuse = new Fuse(unsortedData, options);
  // const fuse = new Fuse(collection, options);
  // const results = fuse.search(query);
  // // const searchResults = query.length > 3 ? results.map(result => result.item) : unsortedData.slice(0, 5);
  // const searchResults = query.length >= 3 ? results.map(result => result.item) : collection.slice(0, 5);

  // function handleOnSearch({ currentTarget = {} }) {
  //   const { value } = currentTarget;
  //   setQuery(value);
  // }

  return (
    <Layout>
      <SEO title="Archive" />
      {/* <div>
        <form>
          <input 
            type="text" 
            placeholder="Search" 
            value={query} 
            onChange={handleOnSearch} 
          />
        </form>
      </div> */}
      <h2>Archive</h2>
      <div>
        <ul>
          {/* {searchResults.map(document => ( */}
          {collection.map(document => (
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
                    <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}>
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
      {/* <div>
        <ul>
          {data.allStrapiArticle.edges.map(document => (
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
                    <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}>
                      {document.node.title}
                    </Link>
                  </h2>
                  <h4>By{" "}{document.node.author}</h4>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {data.allStrapiIssue.edges.map(document => (
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
                    <Link to={`/blog/${document.node.id}`} style={{ textDecoration: `none` }}>
                      {document.node.title}
                    </Link>
                  </h2>
                  <h4>By{" "}{document.node.author}</h4>
              </div>
            </li>
          ))}
        </ul>
      </div> */}
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
    allStrapiIssue(
      sort: { fields: [created_at], order: DESC }
      limit: 10
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          author
          content
          image {
            childImageSharp {
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          tag {
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