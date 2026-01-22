// schemas/contactForm.ts

import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactForm",
  title: "Contact Form",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required().email().error("Please enter a valid email address"),
    }),

    defineField({
      name: "customization",
      title: "Design Customization",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(150),
    }),

    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(10).max(500),
    }),

    defineField({
      name: "referenceImage",
      title: "Reference Image (Optional)",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Upload an image reference for custom design",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "email",
      media: "referenceImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title ?? "No Name",
        subtitle: subtitle ?? "No Email",
        media: media,
      };
    },
  },
});
