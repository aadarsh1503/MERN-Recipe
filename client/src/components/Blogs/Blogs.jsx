// BlogPage.js
import React from 'react';

const BlogPage = () => {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 text-gray-800 min-h-[78vh]">
      <div className="max-w-full sm:max-w-4xl lg:max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-center">Our Blog</h1>
        <div className="space-y-8">
          {/* Blog Post 1 */}
          <article className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">Blog Post Title 1</h2>
            <p className="text-lg mb-4">Published on: September 1, 2024</p>
            <p className="text-base mb-4">
              This is a summary of the blog post. It gives an overview of the content and entices the reader to read more. 
              You can write a brief introduction to the article and then provide a link to the full post.
            </p>
            <a href="/blog/post-1" className="text-red-500 hover:underline">Read more</a>
          </article>
          
          {/* Blog Post 2 */}
          <article className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-4">Blog Post Title 2</h2>
            <p className="text-lg mb-4">Published on: September 5, 2024</p>
            <p className="text-base mb-4">
              This is another summary of a blog post. Provide an engaging introduction and a link to the full article. 
              This section allows you to feature multiple posts with brief descriptions.
            </p>
            <a href="/blog/post-2" className="text-red-500 hover:underline">Read more</a>
          </article>

          {/* Add more blog posts here */}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
