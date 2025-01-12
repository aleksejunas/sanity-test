/*
 *  sanity.ts
 *
 * This file is for connecting to the backend Sanity setup
 *
 *
 * */

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Debug environment variables
console.log('Sanity Config:', {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
});

// The interface expects an object with an asset property containing a _ref string, which matches the structure of the 'post.mainImage

interface SanitySource {
  asset: {
    _ref: string;
  };
}

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: true,
  perspective: 'published',
  withCredentials: false
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: SanitySource) => builder.image(source);
