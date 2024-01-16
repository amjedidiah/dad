import blog1 from "../../public/images/blog/blog1.png";
import blog2 from "../../public/images/blog/blog2.png";
import blog3 from "../../public/images/blog/blog3.png";
import blog4 from "../../public/images/blog/blog4.png";
import RootLayout from "@/components/shared/layout/root-layout";
import SectionHeader from "@/components/shared/section-header";
import Image from "next/image";

export default function Blog() {
  return (
    <RootLayout title="Blog - Dr Passy Amaraegbu | Living a life of purity, power and prosperity">
      <section className="load-in pt-5 mb-10 md:flex gap-10 md:mx-16">
        <div className="">
          <SectionHeader title="Blog" pageTitle />
        </div>
        <div className="text-white text-xl mt-16 pr-48">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
          iusto libero sint ab error tempora assumenda.
        </div>
      </section>

      <section className="md:mx-16 mb-20 text-white">
        <div className="md:flex gap-10">
          <div className="relative w-2/3">
            <Image
              src={blog1}
              height={700}
              width={500}
              alt="Alt text for the image"
              className="w-full h-full"
            />
            <div className="absolute top-3/4 left-0 transform -translate-y-1/2 text-white p-8">
              <p className="text-2xl font-bold mb-4">
                Climbing that mountain like a pro
              </p>
              <p>
                We have the best expertise person Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Excepturi, sint?
              </p>
            </div>
          </div>

          <div>
            <div className="mb-5">
              <div className="flex gap-5">
                <div>
                  <Image
                    src={blog2}
                    height={250}
                    width={250}
                    alt={"this"}
                    className="h-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="bg-gray-100 rounded px-3 py-1 text-black">
                      Reality
                    </div>
                    <div className="text-gray-300">2 min read</div>
                  </div>
                  <div className="text-2xl">
                    Making things working out regardless
                  </div>
                  <div className="">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Minus earum{" "}
                    <span className="font-semibold">see more...</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex gap-5">
                <div>
                  <Image
                    src={blog3}
                    height={250}
                    width={250}
                    alt={"this"}
                    className="h-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="bg-gray-100 rounded px-5 py-1 text-black">
                      Love
                    </div>
                    <div className="text-gray-300">5 min read</div>
                  </div>
                  <div className="text-2xl">
                    Making things working out regardless
                  </div>
                  <div className="">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Minus earum{" "}
                    <span className="font-semibold">see more...</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex gap-5">
                <div>
                  <Image
                    src={blog4}
                    height={250}
                    width={250}
                    alt={"this"}
                    className="h-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <div className="bg-gray-100 rounded px-3 py-1 text-black">
                      Reality
                    </div>
                    <div className="text-gray-300">2 min read</div>
                  </div>
                  <div className="text-2xl">
                    Making things working out regardless
                  </div>
                  <div className="">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Minus earum{" "}
                    <span className="font-semibold">see more...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="md:mx-16 text-white">
        <div className="space-y-10">
          <div className="flex gap-x-10">
            <div className="p-4 border border-gray-300">
              <div className="mb-5">
                <Image src={blog4} height={350} width={350} alt={"this"} />
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
                <div className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minus earum <span className="font-semibold">see more...</span>
                </div>
              </div>
            </div>
            <div className="p-4 border border-gray-300">
              <div className="mb-5">
                <Image src={blog4} height={350} width={350} alt={"this"} />
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
                <div className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minus earum <span className="font-semibold">see more...</span>
                </div>
              </div>
            </div>
            <div className="p-4 border border-gray-300">
              <div className="mb-5">
                <Image src={blog4} height={350} width={350} alt={"this"} />
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
                <div className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minus earum <span className="font-semibold">see more...</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-x-10">
            <div className="p-4 border border-gray-300">
              <div className="mb-5">
                <Image src={blog4} height={350} width={350} alt={"this"} />
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
                <div className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minus earum <span className="font-semibold">see more...</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-300">
              <div className="mb-5">
                <Image src={blog4} height={350} width={350} alt={"this"} />
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
                <div className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minus earum <span className="font-semibold">see more...</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-300">
              <div className="mb-5">
                <Image src={blog4} height={350} width={350} alt={"this"} />
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
                <div className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minus earum
                  <span className="font-semibold">see more...</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-x-10">
            <div className="p-4 border border-gray-300">
              <div className="mb-5">
                <Image src={blog4} height={350} width={350} alt={"this"} />
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
                <div className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minus earum <span className="font-semibold">see more...</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-300">
              <div className="mb-5">
                <Image src={blog4} height={350} width={350} alt={"this"} />
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
                <div className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minus earum <span className="font-semibold">see more...</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-300">
              <div className="mb-5">
                <Image src={blog4} height={350} width={350} alt={"this"} />
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
                <div className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minus earum <span className="font-semibold">see more...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
}
