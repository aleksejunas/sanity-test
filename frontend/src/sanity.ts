/*
 *  sanity.ts
 *
 * This file is for connecting to the backend Sanity setup
 *
 *
 * */

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

interface SanitySource {
  source: string;
}

export const sanityClient = createClient({
  projectId: "your_project_id", // Replace with your project id
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: SanitySource) => builder.image(source);
