import { groq } from "next-sanity";
export const shopContextQuery = groq`
      *[_type == "product"]{
        _id,
        _createdAt,
        _updatedAt,
        name,
        slug,
        originalPrice,
        discountPrice,
        description,
        fit,
        fabricDetails,
        availableSizes,
        category->{
          _id,
          title,
          slug
        },
        badges[]->{
          _id,
          title,
          color
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
export const query = groq`
*[_type == "product" && slug.current == $slug][0]{
  _id,
  _createdAt,
  _updatedAt,
  name,
  slug,

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
  fit,
  fabricDetails,
  availableSizes,

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
    slug,
    value
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
