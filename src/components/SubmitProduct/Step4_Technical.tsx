import React from "react";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
  errors?: Record<string, string>;
}

const Step4_Technical = ({ data, onUpdate, errors }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleTechStackChange = (index: number, value: string) => {
    const newTechStack = [...data.techStack];
    newTechStack[index] = value;
    onUpdate({ techStack: newTechStack });
  };

  const addTechStack = () => {
    onUpdate({ techStack: [...data.techStack, ""] });
  };

  const removeTechStack = (index: number) => {
    const newTechStack = data.techStack.filter((_: any, i: number) => i !== index);
    onUpdate({ techStack: newTechStack.length > 0 ? newTechStack : [""] });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Technical Information</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />

      {/* Tech Stack */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Technology Stack:</label>
        <p className="text-xs text-gray-500 mb-3">List the main technologies, frameworks, and tools used</p>
        {data.techStack.map((tech: string, index: number) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              value={tech}
              onChange={(e) => handleTechStackChange(index, e.target.value)}
              placeholder={`Technology ${index + 1} (e.g. React, Node.js, Solidity)`}
              className="flex-1 border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
            />
            {data.techStack.length > 1 && (
              <button
                type="button"
                onClick={() => removeTechStack(index)}
                className="text-red-500 hover:text-red-700 px-3"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {errors?.techStack && (
          <p className="text-red-500 text-sm mt-1">{errors.techStack}</p>
        )}
        <button
          type="button"
          onClick={addTechStack}
          className="bg-[#02834E] text-white font-medium px-5 py-2 rounded-full text-sm hover:bg-green-700 transition"
        >
          + Add Technology
        </button>
      </div>

      {/* Repository Link */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Repository Link:</label>
        <input
          name="repositoryLink"
          value={data.repositoryLink}
          onChange={handleChange}
          type="url"
          placeholder="e.g. https://github.com/username/project"
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
        {/* {errors?.repositoryLink && (
          <p className="text-red-500 text-sm mt-1">{errors.repositoryLink}</p>
        )} */}
        <p className="text-xs text-gray-500 mt-1">Link to your GitHub, GitLab, or other code repository (if open source)</p>
      </div>

      {/* Brand Colors */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Brand Colors:</label>
        <p className="text-xs text-gray-500 mb-3">Add one or more HEX color codes used in your branding</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.brand_colors.map((color: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={color}
                onChange={(e) => {
                  const newColors = [...data.brand_colors];
                  newColors[index] = e.target.value;
                  onUpdate({ brand_colors: newColors });
                }}
                placeholder={`Color ${index + 1} (e.g. #02834E)`}
                className="flex-1 border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
              />
              {data.brand_colors.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const filtered = data.brand_colors.filter((_: any, i: number) => i !== index);
                    onUpdate({ brand_colors: filtered.length > 0 ? filtered : [""] });
                  }}
                  className="text-red-500 hover:text-red-700 px-3"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        {errors?.brand_colors && (
          <p className="text-red-500 text-sm mt-1">{errors.brand_colors}</p>
        )}
        <button
          type="button"
          onClick={() => onUpdate({ brand_colors: [...data.brand_colors, ""] })}
          className="mt-4 bg-[#02834E] text-white font-medium px-5 py-2 rounded-full text-sm hover:bg-green-700 transition"
        >
          + Add Color
        </button>
      </div>

    </div>
  );
};

export default Step4_Technical;