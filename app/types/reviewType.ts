export type Review = {
  _id: string;
  _createdAt: string;
  _updatedAt?: string;

  product: {
    _ref: string;
    _type: "reference";
  };

  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};
export type ReviewWithProduct = Review & {
  product: {
    _id: string;
    name: string;
    slug: { current: string };
  };
};
