import { type SchemaTypeDefinition } from "sanity";
import { product } from "../schemas/product";
import { badge } from "../schemas/badge";
import { category } from "../schemas/category";
import contact from "../schemas/contact";
import { order } from "../schemas/order";
import review from "../schemas/review";
import shippingCost from "../schemas/shippingCost";
import { sizeGuide } from "../schemas/sizeGuide";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    badge,
    category,
    contact,
    order,
    review,
    shippingCost,
    sizeGuide,
  ],
};
