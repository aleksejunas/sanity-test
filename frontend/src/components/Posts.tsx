// []  TODO: Style the Posts component
// []  TODO: Add extra features to sanity studio
// []  TODO: Add extra features to the component
// []    TODO: Add 'block-content-to-react' plugin
// []    TODO: Add 'Code Input' plugin | https://www.sanity.io/plugins/code-input
// []    TODO: Add 'Markdown Input' plugin

import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../sanity";

interface Post {
  _id: string;
  title: string;
  body: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
  };
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await sanityClient.fetch<Post[]>(`
          *[_type == "post"] {
            _id,
            title,
            body,
            mainImage
          }
        `);
        setPosts(result);
      } catch (err) {
        setError("Failed to fetch posts");
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!posts.length) return <div>No posts found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-orange-400">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post._id} className="bg-white rounded-lg shadow-md p-6">
            {post.mainImage && (
              <img
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                className=" rounded-lg mb-4 w-300 h-200"
              />
            )}
            <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
