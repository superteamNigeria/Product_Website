import React, { useState } from "react";
import { CloudUpload } from "lucide-react";


const Step1_BasicInfo = () => {
  const [form, setForm] = useState({
    name: "",
    oneLiner: "",
    tags: "",
    logo: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, logo: file });
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Basic Information</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />

      {/* Product Name */}
      <div>
        <label className="block mb-1 font-medium">Product Name:</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="e.g. Chatter"
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
      </div>

      {/* One Liner */}
      <div>
        <label className="block mb-1 font-medium">One Liner:</label>
        <input
          name="oneLiner"
          value={form.oneLiner}
          onChange={handleChange}
          type="text"
          placeholder="e.g. Collect stable payments in your DMs"
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block mb-1 font-medium">Tags:</label>
        <select
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm bg-white dark:bg-[#1E1E1E] dark:text-white"
        >
          <option value="">Select an option</option>
          <option value="DeFi">DeFi</option>
          <option value="Stablecoins">Stablecoins</option>
          <option value="PayFi">PayFi</option>
          <option value="AI">AI</option>
          <option value="RWAs">RWAs</option>
          <option value="Gaming">Gaming</option>
        </select>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block mb-2 font-medium">Logo:</label>
        <div className="border border-dashed border-[#D9D9D9] rounded-xl py-10 px-5 text-center bg-[#FAFAFA] dark:bg-[#1E1E1E]">
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
            id="logo-upload"
          />
          <label htmlFor="logo-upload" className="cursor-pointer inline-block">
            <div className="flex flex-col items-center justify-center">
            <CloudUpload className="w-10 h-10 text-[#868C98] mb-2" />

              <p className="text-sm text-gray-500 mb-1">Max. 50 MB, JPEG</p>
              <span className="bg-[#6CB798] text-white text-sm px-4 py-2 rounded-full hover:bg-[#02834E]">
                Browse file
              </span>
            </div>
          </label>
        </div>
        {form.logo && (
          <p className="text-sm mt-2 text-[#02834E]">Uploaded: {form.logo.name}</p>
        )}
      </div>
    </div>
  );
};

export default Step1_BasicInfo;
