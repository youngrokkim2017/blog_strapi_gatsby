import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About us page" />
    <Link to="/">Go back to the homepage</Link>
    <br /> 
    <h1>ABOUT THE BSR</h1>
    <p>The Berkeley Science Review is a graduate student-run magazine that aims 
      to highlight the groundbreaking research occurring at UC Berkeley in a 
      wide variety of scientific disciplines, from biology to physics to 
      computer science.
    </p>
    <p>
      Founded in 2001 by a dedicated group of hard-working graduate student 
      volunteers, the magazine’s aim has always been more than simply reporting 
      on the exciting research going on across our campus; we strive to ensure 
      that all of our articles are accessible to interested readers of any 
      background — the “intelligent non-specialist”, as we like to say.
    </p>
    <p>
      To that end, we train scientists and nonscientists alike to communicate 
      scientific research to the public in a clear, interesting, and informative 
      manner.
    </p>
    <p>
      Today, we continue to be a volunteer-run organization, drawing from 
      students and postdocs across campus who generously provide their skills 
      and expertise to produce this once-a-semester snapshot of some of the 
      exciting work happening in the labs here at UC Berkeley.
    </p>
    {/* <br/>
    <Link to='/contact-us'>Contact Us</Link>
    <br/>
    <Link to='/magazine-staff'>Magazine Staff</Link>
    <br/>
    <Link to='/blog-authors'>Blog Authors</Link>
    <br/> */}
  </Layout>
)

export default AboutPage;
