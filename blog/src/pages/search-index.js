import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';
import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"
import SEO from "../components/seo"
import Fuse from "fuse.js"  // fuzzy search

const SearchPage = ({ data }) => {
    const [query, setQuery] = useState('');
    // const [input, setInput] = useState('');

    const unsortedData = data.allStrapiArticle.edges.reverse();
    const options = {
        keys: [
            'node.title',
            // 'node.author',
            // 'node.content',
        ],
        includeScore: true,
    };

    const fuse = new Fuse(unsortedData, options);


    // // WEIGHTED SEARCH
    // const optionsWeighted = {
    //     keys: [
    //         {
    //             name: 'node.title',
    //             weight: 0.6,
    //         },
    //         {
    //             name: 'node.author',
    //             weight: 0.1,
    //         },
    //         {
    //             name: 'node.content',
    //             weight: 0.3,
    //         },
    //     ],
    //     includeScore: true,
    // };
    // //
    
    // // PRE-GENERATED INDEX SEARCH
    // const optionsIndexed = {
    //     keys: [
    //         'node.title',
    //         // 'node.author',
    //         // 'node.content',
    //     ],
    //     includeScore: true,
    // }
    // const newIndex = Fuse.createIndex(optionsIndexed.keys, unsortedData);
    // const fuse = new Fuse(unsortedData, optionsIndexed, newIndex);
    // console.log(fuse)
    // //

    // // FUSE JS 
    // const fuse = new Fuse(unsortedData, {
    //     keys: [
    //         'node.title',
    //         // 'node.author',
    //         // 'node.content',
    //     ],
    //     includeScore: true,
    // });

    // const fuse = new Fuse(unsortedData, options);
    // //

    // console.log('fuse', fuse);
    // const results = fuse.search('science');
    const results = fuse.search(query);
    // console.log(results);

    // const searchResults = results.map(result => result.item)
    // const searchResults = query ? results.map(result => result.item) : unsortedData.reverse();
    const searchResults = query.length > 3 ? results.map(result => result.item) : unsortedData.slice(0, 5);
    // const searchResults = input ? results.map(result => result.item) : unsortedData.slice(0, 5);
    // console.log(searchResults);
    // console.log(query);

    // const sortedResults = results.sort((a, b) => a.score - b.score);
    // const sortedResults = searchResults.sort((a, b) => a.score - b.score);

    function handleOnSearch({ currentTarget = {} }) {
        const { value } = currentTarget;
        setQuery(value);
    }

    // function handleOnSubmit(e) {
    //     setInput(query)
    //     e.preventDefault();
    // }

    return (
        <Layout>
        <SEO title="Search index page" />

        <div>
            <form>
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={query} 
                    onChange={handleOnSearch} 
                />
            </form>
            {/* <form onSubmit={handleOnSubmit}>
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={query} 
                    onChange={handleOnSearch} 
                />
                <input type="submit" value="submit" />
            </form> */}
        </div>

        <ul>
            {searchResults.map(document => (
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
                <Reactmarkdown
                    // source={document.node.content}
                    source={`${document.node.content.slice(0,500)}...`}
                    transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                />
                </li>
            ))}
        </ul>
        </Layout>
    )
}

export default SearchPage;

// gql query
export const searchQuery = graphql`
  query SearchQuery {
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