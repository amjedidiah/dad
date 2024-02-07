import RootLayout from "@/components/shared/layout/root-layout";
import SectionHeader from "@/components/shared/section-header";
import Image from "next/image";
import Blogs, { TopBlogs } from "@/components/blog/blogs";
import { client } from "../../sanity/lib/client";
import Link from "next/link";
import TruncatedContent from "@/components/blog/truncatedcontent";

export default function Blog({ blogs, majorBlog, topBlogs }: any) {
  return (
    <RootLayout title="Blog - Dr Passy Amaraegbu | Living a life of purity, power and prosperity">
      <section className="load-in pt-5 mb-5 md:mb-10 md:flex md:justify-between  md:mx-16 mx-10">
        <div className="w-full lg:w-3/4 md:flex gap-10 ">
          <div>
            <SectionHeader title="Blog" pageTitle />
          </div>

          <div className="text-white text-xl mt-5 md:mt-10 xl:mt-14">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
            iusto libero sint ab error tempora.
          </div>
        </div>
      </section>

      <section className="mx-10 md:mx-16 mb-20 text-white h-full">
        <div className="lg:flex space-x-5">
          {majorBlog.map((item: any, index: any) => (
            <Link
              href={`blog/${item.slug}`}
              key={index}
              className="lg:w-1/2 lg:flex"
            >
              <div className="relative  mb-5 md:mb-10 lg:mb-0 lg:w-full lg:flex flex-col lg:flex-grow">
                <Image
                  src={item.image}
                  height={400}
                  width={800}
                  alt={item.title}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute top-3/4 left-0 transform -translate-y-1/2 text-white p-5 md:p-8">
                  <p className="text-2xl font-bold mb-2 md:mb-4">
                    {item.title}
                  </p>
                  <TruncatedContent content={item.post} maxWords={20} />
                </div>
              </div>
            </Link>
          ))}
          <div className="lg:w-1/2 lg:flex lg:flex-col">
            <TopBlogs topBlogs={topBlogs} />
          </div>
        </div>
      </section>

      <section className="mx-10 md:mx-16 text-white">
        <Blogs blogs={blogs} />
      </section>
    </RootLayout>
  );
}

export async function getStaticProps() {
  const blogs = await client.fetch(`*[_type == "blogs"]{
    title,
    readTime,
    "image": image.asset->url,
    post,
    readType,
    "slug": slug.current
  }`);

  const topBlogs = await client.fetch(`*[_type == "topBlogs"]{
      title,
    readTime,
    "image": image.asset->url,
    post,
    readType,
    "slug": slug.current
  }`);

  const majorBlog = await client.fetch(`*[_type == "majorBlog"]{
    title,
    "image": image.asset->url,
    post,
    "slug": slug.current
  }`);

  return {
    props: {
      blogs,
      majorBlog,
      topBlogs,
    },
  };
}
