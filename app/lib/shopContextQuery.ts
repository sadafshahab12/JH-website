import { groq } from "next-sanity";

export const shopContextQuery = groq`
  *[_type == "product"]{
    _id,
    _createdAt,
    _updatedAt,
    name,
    slug,
    productType, 


    pricing {
      pkPrice {
        original,
        discount
      },
      intlPrice {
        original,
        discount
      }
    },

    description,
    fit,
    fabricDetails,
    availableSizes,
    

    productSpecs {
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
      sizes[] {
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
      images[] {
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
