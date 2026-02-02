import { groq } from "next-sanity";

export const productDetailBySlugQuery = groq`
*[_type == "product" && slug.current == $slug][0]{
  _id,
  _createdAt,
  _updatedAt,
  name,
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
inventory,
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
    },
    modelStats{
      height,
      weight,
      sizeWorn,
      fitDescription
    },
    sizeTip
  },
"completeTheLook": completeTheLook[]-> {
    _id,
    name,
    slug,
    "baseImage": baseImage.asset->url,
    pricing {
      pkPrice { original, discount },
      intlPrice { original, discount }
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
