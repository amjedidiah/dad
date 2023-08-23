import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/shared/modal";
import Scrolling from "@/components/shared/scrolling";
import styles from "@/styles/partner-modal.style";
import Testimonials from "@/components/landing/testimonials";
import { ministries } from "@/utils/constants";

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
              <Link
                href={process.env.NEXT_PUBLIC_PAYSTACK_DONATION_LINK as string}
                passHref
                target="_blank"
              >
                <Image
                  src="/images/partner/paystack.png"
                  alt="partner-with-paystack"
                  width={123}
                  height={57}
                />
              </Link>
            </div>
            <div className="child-partner-logo">
              <Link
                href={
                  process.env.NEXT_PUBLIC_FLUTTERWAVE_DONATION_LINK as string
                }
                passHref
                target="_blank"
              >
                <Image
                  src="/images/partner/flutterwave.png"
                  alt="partner-with-flutterwave"
                  width={210}
                  height={50}
                />
              </Link>
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