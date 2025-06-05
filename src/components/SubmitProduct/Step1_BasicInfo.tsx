"use client"

import type React from "react"

interface Props {
  data: any
  onUpdate: (data: any) => void
  errors?: Record<string, string>
}

// Categories aligned with CreateProductPage.jsx
const categoryOptions = [
  { value: "DeFi", label: "DeFi" },
  { value: "NFT", label: "NFT" },
  { value: "Gaming", label: "Gaming" },
  { value: "Tools", label: "Tools" },
  { value: "Infrastructure", label: "Infrastructure" },
  { value: "Social", label: "Social" },
  { value: "Education", label: "Education" },
]

const Step1_BasicInfo = ({ data, onUpdate, errors }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onUpdate({ [name]: value })
  }

  // Handle category selection to match CreateProductPage.jsx
  const handleCategoryChange = (category: string) => {
    const currentCategories = Array.isArray(data.category) ? data.category : []

    if (currentCategories.includes(category)) {
      onUpdate({
        category: currentCategories.filter((cat) => cat !== category),
      })
    } else {
      onUpdate({
        category: [...currentCategories, category],
      })
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Basic Information</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />

      {/* Product Name */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">
          Product Name <span className="text-red-500">*</span>
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
        {errors?.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">
          Description <span className="text-red-500">*</span>
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
        {errors?.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Alias/Short Name */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">
          Alias/Short Name <span className="text-red-500">*</span>
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
        {errors?.alias && <p className="text-red-500 text-sm mt-1">{errors.alias}</p>}
        <p className="text-xs text-gray-500 mt-1">This will be used in URLs and must be unique</p>
      </div>

      {/* Categories - Updated to match CreateProductPage.jsx */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">
          Categories <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {categoryOptions.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => handleCategoryChange(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                data.category && data.category.includes(category.value)
                  ? "bg-[#02834E] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        {errors?.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>
    </div>
  )
}

export default Step1_BasicInfo
