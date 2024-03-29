import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/shared/layout/modal";
import Scrolling from "@/components/shared/scrolling";
import TestimonialList from "@/components/shared/testimonials/testimonial-list";
import styles from "@/styles/partner-modal.style";
import { isDev, ministries } from "@/utils/constants";

export default function PartnerModal() {
  return (
    <Modal.Body styles={styles}>
      <Modal.Title>Partner</Modal.Title>
      <article className="container-ministries">
        <h3 className="theme-text sub-title">Ministries</h3>
        <Scrolling items={ministries} />
      </article>
      <article className="container-partner">
        <div className="child-partner-logos">
          <h4 className="theme-text">
            Partner using any of the following platforms
          </h4>

          <div className="container-partner-logos">
            <div className="child-partner-logo">
              <Link
                href={process.env.NEXT_PUBLIC_PAYSTACK_DONATION_LINK as string}
                passHref
              >
                <Image
                  src="/images/partner/paystack.webp"
                  alt="partner-with-paystack"
                  width={123}
                  height={57}
                />
              </Link>
            </div>
          </div>
        </div>
        {isDev && (
          <div className="child-partner-testimonials">
            <h4 className="theme-text sub-title">
              Hear what partners are saying
            </h4>
            <TestimonialList />
          </div>
        )}
      </article>
    </Modal.Body>
  );
}
