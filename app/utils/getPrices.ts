import { Product } from "../types/productType";

export const getPrices = (product: Product) => {
  const pk = product.pricing?.pkPrice;
  const intl = product.pricing?.intlPrice;

  return {
    pk: {
      original: pk?.original ?? 0,
      discount: pk?.discount ?? pk?.original ?? 0,
    },
    intl: {
      original: intl?.original ?? 0,
      discount: intl?.discount ?? intl?.original ?? 0,
    },
  };
};
