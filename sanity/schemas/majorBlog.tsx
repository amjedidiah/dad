export default {
  name: "majorBlog",
  type: "document",
  title: "majorBlog",
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
      type: "string",
      title: "post",
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
    },
  ],
};
