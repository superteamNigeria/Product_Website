import React, { useState } from "react";

const Step4_Links = () => {
  const [form, setForm] = useState({
    twitter: "",
    website: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Links & Contact</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />
      
      {/* Twitter/X Profile */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">X (Twitter) Profile:</label>
        <input
          name="twitter"
          type="text"
          placeholder="e.g. @chatterfi"
          value={form.twitter}
          onChange={handleChange}
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
      </div>

      {/* Website URL */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Product Website / Page:</label>
        <input
          name="website"
          type="text"
          placeholder="e.g. www.usechatter.app"
          value={form.website}
          onChange={handleChange}
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
      </div>
    </div>
  );
};

export default Step4_Links;
