import { groq } from "next-sanity";

export const productDetailRelatedQuery = groq`*[_type == "product" && slug.current != $slug][0..7]{
    _id,
    name,
    slug,
    baseImage,
    pricing{
      pkPrice{
        original,
        discount
      },
      intlPrice{
        original,
        discount
      }
    }
  }`;
