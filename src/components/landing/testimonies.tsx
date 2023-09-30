/** @jsxImportSource @emotion/react */
import SectionHeader from "@/components/shared/section-header";
import TestimonialList from "@/components/shared/testimonials/testimonial-list";
import styles from "@/styles/testimonies.style";

export default function Testimonies() {
  return (
    <section id="testimonies" className="load-in" css={styles}>
      <div className="container">
        <SectionHeader
          title="Testimonies"
          subtitle="Hear what partners and beneficiaries have to say"
        />
        <TestimonialList
          breakpoints={{
            992: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 4,
            },
          }}
        />
      </div>
    </section>
  );
}
