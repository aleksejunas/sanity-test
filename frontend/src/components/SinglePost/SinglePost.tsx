import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sanityClient, urlFor } from "../../sanity";
import BlockContent from "@sanity/block-content-to-react";
import { BlockContentProps } from "@sanity/block-content-to-react";

interface Post {
  _id: string;
  title: string;
  body: BlockContentProps["blocks"];
  mainImage?: {
    asset: {
      _ref: string;
    };
  };
}

const SinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await sanityClient.fetch<Post>(
          `
          *[_type == "post" && _id == $id][0] {
            _id,
            title,
            body,
            mainImage
          }
        `,
          { id },
        );
        setPost(result);
      } catch (err) {
        setError("Failed to fetch post");
        console.error("Error fetching post:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="w-11/12 h-[calc(100vh - 80px)] mx-auto my-4 px-6 py-6 bg-[#2C2B2B] border border-orange-400 rounded-xl shadow-xl flex flex-col">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 p-2 m-2 rounded border border-white font-semibold bg-white text-black hover:border hover:border-orange-400 hover:text-orange-400 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Recent Posts
      </button>

      <div className="bg-[#2C2B2B] rounded border border-orange-400 m-2 p-4 overflow-auto flex flex-col">
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            className="rounded-lg mb-4 w-full object-cover"
          />
        )}
        <h1 className="text-white text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-white">
          <BlockContent blocks={post.body} />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
