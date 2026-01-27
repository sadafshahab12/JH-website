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
