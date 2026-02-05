import { defineType, defineField } from "sanity";

export const sizeGuide = defineType({
  name: "sizeGuide",
  title: "Size Guide",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Guide Title",
      type: "string",
      description: "e.g. T-Shirt Size Guide, Hoodie Size Guide",
      validation: (Rule) => Rule.required(),
    }),

 
    defineField({
      name: "image",
      title: "Guide Image",
      type: "image",
      description:
        "Optional image for recognizing the product type (e.g. t-shirt outline)",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "sizes",
      title: "Sizes Table",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "chest",
              title: "Chest (in)",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "length",
              title: "Length (in)",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "modelStats",
      title: "Model Context (Optional)",
      type: "object",
      description:
        "Details about the model wearing this specific product category",
      fields: [
        defineField({
          name: "height",
          title: "Model Height",
          type: "string",
          description: "e.g. 6'1\" (185cm)",
        }),
        defineField({
          name: "weight",
          title: "Model Weight",
          type: "string",
          description: "e.g. 75kg",
        }),
        defineField({
          name: "sizeWorn",
          title: "Size Worn by Model",
          type: "string",
          description: "e.g. Large",
        }),
        defineField({
          name: "fitDescription",
          title: "Fit Style",
          type: "string",
          description: "e.g. signature oversized silhouette",
        }),
      ],
    }),

    defineField({
      name: "sizeTip",
      title: "Sizing Tip",
      type: "string",
      description:
        "e.g. For a more relaxed streetwear fit, we recommend sizing up.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
