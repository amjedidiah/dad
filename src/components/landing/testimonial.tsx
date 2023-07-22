import Image from "next/image";

export type TestimonialProps = {
  name: string;
  title?: string;
  description: string;
  image: string;
};

export default function Testimonial({
  name,
  title,
  description,
  image,
}: TestimonialProps) {
  return (
    <div className="testimonial">
      <p className="description theme-text">{description}</p>
      <div className="author">
        <div className="image">
          <Image src={image} alt={name} fill sizes="100%" />
        </div>
        <div className="details">
          <p className="name theme-text">{name}</p>
          {title && <p className="title">{title}</p>}
        </div>
      </div>
    </div>
  );
}
