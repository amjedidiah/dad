import { useState } from "react";

export default function TruncatedContent ({ content, maxWords }:any) {
    const [isExpanded, setIsExpanded] = useState(false);
    const words = content.split(' ');
    const truncatedText = isExpanded ? content : words.slice(0, maxWords).join(' ');
  
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div>
         <p className="mb-3">
        {truncatedText}{" "}
        {words.length > maxWords && (
          <button onClick={toggleExpand} className="text-gray-300 font-semibold focus:outline-none inline">
            {isExpanded ? "see less" : "see more"}
          </button>
        )}
      </p>
      </div>
    );
  };