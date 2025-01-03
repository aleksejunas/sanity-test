import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../sanity";

interface BlogPagePosts {
  _id: string;
  title: string;
  mainImage: string;
  body: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPagePosts[]>([]);

  useEffect(() => {
    sanityClient.fetch(`*[type == "post"]`).then((result) => {
      setPosts(result);
    });
  }, []);
  // ))

  return (
    <div>
      <h1>Blog Page</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).width(400).url()}
              alt={post.title}
            />
          )}
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
