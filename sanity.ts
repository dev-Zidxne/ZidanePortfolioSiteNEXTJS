import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: "prj_gX2TDx592ggA61wAwzan4PTTPPnc",
  apiVersion: "2021-08-11",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

export const urlFor = (source: any) =>
  createImageUrlBuilder(config).image(source);
