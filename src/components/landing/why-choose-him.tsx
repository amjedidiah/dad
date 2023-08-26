/** @jsxImportSource @emotion/react */
import SectionHeader from "@/components/shared/section-header";
import {
  CertifiedExpertIcon,
  AllRounderIcon,
  FreeCounsellingIcon,
} from "@/icons";
import styles from "@/styles/why-choose-him.style";

const sellingPoints = [
  {
    icon: <CertifiedExpertIcon />,
    title: "Certified Expert",
    description:
      "Lorem ipsum dolor sit amet consectetur. In risus diam orci arcu pellentesque feugiat dui sed lacus. Quis aliquet nisi suspendisse at gravida enim sed. Integer sit vitae ",
  },
  {
    icon: <AllRounderIcon />,
    title: "All Rounder",
    description:
      "Lorem ipsum dolor sit amet consectetur. In risus diam orci arcu pellentesque feugiat dui sed lacus. Quis aliquet nisi suspendisse at gravida enim sed. Integer sit vitae ",
  },
  {
    icon: <FreeCounsellingIcon />,
    title: "Free Counselling Session",
    description:
      "Lorem ipsum dolor sit amet consectetur. In risus diam orci arcu pellentesque feugiat dui sed lacus. Quis aliquet nisi suspendisse at gravida enim sed. Integer sit vitae ",
  },
];

export default function WhyChooseHim() {
  return (
    <section id="why-choose-him" css={styles}>
      <div className="container">
        <SectionHeader
          title="Why Choose Him"
          subtitle="We have the best expertise person  liquet nisi suspendisse at gravida"
        />
        <ul className="selling-point-list">
          {sellingPoints.map(({ title, icon, description }) => (
            <li key={title} className="selling-point-item">
              <span className="selling-point-icon">{icon}</span>
              <p className="selling-point-title">{title}</p>
              <p className="selling-point-description"> {description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
