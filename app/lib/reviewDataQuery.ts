import { groq } from "next-sanity";
export const productDetailPageReview = groq`*[_type == "review" && product._ref == $productId] | order(createdAt desc){
            _id,
            name,
            rating,
            comment,
            createdAt
          }`;
export const reviewDataQuery = groq`
        *[_type == "review"] | order(_createdAt desc)[0..2]{
          _id,
          _createdAt,
          name,
          rating,
          comment,
          createdAt,
          product->{
            _id,
            name,
            slug
          }
        }
      `;
