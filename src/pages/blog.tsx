import blog1 from "../../public/images/blog/blog1.png";
import RootLayout from "@/components/shared/layout/root-layout";
import SectionHeader from "@/components/shared/section-header";
import Image from "next/image";
import Blogs, { TopBlogs } from "@/components/blog/blogs";

export default function Blog() {
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

      <section className="mx-10 md:mx-16 mb-20 text-white">
        <div className="lg:flex gap-5">
          <div className="relative  mb-5 md:md-10 lg:mb-0">
            <Image
              src={blog1}
              height={400}
              width={400}
              alt="Alt text for the image"
              className="w-full h-full"
            />
            <div className="absolute top-3/4 left-0 transform -translate-y-1/2 text-white p-5 md:p-8">
              <p className="text-2xl font-bold mb-2 md:mb-4">
                Climbing that mountain like a pro
              </p>
              <p>
                We have the best expertise person Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Excepturi, sint?
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-1">
           <TopBlogs />
           </div>
        </div>
      </section>

      <section className="mx-10 md:mx-16 text-white">
        <Blogs /> 
      </section>
    </RootLayout>
  );
}

{/* <div className="space-y-10">
          <div className="lg:flex gap-x-10">
            <div className="p-4 border border-gray-300 mb-5 lg:mb-0">
              <div className="mb-5">
                <Image src={blog4} height={350} width={350} alt={"this"} className="w-full"/>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <div className="bg-gray-100 rounded px-3 py-1 text-black">
                    Reality
                  </div>
                  <div className="text-gray-300">2 min read</div>
                </div>
                <div className="text-xl text-gray-200">
                  Making things working out regardless
                </div>
            />
              </div>
            </div>
          </div>
        </div> */}
