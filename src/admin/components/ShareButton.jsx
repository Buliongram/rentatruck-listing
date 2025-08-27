import React from "react";
import { FaShareAlt } from "react-icons/fa";

const ShareButton = ({ listingTitle, listingUrl, color }) => {
  const handleShare = async () => {
    // Check if the Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: listingTitle,
          url: listingUrl,
        });
        console.log("Listing shared successfully!");
      } catch (error) {
        console.error("Error sharing the listing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(listingUrl);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link: ", err);
        alert("Failed to copy link. Please copy it manually.");
      }
    }
  };

  return (
    <span
      onClick={handleShare}
      className={`p-2 bg-${color} text-white rounded-lg cursor-pointer`}
    >
      <FaShareAlt className="text-[10px]" />
    </span>
  );
};

export default ShareButton;
