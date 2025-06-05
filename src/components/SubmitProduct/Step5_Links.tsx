"use client"

import type React from "react"

interface Props {
  data: any
  onUpdate: (data: any) => void
  errors?: Record<string, string>
}

const Step5_Links = ({ data, onUpdate, errors }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onUpdate({ [name]: value })
  }

  // Updated to match CreateProductPage.jsx app store handling
  const handleAppStoreChange = (field: "hasApp" | "url", value: boolean | string) => {
    const currentAppstore = data.appstore || [false, ""]
    if (field === "hasApp") {
      onUpdate({ appstore: [value, currentAppstore[1]] })
    } else {
      onUpdate({ appstore: [currentAppstore[0], value] })
    }
  }

  const handlePlayStoreChange = (field: "hasApp" | "url", value: boolean | string) => {
    const currentPlaystore = data.playstore || [false, ""]
    if (field === "hasApp") {
      onUpdate({ playstore: [value, currentPlaystore[1]] })
    } else {
      onUpdate({ playstore: [currentPlaystore[0], value] })
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Links & Contact</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />

      {/* Website */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">
          Website URL <span className="text-red-500">*</span>
        </label>
        <input
          name="website"
          value={data.website}
          onChange={handleChange}
          type="url"
          placeholder="https://example.com"
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
        {errors?.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
      </div>

      {/* X Account (Twitter) */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">X Account (Twitter)</label>
        <div className="flex items-center">
          <span className="bg-gray-100 px-4 py-3 rounded-l-full border border-r-0 border-[#E2E4E9] text-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
            @
          </span>
          <input
            type="text"
            name="xAccount"
            value={data.xAccount}
            onChange={handleChange}
            placeholder="username"
            className="flex-1 px-4 py-3 rounded-r-full border border-[#E2E4E9] focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
          />
        </div>
      </div>

      {/* Explainer Video */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Explainer Video URL</label>
        <input
          type="url"
          name="explainerVideo"
          value={data.explainerVideo}
          onChange={handleChange}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
      </div>

      {/* App Store Links */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">App Store Links</label>
        <div className="space-y-4">
          {/* iOS App Store */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={data.appstore?.[0] || false}
                onChange={(e) => handleAppStoreChange("hasApp", e.target.checked)}
                className="w-4 h-4 text-[#02834E] bg-gray-100 border-gray-300 rounded focus:ring-[#02834E] focus:ring-2"
              />
              <label className="ml-2 text-sm font-medium">Available on iOS App Store</label>
            </div>
            {data.appstore?.[0] && (
              <input
                type="url"
                value={data.appstore?.[1] || ""}
                onChange={(e) => handleAppStoreChange("url", e.target.value)}
                placeholder="https://apps.apple.com/app/your-app/id123456789"
                className="w-full border border-[#E2E4E9] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
              />
            )}
          </div>

          {/* Google Play Store */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={data.playstore?.[0] || false}
                onChange={(e) => handlePlayStoreChange("hasApp", e.target.checked)}
                className="w-4 h-4 text-[#02834E] bg-gray-100 border-gray-300 rounded focus:ring-[#02834E] focus:ring-2"
              />
              <label className="ml-2 text-sm font-medium">Available on Google Play Store</label>
            </div>
            {data.playstore?.[0] && (
              <input
                type="url"
                value={data.playstore?.[1] || ""}
                onChange={(e) => handlePlayStoreChange("url", e.target.value)}
                placeholder="https://play.google.com/store/apps/details?id=com.yourapp"
                className="w-full border border-[#E2E4E9] rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step5_Links
