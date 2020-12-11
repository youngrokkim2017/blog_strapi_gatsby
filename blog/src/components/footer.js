import React from "react"
import { Link } from "gatsby"
import MailchimpComponent from './mailchimp'

const Footer = () => {
    return (
        <nav>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                {/* links to about, subscribe, etc */}
                <div className="text-md lg:flex-grow">
                    <h2>ABOUT US</h2>
                    <Link to="/">Staff</Link>
                    <Link to="/">Write for us</Link>
                    <Link to="/">Join our team</Link>
                </div>
                <div className="text-md lg:flex-grow">
                    <h2>CONTACT US</h2>
                </div>
                <div className="text-md lg:flex-grow">
                    <h2>WRITING RESOURCES</h2>
                </div>
            </div>
            <MailchimpComponent />
        </nav>
    )
}

export default Footer;