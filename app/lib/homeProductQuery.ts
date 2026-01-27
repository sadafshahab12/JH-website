import { groq } from "next-sanity";

export const homeProductQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    _createdAt,
    name,
    slug,
    baseImage,
    pricing{
      pkPrice{original, discount},
      intlPrice{original, discount}
    },
    badges[]->{
      _key,
      title,
      value
    }
  }
`;
