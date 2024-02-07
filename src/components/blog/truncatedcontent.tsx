import { useState } from "react";

export default function TruncatedContent({ content, maxWords }: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extracting the children array from content
  const children = content.map((item: any) => item.children || []);

  // Extracting text values from each child
  const words = children
    .flatMap((child: any) => child.map((innerChild: any) => innerChild.text))
    .join(" ")
    .split(" ");
  const truncatedText = isExpanded
    ? children
        .flatMap((child: any) =>
          child.map((innerChild: any) => innerChild.text)
        )
        .join(" ")
    : words.slice(0, maxWords).join(" ");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div>
        {truncatedText}{" "}
        {words.length > maxWords && (
          <p
            onClick={toggleExpand}
            className="text-gray-300 font-semibold inline"
          >
            {isExpanded ? "see less" : "see more"}
          </p>
        )}
      </div>
    </div>
  );
}
