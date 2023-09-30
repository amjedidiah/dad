/** @jsxImportSource @emotion/react */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TestimonialItem, {
  TestimonialProps,
} from "@/components/shared/testimonials/testimonial-item";
import styles from "@/styles/testimonials.style";
import { testimonials as defaultTestimonials } from "@/utils/constants";

type Props = {
  testimonials?: TestimonialProps[];
  breakpoints?: Record<number, { slidesPerView: number }>;
};

const defaultBreakpoints = {
  10: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 2,
  },
};

export default function TestimonialList({
  testimonials = defaultTestimonials,
  breakpoints = {},
}: Props) {
  return (
    <div className="testimonials" css={styles}>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        scrollbar={{ draggable: true }}
        spaceBetween={16}
        slidesPerView="auto"
        breakpoints={{ ...defaultBreakpoints, ...breakpoints }}
        centeredSlides
        centeredSlidesBounds
        centerInsufficientSlides
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.name}>
            <TestimonialItem {...testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
