import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      // background: `rebeccapurple`,
      background: `black`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        display: `flex`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <div
        style={{
          display: `flex`,
          color: `white`,
          marginTop: `15px`
        }}
      >
        {/* <h4 style={{padding:`0 10px 0 100px`}}>Blog</h4> */}
        <h4 style={{padding:`0 10px 0 25px`}}>
          <Link 
            to="/blog/"
            style={{
            color: `white`,
            textDecoration: `none`,
          }}
          >
            Blog
          </Link> 
        </h4>
        {/* <h4>Magazine</h4> */}
        <h4 style={{padding:`0 10px 0 0`}}>
          <Link 
            to="/magazine/"
            style={{
            color: `white`,
            textDecoration: `none`,
          }}
          >
            Magazine
          </Link> 
        </h4>
        <h4 style={{padding:`0 10px 0 0`}}>
          <Link 
            to="/about/"
            style={{
            color: `white`,
            textDecoration: `none`,
          }}
          >
            About Us
          </Link> 
        </h4>
        <h4>
          <Link 
            to="/subscribe/"
            style={{
            color: `white`,
            textDecoration: `none`,
          }}
          >
            Donate and Subscribe
          </Link> 
        </h4>
      </div>
    </div>
    {/* <div>
      <h4>Blog</h4>
      <h4>Magazine</h4>
    </div> */}
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
