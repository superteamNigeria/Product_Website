import React from "react";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

const statusOptions = [
  { value: "Live", label: "Live" },
  { value: "Beta", label: "Beta" },
  { value: "Development", label: "Development" },
  { value: "Deprecated", label: "Deprecated" },
];

const userCountOptions = [
  { value: "1-100", label: "1 – 100" },
  { value: "101-1k", label: "101 – 1,000" },
  { value: "1k-10k", label: "1,001 – 10,000" },
  { value: "10k-100k", label: "10,001 – 100,000" },
  { value: "100k+", label: "100,000+" },
];

const Step2_Details: React.FC<Props> = ({ data, onUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      onUpdate({ [name]: checked });
    } else {
      onUpdate({ [name]: value });
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...data.features];
    newFeatures[index] = value;
    onUpdate({ features: newFeatures });
  };

  const addFeature = () => {
    onUpdate({ features: [...data.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = data.features.filter((_: any, i: number) => i !== index);
    onUpdate({ features: newFeatures.length > 0 ? newFeatures : [""] });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Details & Status</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />

      {/* Status */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Product Status:</label>
        <select
          name="status"
          value={data.status}
          onChange={handleChange}
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm bg-white dark:bg-[#1E1E1E] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#02834E]"
        >
          <option value="">Select status</option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Launch Date */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Launch Date:</label>
        <input
          name="launchDate"
          value={data.launchDate}
          onChange={handleChange}
          type="date"
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
      </div>

      {/* User Count */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Number of Active Users:</label>
        <select
          name="userCount"
          value={data.userCount}
          onChange={handleChange}
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm bg-white dark:bg-[#1E1E1E] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#02834E]"
        >
          <option value="">Select user count range</option>
          {userCountOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Features */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Key Features:</label>
        <p className="text-xs text-gray-500 mb-3">List the main features and capabilities of your product</p>
        {data.features.map((feature: string, index: number) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              placeholder={`Feature ${index + 1}`}
              className="flex-1 border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
            />
            {data.features.length > 1 && (
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-500 hover:text-red-700 px-3"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addFeature}
          className="bg-[#02834E] text-white font-medium px-5 py-2 rounded-full text-sm hover:bg-green-700 transition"
        >
          + Add Feature
        </button>
      </div>

      {/* Verification Status */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="verified"
            checked={data.verified}
            onChange={handleChange}
            className="w-4 h-4 text-[#02834E] bg-gray-100 border-gray-300 rounded focus:ring-[#02834E] focus:ring-2"
          />
          <label className="ml-2 text-sm font-medium dark:text-white">Verified Product</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="openSource"
            checked={data.openSource}
            onChange={handleChange}
            className="w-4 h-4 text-[#02834E] bg-gray-100 border-gray-300 rounded focus:ring-[#02834E] focus:ring-2"
          />
          <label className="ml-2 text-sm font-medium dark:text-white">Open Source</label>
        </div>
      </div>
    </div>
  );
};

export default Step2_Details;