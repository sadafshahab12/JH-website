import { groq } from "next-sanity";

export const featuredProductsQuery = groq`
*[
  _type == "product" &&
  count(badges[@->title in ["Best Seller", "Featured"]]) > 0
] | order(_createdAt desc) {

  _id,
  _type,
  _createdAt,
  name,
  description,
  slug,
  productType,
  pricing{
    pkPrice{
      original,
      discount
    },
    intlPrice{
      original,
      discount
    }
  },

  category->{
    title,
    slug
  },

  baseImage,

  fit,
  availableSizes,
  fabricDetails,

  badges[]->{
    _id,
    title,
    value,
    color
  },

  variants[]{
    _key,
    id,
    color,
    colorCode,
    images
  },

  sizeGuide->{
    _id,
    title,
    image,
    sizes
  }
}
`;
