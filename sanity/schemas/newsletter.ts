import { defineField, defineType } from "sanity";
import { Mail } from "lucide-react"; // Optional: icon ke liye

export const newsletter = defineType({
  name: "newsletter",
  title: "Newsletter Subscribers",
  type: "document",
  icon: Mail,
  fields: [
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "The email address of the subscriber",
      validation: (Rule) =>
        Rule.required().email().error("A valid email is required"),
      // Read only isliye taake dashboard se koi email change na kar sake
      readOnly: true,
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
      },
      readOnly: true,
    }),
  ],
  // Dashboard par list view ko set karne ke liye preview
  preview: {
    select: {
      title: "email",
      subtitle: "subscribedAt",
    },
    prepare({ title, subtitle }) {
      return {
        title: title,
        subtitle: subtitle
          ? `Joined: ${new Date(subtitle).toLocaleDateString()}`
          : "No date",
      };
    },
  },
});
