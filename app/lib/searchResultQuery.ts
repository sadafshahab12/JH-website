import { groq } from "next-sanity";

export const searchResultQuery = groq`*[_type=="product" && name match $q][0..4]{
          _id,
          name,
          slug,
          baseImage,
          pricing {
            pkPrice { discount, original },
            intlPrice { discount, original }
          }
        }`;
