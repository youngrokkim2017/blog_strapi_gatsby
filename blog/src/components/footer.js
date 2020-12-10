import React from "react"
import { Link } from "gatsby"

const Footer = () => {
    return (
        <nav>
            <div>
                {/* links to about, subscribe, etc */}
                <div>
                    <h2>ABOUT US</h2>
                    <Link to="/">Staff</Link>
                    <Link to="/">Write for us</Link>
                    <Link to="/">Join our team</Link>
                </div>
                <div>
                    <h2>CONTACT US</h2>
                </div><div>
                    <h2>WRITING RESOURCES</h2>
                </div>
            </div>
        </nav>
    )
}

export default Footer;