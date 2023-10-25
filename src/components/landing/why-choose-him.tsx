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
      "Dr. Passy Amaraegbu has a Ph.D in Clinical Psychology from the University of Ibadan and a D.Min from Bakke Graduate University, Texas.<br />",
  },
  {
    icon: <AllRounderIcon />,
    title: "All-Rounder",
    description:
      "He is a clinical psychologist, and the Lagos 1 State Overseer of the Charismatic Renewal Ministries. He is a father and husband of over 30 years.",
  },
  {
    icon: <FreeCounsellingIcon />,
    title: "Free Counselling Session",
    description:
      "To show his devotion to helping people, when you reach out, you get the first counselling session free",
  },
];

export default function WhyChooseHim() {
  return (
    <section id="why-choose-him" className="load-in" css={styles}>
      <div className="container">
        <SectionHeader
          title="Why Choose Him"
          subtitle="An all-round certified expert providing the first counselling session for free"
        />
        <ul className="selling-point-list">
          {sellingPoints.map(({ title, icon, description }) => (
            <li key={title} className="selling-point-item">
              <span className="selling-point-icon">{icon}</span>
              <p className="selling-point-title">{title}</p>
              <p
                className="selling-point-description"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
