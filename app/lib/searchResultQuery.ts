import { groq } from "next-sanity";

export const searchResultQuery = groq`*[_type=="product" && (
    name match $q || 
    category->title match $q || 
    slug.current match $q
  )][0..4]{
    _id,
    name,
    slug,
    baseImage,
    // ✅ Category field added
    category->{
      title,
      "slug": slug.current
    },
    pricing {
      pkPrice { discount, original },
      intlPrice { discount, original }
    }
  }`;