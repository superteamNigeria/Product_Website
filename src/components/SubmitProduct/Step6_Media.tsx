"use client"

import type React from "react"
import { useState } from "react"
import { ImageIcon, X, Upload, Loader2 } from "lucide-react"

// Environment variables
const ENV = {
  API_BASE_URL: "https://superteamng-products-backend.vercel.app",
}

interface Props {
  data: any
  onUpdate: (data: any) => void
  errors?: Record<string, string>
}

const Step6_Media = ({ data, onUpdate, errors }: Props) => {
  const [iconUploading, setIconUploading] = useState(false)
  const [iconUploadError, setIconUploadError] = useState("")
  const [galleryUploading, setGalleryUploading] = useState(false)
  const [galleryUploadError, setGalleryUploadError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onUpdate({ [name]: value })
  }

  // Icon upload handler using the designated upload endpoint
  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setIconUploadError("Please select a valid image file.")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setIconUploadError("File size must be less than 5MB.")
      return
    }

    setIconUploading(true)
    setIconUploadError("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(`${ENV.API_BASE_URL}/api/upload/icon`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || "Failed to upload icon")
      }

      const data = await response.json()
      onUpdate({ icon: data.url })
    } catch (error) {
      console.error("Icon upload error:", error)
      setIconUploadError(error instanceof Error ? error.message : "Failed to upload icon. Please try again.")
    } finally {
      setIconUploading(false)
    }
  }

  // Gallery upload handler using the designated upload endpoint
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Validate files
    const validFiles = Array.from(files).filter((file) => {
      if (!file.type.startsWith("image/")) {
        setGalleryUploadError(`${file.name} is not a valid image file.`)
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        setGalleryUploadError(`${file.name} is too large. Maximum size is 5MB.`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    setGalleryUploading(true)
    setGalleryUploadError("")

    try {
      const uploadPromises = validFiles.map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch(`${ENV.API_BASE_URL}/api/upload/image`, {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => null)
          throw new Error(errorData?.message || `Failed to upload ${file.name}`)
        }

        const data = await response.json()
        return data.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      onUpdate({ gallery: [...(data.gallery || []), ...uploadedUrls] })
    } catch (error) {
      console.error("Gallery upload error:", error)
      setGalleryUploadError(
        error instanceof Error ? error.message : "Failed to upload one or more images. Please try again.",
      )
    } finally {
      setGalleryUploading(false)
    }
  }

  const removeGalleryImage = (index: number) => {
    const newGallery = (data.gallery || []).filter((_: any, i: number) => i !== index)
    onUpdate({ gallery: newGallery })
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Media & Assets</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />

      {/* Product Icon */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Product Icon</label>
        <div className="flex items-center space-x-4">
          {data.icon ? (
            <div className="relative">
              <img
                src={data.icon || "/placeholder.svg"}
                alt="Product icon"
                className="w-24 h-24 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
              />
              <button
                type="button"
                onClick={() => onUpdate({ icon: "" })}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                disabled={iconUploading}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              {iconUploading ? (
                <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-1">Upload Icon</span>
                </>
              )}
            </div>
          )}

          <div>
            <input
              type="file"
              id="icon-upload"
              accept="image/*"
              onChange={handleIconUpload}
              className="hidden"
              disabled={iconUploading}
            />
            <label
              htmlFor="icon-upload"
              className={`px-4 py-2 rounded-lg cursor-pointer inline-flex items-center space-x-2 text-sm font-medium transition-colors ${
                iconUploading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {iconUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>{data.icon ? "Change Icon" : "Upload Icon"}</span>
                </>
              )}
            </label>
            <p className="text-xs text-gray-500 mt-1">Recommended: 512x512px, PNG or JPG, max 5MB</p>
            {iconUploadError && <p className="text-red-500 text-xs mt-1">{iconUploadError}</p>}
          </div>
        </div>
      </div>

      {/* Gallery Images */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Gallery Images</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
          {(data.gallery || []).map((image: string, index: number) => (
            <div key={index} className="relative group">
              <img
                src={image || "/placeholder.svg"}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                disabled={galleryUploading}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <input
              type="file"
              id="gallery-upload"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
              disabled={galleryUploading}
            />
            <label
              htmlFor="gallery-upload"
              className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg"
            >
              {galleryUploading ? (
                <>
                  <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                  <span className="text-sm text-gray-500 mt-1">Uploading...</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-500 mt-1">Add Images</span>
                </>
              )}
            </label>
          </div>
        </div>

        <p className="text-xs text-gray-500">Upload screenshots, product images, etc. (PNG or JPG, max 5MB each)</p>
        {galleryUploadError && <p className="text-red-500 text-xs mt-1">{galleryUploadError}</p>}
      </div>

      {/* Explainer Video */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Explainer Video</label>
        <input
          name="explainerVideo"
          value={data.explainerVideo}
          onChange={handleChange}
          type="url"
          placeholder="e.g. https://youtube.com/watch?v=..."
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
        <p className="text-xs text-gray-500 mt-1">Link to a video that demonstrates your product</p>
      </div>

      {/* Upload Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">💡 Media Tips:</h3>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Include high-quality screenshots of your product in action</li>
          <li>• Add your logo or branding images</li>
          <li>• Consider including before/after comparisons if relevant</li>
          <li>• Keep video explanations under 3 minutes for better engagement</li>
          <li>• Use images that are at least 1200px wide for best quality</li>
          <li>• Maximum file size: 5MB per image</li>
        </ul>
      </div>
    </div>
  )
}

export default Step6_Media
