// []  TODO: Style the Posts component
// []  TODO: Add extra features to sanity studio
// []  TODO: Add extra features to the component
// [x]    TODO: Add 'block-content-to-react' plugin
// []    TODO: Add 'Code Input' plugin | https://www.sanity.io/plugins/code-input
// []    TODO: Add 'Markdown Input' plugin
// [x] TODO: Fix the issue when new blog posts fail in the <p> element
// [x] TODO: Have 1 main blog post to the right, and a recent blog posts with 5 blog posts in a smaller format to the left and scrollable
// [] TODO: Implement Navbar like Mark Manson
// [] TODO: When choosing a blog post, change the page with ):( so the blog post is the only  thing on the page (or in a modal?)
// /x/ TODO: Remove the horizontal orange line in the blog post
// [] TODO: Enable the search bar in the Navbar for the blog posts
// [] TODO: Add darkmode/lightmode to the entire site
// [] TODO: Add a topic to the blog posts so they can be filtered
// [] TODO: Add universial design to the site

import { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../sanity";
import BlockContent from "@sanity/block-content-to-react";
import { BlockContentProps } from "@sanity/block-content-to-react";
import { useNavigate } from "react-router-dom";

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

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const navigate = useNavigate();
  const [isLandscape, setIsLandscape] = useState(false);

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
        setSelectedPost(result[0]);
      } catch (err) {
        setError("Failed to fetch posts");
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedPost && selectedPost.mainImage) {
      const img = new Image();
      img.src = urlFor(selectedPost.mainImage).url();
      img.onload = () => {
        setIsLandscape(img.width > img.height);
      };
    }
  }, [selectedPost]);

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!posts.length) return <div>No posts found</div>;

  const recentPosts = posts.slice(1, 11);

  return (
    <div className="w-11/12 h-[calc(100vh - 80px)] mx-auto my-4 px-6 py-6 bg-[#2C2B2B] border border-amber-400 rounded-xl shadow-xl flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 md:pr-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">Recent Posts</h2>
        <div className="grid gap-4">
          {recentPosts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer flex flex-col h-auto transition-transform transform hover:scale-105"
              onClick={() => setSelectedPost(post)}
            >
              {post.mainImage && (
                <div>
                  <img
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    className="rounded-lg mb-2 w-full h-64 object-cover"
                  />
                </div>
              )}
              <h1 className="text-black text-xl my-2">{post.title}</h1>
              <div className="text-black flex-grow">
                <BlockContent blocks={post.body} />
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="w-full md:w-2/3 pl-4 mt-8 md:mt-0 max-h-[calc(100vh-16px)] overflow-y-auto">
        {selectedPost && (
          <>
            <h1 className="text-3xl font-bold mb-8 text-white">
              Main Blog Post
            </h1>
            <article
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-transform transform hover:scale-105 ${
                isLandscape ? "flex flex-col space-y-6" : "flex flex-row gap-6"
              } items-start`}
              onClick={() => navigate(`/post/${selectedPost._id}`)}
            >
              {selectedPost.mainImage && (
                <img
                  src={urlFor(selectedPost.mainImage).url()}
                  alt={selectedPost.title}
                  className={`rounded-lg ${
                    isLandscape ? "w-full max-h-[400px]" : "w-1/2"
                  } object-cover`}
                />
              )}
              <div
                className={`flex flex-col ${isLandscape ? "w-full" : "w-1/2"}`}
              >
                <h2 className="text-2xl font-semibold mb-4 text-black">
                  {selectedPost.title}
                </h2>
                <div className="text-black prose prose-lg max-w-none">
                  <BlockContent blocks={selectedPost.body} />
                </div>
              </div>
            </article>
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;

// import { useEffect, useState } from "react";
// import { sanityClient, urlFor } from "../sanity";
// import BlockContent from "@sanity/block-content-to-react";
// import { BlockContentProps } from "@sanity/block-content-to-react";
// import { useNavigate } from "react-router-dom";
//
// interface Post {
//   _id: string;
//   title: string;
//   body: BlockContentProps["blocks"];
//   mainImage?: {
//     asset: {
//       _ref: string;
//     };
//   };
// }
//
// const Posts = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedPost, setSelectedPost] = useState<Post | null>(null);
//   const navigate = useNavigate();
//   const [isLandscape, setIsLandscape] = useState(false);
//
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const result = await sanityClient.fetch<Post[]>(`
//           *[_type == "post"] {
//             _id,
//             title,
//             body,
//             mainImage
//           }
//         `);
//         setPosts(result);
//         setSelectedPost(result[0]);
//       } catch (err) {
//         setError("Failed to fetch posts");
//         console.error("Error fetching posts:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//
//     fetchPosts();
//   }, []);
//
//   useEffect(() => {
//     if (selectedPost && selectedPost.mainImage) {
//       const img = new Image();
//       img.src = urlFor(selectedPost.mainImage).url();
//       img.onload = () => {
//         setIsLandscape(img.width > img.height);
//       };
//     }
//   }, [selectedPost]);
//
//   if (isLoading) return <div>Loading posts...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!posts.length) return <div>No posts found</div>;
//
//   const recentPosts = posts.slice(1, 11);
//
//   return (
//     <div className="w-5/6 h-screen mx-auto px-4 py-8 bg-[#2C2B2B] border border-amber-400 rounded flex flex-col md:flex-row">
//       <div className="w-full md:w-1/3 pr-4 overflow-y-auto h-200">
//         <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
//         <div className="grid gap-4">
//           {recentPosts.map((post) => (
//             <article
//               key={post._id}
//               className="bg-white rounded-lg shadow-md p-4 cursor-pointer flex flex-col h-auto"
//               onClick={() => setSelectedPost(post)}
//             >
//               {post.mainImage && (
//                 <div>
//                   <img
//                     src={urlFor(post.mainImage).url()}
//                     alt={post.title}
//                     className="rounded-lg mb-2 w-full h-64 object-cover"
//                   />
//                 </div>
//               )}
//               <h1 className="text-black text-xl my-2">{post.title}</h1>
//               <div className="text-black flex-grow">
//                 <BlockContent blocks={post.body} />
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//       <div className="w-full md:w-2/3 pl-4 mt-8 md:mt-0 max-h-[calc(100vh-16px)] overflow-y-auto">
//         {selectedPost && (
//           <>
//             <h1 className="text-3xl font-bold mb-8">Main Blog Post</h1>
//             <article
//               className={`bg-white rounded-lg shadow-md p-6 cursor-pointer ${
//                 isLandscape ? "flex flex-col space-y-6" : "flex flex-row gap-6"
//               } items-start`}
//               onClick={() => navigate(`/post/${selectedPost._id}`)}
//             >
//               {selectedPost.mainImage && (
//                 <img
//                   src={urlFor(selectedPost.mainImage).url()}
//                   alt={selectedPost.title}
//                   className={`rounded-lg ${
//                     isLandscape ? "w-full max-h-[400px]" : "w-1/2"
//                   } object-cover`}
//                 />
//               )}
//               <div
//                 className={`flex flex-col ${isLandscape ? "w-full" : "w-1/2"}`}
//               >
//                 <h2 className="text-2xl font-semibold mb-4 text-black">
//                   {selectedPost.title}
//                 </h2>
//                 <div className="text-black prose prose-lg max-w-none">
//                   <BlockContent blocks={selectedPost.body} />
//                 </div>
//               </div>
//             </article>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
//
// export default Posts;
