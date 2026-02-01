import { groq } from "next-sanity";

export const productDetailBySlugQuery = groq`
*[_type == "product" && slug.current == $slug][0]{
  _id,
  _createdAt,
  _updatedAt,
  name,
  slug,
  
  // 💡 NEW: Product Type fetch karna zaroori hai logic handle karne ke liye
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

  description,
  
  // 💡 Apparel Fields
  fit, 
  fabricDetails,
  careInstructions,
  shippingDetails,
  availableSizes,

  // 💡 NEW: Stationery Specific Fields
  productSpecs{
    material,
    dimensions,
    other
  },

  category->{
    _id,
    title,
    slug
  },

  badges[]->{
    _id,
    title,
    color,
    value
  },

  baseImage{
    _type,
    asset->{
      _id,
      url
    }
  },

  sizeGuide->{
    _id,
    title,
    image{
      _type,
      asset->{_id, url}
    },
    sizes[]{
      size,
      chest,
      length
    }
  },

  variants[]{
    _key,
    id,
    color,
    colorCode,
    images[]{
      _key,
      _type,
      asset->{
        _id,
        url
      }
    }
  }
}
`;
