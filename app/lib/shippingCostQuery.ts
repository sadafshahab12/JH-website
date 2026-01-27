import { groq } from "next-sanity";

export const ShippingCostQuery = groq`
          *[_type == "shippingCost" && lower(country) == lower($country)][0]{
            shippingFee,
            freeShippingMinOrder,
            note
          }
        `;
