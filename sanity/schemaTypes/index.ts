import { type SchemaTypeDefinition } from "sanity";
import { product } from "../schemas/product";
import { badge } from "../schemas/badge";
import { category } from "../schemas/category";
import { sizeGuide } from "../schemas/sizeGuide";
import shippingCost from "../schemas/shippingCost";
import { order } from "../schemas/order";
import review from "../schemas/review";
import contact from "../schemas/contact";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    badge,
    category,
    sizeGuide,
    shippingCost,
    order,
    review,
    contact,
  ],
};
