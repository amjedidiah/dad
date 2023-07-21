import Image from "next/image";
import { ministries } from "@/components/landing/jumbo/constants";
import Modal from "@/components/shared/modal";
import Scrolling from "@/components/shared/scrolling";
import styles from "@/styles/partner-modal.style";
import Testimonials from "@/components/landing/testimonials";

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
            Partner with us using any of the following platforms
          </h4>

          <div className="container-partner-logos">
            <div className="child-partner-logo">
              <Image
                src="/images/partner/stripe.png"
                alt="partner-with-stripe"
                width={92}
                height={44}
              />
            </div>
            <div className="child-partner-logo">
              <Image
                src="/images/partner/flutterwave.png"
                alt="partner-with-flutterwave"
                width={210}
                height={50}
              />
            </div>
            <div className="child-partner-logo">
              <Image
                src="/images/partner/paystack.png"
                alt="partner-with-paystack"
                width={123}
                height={57}
              />
            </div>
          </div>
        </div>
        <div className="child-partner-testimonials">
          <h4 className="theme-text sub-title">
            Hear what our partners are saying
          </h4>
          <Testimonials />
        </div>
      </article>
    </Modal.Body>
  );
}
