/** @jsxImportSource @emotion/react */
import SectionHeader from "@/components/shared/section-header";
import TestimonialList from "@/components/shared/testimonials/testimonial-list";
import styles from "@/styles/whos-talking.style";

export default function WhosTalking() {
  return (
    <section id="why-choose-him" className="load-in" css={styles}>
      <div className="container">
        <SectionHeader
          title="Who's Talking"
          subtitle="Hear what partners and beneficiaries are saying"
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
