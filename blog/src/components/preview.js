import React from "react"
import { Link } from "gatsby"
import Img from 'gatsby-image';
import ReactMarkdown from "react-markdown"

const Preview = ({ article, format }) => {
    if (format === "small") {
        return (
            <div className="flex items-start">
                {
                    article.image
                        ?
                        <div className="mr-6 hidden">
                            {/* <Img fixed={article.image.childImageSharp.fixed} /> */}
                            <img src={article.image.publicURL} />
                        </div>
                        :
                        ""
                }
                <div>
                    <Link to={`/article/${article.title.split(" ").map((category) => category.toLowerCase()).join("-")}`}>
                        <h2 className="font-normal mb-2 text-base leading-tight">{article.title}</h2>
                    </Link>

                    <p className='text-base'>
                        <Link to={`/author/${article.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
                            {article.author.name}
                        </Link>
                    </p>
                </div>

            </div>

        )
    } else if (format === "medium") {
        return (
            <div className="flex items-start">
                {
                    article.image
                        ?
                        <div className="mr-6">
                            {/* <Img fixed={article.image.childImageSharp.fixed} /> */}
                            <img src={article.image.publicURL} />
                        </div>
                        :
                        ""
                }
                <div>
                    <Link to={`/article/${article.title.split(" ").map((category) => category.toLowerCase()).join("-")}`}>
                        <h2 className="font-normal mb-4 text-2xl leading-tight">{article.title}</h2>
                    </Link>
                    <ReactMarkdown
                        source={`${article.content.slice(0, 300)}...`}
                        transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                        className="mb-4"
                    />
                    <p className='mb-2 text-base'>
                        By <Link to={`/author/${article.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
                            {article.author.name}
                        </Link>
                    </p>
                </div>

            </div>

        )
    } else if (format === "large") {
        return (
            <>
                <div>
                    <h4>{article.title}</h4>
                </div>
            </>

        )
    }
}

// this.props.article.title
// this.props.article.author.name
// this.props.article.image

export default Preview

