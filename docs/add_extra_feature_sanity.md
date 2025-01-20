### Adding Features to Sanity Studio

1. **Install Plugins**: Sanity Studio has a variety of plugins that can add functionality. For example, to install the `@sanity/code-input` and `@sanity/block-content-to-react` plugins:

   ```bash
   pnpm install @sanity/code-input @sanity/block-content-to-react
   ```

2. **Customize Schemas**: You can customize your schemas to include additional fields or types. For example, to add a `publishedAt` field to your `post` schema:

   ```javascript
   // schemas/post.js
   export default {
     name: "post",
     type: "document",
     title: "Post",
     fields: [
       { name: "title", type: "string", title: "Title" },
       { name: "body", type: "array", title: "Body", of: [{ type: "block" }] },
       { name: "mainImage", type: "image", title: "Main Image" },
       { name: "publishedAt", type: "datetime", title: "Published At" },
     ],
   };
   ```

3. **Add Custom Input Components**: You can create custom input components for your fields. For example, to create a custom input component for the `title` field:

   ```javascript
   // components/CustomTitleInput.js
   import React from "react";

   const CustomTitleInput = React.forwardRef((props, ref) => (
     <input {...props} ref={ref} style={{ border: "2px solid red" }} />
   ));

   export default CustomTitleInput;
   ```

   Then, use it in your schema:

   ```javascript
   // schemas/post.js
   import CustomTitleInput from "../components/CustomTitleInput";

   export default {
     name: "post",
     type: "document",
     title: "Post",
     fields: [
       {
         name: "title",
         type: "string",
         title: "Title",
         inputComponent: CustomTitleInput,
       },
       { name: "body", type: "array", title: "Body", of: [{ type: "block" }] },
       { name: "mainImage", type: "image", title: "Main Image" },
       { name: "publishedAt", type: "datetime", title: "Published At" },
     ],
   };
   ```

### Adding Features to the `Posts` Component

1. **Display Published Date**: Modify the `Post` interface and fetch query to include the `publishedAt` field:

   ```typescript
   interface Post {
     _id: string;
     title: string;
     body: any; // Adjusted to handle block content
     mainImage?: {
       asset: {
         _ref: string;
       };
     };
     publishedAt?: string;
   }
   ```

   Update the fetch query:

   ```typescript
   const result = await sanityClient.fetch<Post[]>(`
     *[_type == "post"] {
       _id,
       title,
       body,
       mainImage,
       publishedAt
     }
   `);
   ```

2. **Render Published Date and Block Content**: Update the JSX to display the `publishedAt` field and render block content using `@sanity/block-content-to-react`:

   ```typescript
   import BlockContent from '@sanity/block-content-to-react';

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
                 className="rounded-lg mb-4 w-300 h-200"
               />
             )}
             <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
             {post.publishedAt && (
               <p className="text-gray-600 mb-4">Published on: {new Date(post.publishedAt).toLocaleDateString()}</p>
             )}
             <BlockContent blocks={post.body} />
           </article>
         ))}
       </div>
     </div>
   );
   ```

By following these steps, you can add extra features to both Sanity Studio and the `Posts` component in your application.
