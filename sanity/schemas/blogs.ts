// schemas/pet.js
export default {
  name: "blogs",
  type: "document",
  title: "blogs",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "slug",
      type: "slug",
      title: "slug",
      options: {
        source: "title",
        maxLength: 50,
      },
    },
    {
      name: "post",
      title: "post",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "readTime",
      type: "string",
      title: "readTime",
    },
    {
      name: "readType",
      type: "string",
      title: "readType",
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    },
  ],
};
