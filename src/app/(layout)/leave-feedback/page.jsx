"use client";
import Button from "@/components/shared/button/Button";
import SectionTitle from "@/components/shared/Titles/SectionTitle";
import useAuthAxios from "@/hooks/useAuthAxios";
import React, { useState } from "react";
import toast from "react-hot-toast";

// The main feedback form component
const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const axios = useAuthAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/testimonial", {
      text: feedback,
    });
    toast.success("আপনার মতামতের জন্য ধন্যবাদ");
    setFeedback("");
  };
  // Show the form
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg"
    >
      <SectionTitle title={"ফিডব্যাক দিন"} className={"text-center mb-4"} />

      {/* Feedback Text Area */}
      <div className="mb-6">
        <textarea
          id="feedback"
          name="feedback"
          rows="5"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-0 transition duration-150 ease-in-out resize-none"
          placeholder="আপনি কী ভাবছেন?"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>
      </div>
      <Button text={"সাবমিট করুন"} onClick={handleSubmit} />
    </form>
  );
};

export default FeedbackForm;
