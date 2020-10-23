import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const DonateSubscribePage = () => (
  <Layout>
    <SEO title="Donate and subscribe page" />
    <Link to="/">Go back to the homepage</Link>
    <br /> 
    <h1>GIVE TO THE BSR</h1>
    <p>
      The BSR is a student organization dedicated to providing all of our 
      content for free. Your gift allows us to keep bringing you an amazing 
      magazine, a cutting-edge blog, and a bevy of events that show us all how 
      amazing science is.
    </p>
    <p>
      Here is a list of projects that we are working on, that your contribution 
      will directly support. In addition, donations are essential to help us 
      cover publication fees. Feel free to make a suggestion for what you’d like 
      to see us do next!
    </p>
    <p>
      <ul>
        <li>Publish magazines twice a year!!</li>
        <li>Website redesign</li>
        <li>Science demonstrations at the Bay Area Science Festival and similar</li>
        <li>Writing and editing workshops for students and aspiring science writers</li>
        <li>Interactive web apps</li>
        <li>Improved web hosting for faster page loads</li>
        <li>Finishing our dissertations (if ever)</li>
      </ul>
    </p>
    <p>
      <a href="https://give.berkeley.edu/egiving/index.cfm?Fund=FU1210000">
        Click here to donate
      </a>
      <div>
        Donate any sum you want, big or small.  We appreciate it so, so much.
      </div>
    </p>
    <h2>Physical copies of the BSR</h2>
    <p>
      If you would like to receive a yearly subscription (two issues) of the 
      Berkeley Science Review in the mail, please donate a suggested minimum of 
      $15 (to offset shipping and printing costs) and&nbsp;
      <a href="mailto:sciencereview@gmail.com">send us an e-mail </a>
      with your mailing address. If you’d like more than one copy of a single 
      issue, e-mail us and we can work something out.
    </p>
    <p>If you’d like to use a check, please send to the following address, 
      made out to “Berkeley Science Review”:
    </p>
    <p>
      Berkeley Science Review, c/o LEAD Center, 432 Eshleman Hall, Berkeley, CA 94720-4500
    </p>
    <p>
      We are a subset of the&nbsp;
      <a href="http://www.asuc.org/">ASUC</a>
      , a registered 501(c)(3) non-profit organization.  Checks made out to the 
      BSR are tax-deductible.
    </p>
  </Layout>
)

export default DonateSubscribePage;
