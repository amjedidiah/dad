import { type SchemaTypeDefinition } from "sanity";
import blogs from "./schemas/blogs";
import topBlogs from "./schemas/topBlogs";
import majorBlog from "./schemas/majorBlog";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogs, topBlogs, majorBlog],
};
