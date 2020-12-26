import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Contact = () => (
    <Layout>
        <SEO title="Contact Us" />
        <h2 className="font-normal text-4xl leading-tight mb-8 text-center">Contact us</h2>
        <div className="w-1/3 mx-auto">
            <form action="#" method="post" className="sans-serif">
                <div className="required mb-8">
                    <label for="name" className="block text-sm font-medium">Name</label>
                    <input type="text" name="name" className="mt-1 border-black text-black placeholder-gray-600 block w-full border py-2 px-3 focus-within:border-blue-600 focus:outline-none" required />
                </div>
                <div className="required mb-8">
                    <label for="email" className="block text-sm font-medium">Email</label>
                    <input type="email" name="email" className="mt-1 border-black text-black placeholder-gray-600 block w-full border py-2 px-3 focus-within:border-blue-600 focus:outline-none" placeholder="you@example.com" required />
                </div>
                <div className="mb-8">
                    <label for="subject" className="block text-sm font-medium">Subject</label>
                    <input type="text" name="subject" className="mt-1 border-black text-black placeholder-gray-600 block w-full border py-2 px-3 focus-within:border-blue-600 focus:outline-none" />
                </div>
                <div className="required mb-12">
                    <label for="message" className="block text-sm font-medium">Message</label>
                    <div class="mt-1">
                        <textarea id="message" name="message" rows="4" class="mt-1 border-black text-black placeholder-gray-600 block w-full border py-2 px-3 focus-within:border-blue-600 focus:outline-none" required></textarea>
                    </div>
                </div>
                <input type="submit" className="inline-block px-4 py-2 leading-none text-white bg-black flex-shrink-0 cursor-pointer" value="Submit" />
            </form>
        </div>
    </Layout>
)

export default Contact
