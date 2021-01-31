import React from "react"
import { Link } from "gatsby"
// import Img from 'gatsby-image';
// import ReactMarkdown from "react-markdown"

const Preview = ({ article, format }) => {

    function handleDate(e) {
        var d = new Date(e);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return d.toLocaleDateString(undefined, options)
    }

    if (format === "small") {
        return (
            <div className="flex items-start space-x-4">
                <div className="flex-grow">
                    {/* <Link to={`/article/${article.title.split(/[\s!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`}> */}
                    <Link to={`/article/${article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((category) => category.toLowerCase()).join("-")}`}>

                        <h2 className="font-normal mb-2 text-base leading-tight">{article.title}</h2>
                    </Link>
                    <p className='text-sm'>
                        {article.author ?
                        <Link to={`/author/${article.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
                            {article.author.name}
                        </Link>
                        :
                        ""
                        }
                    </p>
                </div>
                {article.image ? <img src={article.image.publicURL} className="object-cover w-20 h-20" alt="" /> : ""}
            </div>

        )
    } else if (format === "medium") {
        return (
            <div className="flex items-start">
                {article.image
                    ?
                    <div className="mr-6">
                        <img src={article.image.publicURL} style={{ maxWidth: '210px' }} alt="" />
                    </div>
                    :
                    ""
                }
                <div>
                    {/* <Link to={`/article/${article.title.split(/[\s!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}> */}
                    <Link to={`/article/${article.title.split(/[\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_‘{|}~]+/).map((a) => a.toLowerCase()).join("-")}`}>
                        <h2 className="font-medium mb-2 text-2xl leading-tight">{article.title}</h2>
                    </Link>
                    {/* <ReactMarkdown
                        source={`${article.content.slice(0, 300)}...`}
                        transformImageUri={uri => uri.startsWith('http') ? uri : `${process.env.IMAGE_BASE_URL}${uri}`}
                        className="mb-4 break-words"
                    /> */}
                    <p className='mb-1 text-base'>
                        By <Link to={`/author/${article.author.name.split(" ").map((a) => a.toLowerCase()).join("-")}`} className="font-medium underline">
                            {article.author.name}
                        </Link>

                    </p>
                    <p>
                        {handleDate(article.published_at)}
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

