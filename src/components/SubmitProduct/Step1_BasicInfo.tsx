import React from "react";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

const categoryOptions = [
  { value: "DeFi", label: "DeFi" },
  { value: "NFT", label: "NFT" },
  { value: "Gaming", label: "Gaming" },
  { value: "Tools", label: "Tools" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Social", label: "Social" },
  { value: "Education", label: "Education" },
];

const Step1_BasicInfo: React.FC<Props> = ({ data, onUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Basic Information</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />

      {/* Product Name */}
      <div>
        <label className="block mb-1 font-medium">
          Product Name: <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          type="text"
          placeholder="e.g. Chatter"
          required
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">
          Description: <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Provide a detailed description of your product, its purpose, and what problems it solves..."
          required
          rows={4}
          className="w-full border border-[#E2E4E9] rounded-lg px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white resize-none"
        />
      </div>

      {/* Alias/Short Name */}
      <div>
        <label className="block mb-1 font-medium">
          Alias/Short Name: <span className="text-red-500">*</span>
        </label>
        <input
          name="alias"
          value={data.alias}
          onChange={handleChange}
          type="text"
          placeholder="e.g. chatter-app (used for URL slugs)"
          required
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
        <p className="text-xs text-gray-500 mt-1">This will be used in URLs and must be unique</p>
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">
          Category: <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          required
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm bg-white dark:bg-[#1E1E1E] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#02834E]"
        >
          <option value="">Select a category</option>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Step1_BasicInfo;