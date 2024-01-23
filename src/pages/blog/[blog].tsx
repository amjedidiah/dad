import { PortableText } from "@portabletext/react";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import RootLayout from "@/components/shared/layout/root-layout";
import Link from "next/link";
import TruncatedContent from "@/components/blog/truncatedcontent";

export default function SingleBlog({ blogPost, blogs }: any) {
  // // Extracting the content from the PortableText value
  // const contentBlocks = blogPost.post;

  // // Function to get the first 50 words as a string
  // const getFirst50Words = (blocks: any) => {
  //   let wordCount = 0;
  //   let result = [];

  //   for (const block of blocks) {
  //     for (const span of block.children) {
  //       const words = span.text.split(" ");

  //       for (const word of words) {
  //         result.push({
  //           _type: "block",
  //           style: "normal",
  //           children: [
  //             {
  //               _type: "span",
  //               marks: [],
  //               text: word,
  //             },
  //           ],
  //         });

  //         wordCount++;

  //         if (wordCount === 300) {
  //           return result;
  //         }
  //       }
  //     }
  //   }

  //   return result;
  // };

  // // Get the first 50 words as blocks
  // const first50WordsBlocks = getFirst50Words(contentBlocks);

  // // Manual rendering of the PortableText with the first 50 words
  // const renderFirst50Words = (blocks) => {
  //   return (
  //     <div>
  //       {blocks.map((block, index) => (
  //         <span key={index}>{block.children[0].text} </span>
  //       ))}
  //     </div>
  //   );
  // };
  return (
    <RootLayout title="Blog - Dr Passy Amaraegbu | Living a life of purity, power and prosperity">
      <div className="mt-5 mx-20 text-white space-x-5">
        <span>
          <Link href={"/blog"}>Blog Post </Link>
        </span>
        <span>{">"}</span>
        <span>
          <Link href={blogPost.slug}>{blogPost.title}</Link>
        </span>
      </div>
      <div className="text-white mx-20 my-10">
        <div className="md:grid md:grid-cols-2 gap-10">
          <div>
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              height={1080}
              width={700}
              className="h-full"
            />
          </div>
          <div>
            <div className="text-4xl font-semibold">{blogPost.title}</div>
            <div className="flex justify-between my-5">
              <div className="bg-gray-100 rounded px-3 py-1 text-black">
                {blogPost.readType}
              </div>
              <div className="text-gray-300">{blogPost.readTime}</div>
            </div>
            <PortableText value={blogPost.post} />
          </div>
        </div>
        <div className="my-10">
          {" "}
          <PortableText value={blogPost.moreDetails} />
        </div>

        <div className="mt-10">
          <h3 className="text-4xl font-semibold mb-10">Also Read</h3>
          <div className="space-y-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map(
                (blog: any, index: any) =>
                  index < 3 && (
                    <Link href={`${blog.slug}`} key={index}>
                      <div className="border border-gray-300 p-4">
                        <div className="mb-5">
                          <Image
                            src={blog.image}
                            height={350}
                            width={350}
                            alt="Blog Image"
                            className="w-full"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="bg-gray-100 rounded px-3 py-1 text-black">
                              {blog.readType}
                            </div>
                            <div className="text-gray-300">{blog.readTime}</div>
                          </div>
                          <div className="text-xl text-gray-200">
                            {blog.title}
                          </div>
                          <TruncatedContent content={blog.post} maxWords={12} />
                        </div>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export async function getStaticPaths() {
  const slugs = await client.fetch(
    '*[_type == "blogs" || _type == "topBlogs" || _type == "majorBlog"].slug.current'
  );

  // Create paths with slugs for Next.js to pre-render
  const paths = slugs.map((slug: any) => ({ params: { blog: slug } }));

  return { paths, fallback: true };
}
export async function getStaticProps({ params }: any) {
  const slug = params.blog;

  const blogPost = await client.fetch(
    `*[(_type == "blogs" || _type == "topBlogs" || _type == "majorBlog") && slug.current == $slug][0] {
            title,
    readTime,
    readType,
    "image": image.asset->url,
    post,
    moreDetails,
    "slug": slug.current
      }
    `,
    { slug }
  );
  const blogs = await client.fetch(`*[_type == "blogs"]{
    title,
    readTime,
    "image": image.asset->url,
    post,
    readType,
    "slug": slug.current
  }`);
  return {
    props: { blogPost, blogs },
    revalidate: 1,
  };
}
