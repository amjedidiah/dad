import Image from "next/image";
import Link from "next/link";
import TruncatedContent from "./truncatedcontent";

export function TopBlogs({ topBlogs }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-0 lg:grid-cols-1">
      {topBlogs.map((item: any, index: any) => (
        <Link href={`blog/${item.slug}`} key={index}>
          <div className="lg:flex space-x-4 mb-5 lg:mb-2">
            <div className="lg:w-1/2 lg:flex lg:flex-col">
              <Image
                src={item.image}
                height={150}
                width={150}
                alt={item.title}
                className="w-full"
              />
            </div>
            <div className="mt-5 lg:mt-0 lg:w-1/2 lg:flex lg:flex-col">
              <div className="flex justify-between mb-1">
                <h5 className="bg-gray-100 rounded px-3 py-1 text-black">
                  {item.readType}
                </h5>
                <h5 className="text-gray-300">{item.readTime}</h5>
              </div>
              <h3 className="md:text-2xl lg:text-xl">{item.title} </h3>
              <TruncatedContent content={item.post} maxWords={9} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Blogs({ blogs }: any) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((item: any, index: any) => (
          <Link href={`blog/${item.slug}`} key={index}>
            <div className="border border-gray-300 p-4">
              <div className="mb-5">
                <Image
                  src={item.image}
                  height={350}
                  width={350}
                  alt={item.title}
                  className="w-full"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <div className="bg-gray-100 rounded px-3 py-1 text-black">
                    {item.readType}
                  </div>
                  <div className="text-gray-300">{item.readTime}</div>
                </div>
                <div className="text-xl text-gray-200">{item.title}</div>
                <TruncatedContent content={item.post} maxWords={13} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
