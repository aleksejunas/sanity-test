// import { useEffect, useState } from "react";
// import { sanityClient, urlFor } from "../sanity";
import Posts from "../components/Posts";

const BlogPage = () => {
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-row justify-center">
        <h1 className="justify-center flex-col">Welcome to the blog</h1>
        <div className="flex-row justify-center">
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
