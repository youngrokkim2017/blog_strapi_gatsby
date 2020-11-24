import React from "react"
import { Link, graphql } from "gatsby"
// import { graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"

const CategoryTemplate = ({ data }) => (
  <Layout>
    <div>
      {/* <Link to={`/Category_${data.strapiCategory.title}`}> */}
        <h3>{data.strapiCategory.title}</h3>
      {/* </Link> */}
    </div>
    <div>
        {/* {data.strapiCategory.article.map(a => <div>{a.title}</div>)} */}
        {/* {data.strapiCategory.article.map(a => <p><Link to={`/Article_${a.id}`}><div>{a.title}</div></Link><div>{a.content}</div></p>)} */}
        {/* {data.strapiCategory.article.map(a => <ul><li><Link to={`/Article_${a.id}`}><div>{a.title}</div></Link><div>{a.content}</div></li></ul>)} */}
        {data.strapiCategory.articles.map((a, idx) => {
            return (
                <ul key={idx}>
                    <li>
                        <Link to={`/Article_${a.id}`}>{a.title}</Link>
                        <div>{a.content}</div>
                    </li>
                </ul>
            )
        })}
    </div>
  </Layout>
)

export default CategoryTemplate;

export const query = graphql`
  query CategoryTemplate($id: String!) {
    strapiCategory(id: { eq: $id }) {
      title
      articles {
          id
          title
          author
          content
      }
    }
  }
`
