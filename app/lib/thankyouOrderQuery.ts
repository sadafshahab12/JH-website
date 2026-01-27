import { groq } from "next-sanity";

export const thankyouOrderQuery = groq`
          *[_type == "order" && orderNumber == $orderNumber][0]{
            _id,
            orderNumber,
            customer,
            currencyMode,
            items[] {
              _key,
              product->{
                _id,
                name,
                slug,
                price
              },
              quantity,
              price,
              priceMode,
              size,
              color,
              colorCode
            },
            subtotal,
            shippingFee,
            total,
            payment
          }`;
