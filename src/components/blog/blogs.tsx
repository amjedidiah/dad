import Image from "next/image";
import { BlogContents, TopBlogContents } from "./constants";
import TruncatedContent from "./truncatedcontent";

export function TopBlogs() {
  return (
    <>
    {TopBlogContents.map((item: any, index) => (
    <div key={index}>
      <div className="lg:flex gap-4">
        <div>
          <Image
            src={item.image}
            height={100}
            width={200}
            alt={"this"}
            className="w-full"
          />
        </div>
        <div className="mt-5 lg:mt-0 ">
          <div className="flex justify-between mb-1">
            <div className="bg-gray-100 rounded px-3 py-1 text-black">
              Reality
            </div>
            <div className="text-gray-300">{item.readTime}</div>
          </div>
          <div className="md:text-2xl lg:text-xl">{item.title} </div>
          <TruncatedContent
            content={item.info}
            maxWords={5}
          />
        </div>
      </div>
    </div>))}
    </>
  )
}

export default function Blogs() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {BlogContents.map((item: any, index) => (
          <div key={index} className="border border-gray-300 p-4">
            <div className="mb-5">
              <Image src={item.image} height={350} width={350} alt="Blog Image" className="w-full" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <div className="bg-gray-100 rounded px-3 py-1 text-black">Reality</div>
                <div className="text-gray-300">{item.readTime}</div>
              </div>
              <div className="text-xl text-gray-200">{item.title}</div>
              <TruncatedContent content={item.info} maxWords={6} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}