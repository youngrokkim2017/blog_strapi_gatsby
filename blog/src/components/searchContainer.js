import React from "react"
// import React, { useState, useRef } from "react"
import { Link } from "gatsby"
import Img from 'gatsby-image';
import ReactMarkdown from "react-markdown"
import Fuse from "fuse.js"  // fuzzy search
import Highlight from 'react-highlighter';


const SearchContainer = ({query, articles, location}) => {
  ///////////////////////////// FUSE SEARCH ///////////////////////////////////
  // const unsortedData = data.allStrapiArticle.edges;
  let index = (location.state === null || !location.state) ? "" : location.state.searchQuery;

  const options = {
      keys: [
        {
            name: 'node.title',
            weight: 0.6,
        },
        {
            name: 'node.author',
            weight: 0.1,
        },
        {
            name: 'node.content',
            weight: 0.3,
        },
      ],
      includeScore: true,
      shouldSort: true,
      threshold: 0.3,  // default 0.6
  };
  const fuse = new Fuse(articles, options);
  const results = fuse.search(index, { limit: 10 });
  const searchResults = results.length > 0 ? results.map(result => result.item) : articles;

  const currentResults = fuse.search(query, { limit: 10 });
  const currentSearchResults = query.length > 3 ? currentResults.map(result => result.item) : articles;
  ///////////////////////////// FUSE SEARCH ///////////////////////////////////

  return (
  <div>
    { query.length > 3 ?
    <div>
      <ul>
        {currentSearchResults.map(document => (
          <li key={document.node.id}>
            <h2>
              <Link to={`/blog/${document.node.title.split(" ").join("-")}`} style={{ textDecoration: `none` }}>
                <Highlight search={query}>{document.node.title}</Highlight>
              </Link>
            </h2>
            <h4><Highlight search={query}>By{" "}{document.node.author}</Highlight></h4>
            {
              document.node.image
              ?
              <Img fixed={document.node.image.childImageSharp.fixed} />
              :
              ""
            }
            <ReactMarkdown
              source={<Highlight search={query}>{`${document.node.content.slice(0,500)}...`}</Highlight>}
              transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
            />
          </li>
        ))}
      </ul>
    </div>
    :
    <div>
      <ul>
        {searchResults.map(document => (
          <li key={document.node.id}>
            <h2>
              <Link to={`/blog/${document.node.title.split(" ").join("-")}`} style={{ textDecoration: `none` }}>
                <Highlight search={query}>{document.node.title}</Highlight>
              </Link>
            </h2>
            <h4><Highlight search={query}>By{" "}{document.node.author}</Highlight></h4>
            {
              document.node.image
              ?
              <Img fixed={document.node.image.childImageSharp.fixed} />
              :
              ""
            }
            <Highlight search={query}>
              <ReactMarkdown
                source={`${document.node.content.slice(0,500)}...`}
                transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
              />
            </Highlight>
          </li>
        ))}
      </ul>
    </div>
    }
  </div>
  )
}


export default SearchContainer;