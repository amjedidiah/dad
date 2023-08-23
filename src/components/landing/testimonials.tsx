/** @jsxImportSource @emotion/react */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Testimonial, {
  TestimonialProps,
} from "@/components/landing/testimonial";
import styles from "@/styles/testimonials.style";
import { testimonials as defaultTestimonials } from "@/utils/constants";

type Props = {
  testimonials?: TestimonialProps[];
};

export default function Testimonials({
  testimonials = defaultTestimonials,
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
        breakpoints={{
          10: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
        }}
        centeredSlides
        centeredSlidesBounds
        centerInsufficientSlides
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.name}>
            <Testimonial {...testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
