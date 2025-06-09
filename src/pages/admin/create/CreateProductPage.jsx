"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Check, X, Home, Info, Phone, Menu, ImageIcon, Plus, Save } from "lucide-react"
import { logo, logoDark, whiteLogo } from "../../../constants/images";
import Button from "../../../components/ui/Button";
import { Upload, Loader2 } from "lucide-react";


// Environment variables simulation
const ENV = {
  API_BASE_URL: "https://superteamng-products-backend.vercel.app",
}

const CreateProduct = () => {
  // Form state
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    alias: "",
    category: [],
    verified: false,
    openSource: false,
    isApproved: true, // Auto-approved for admin creation
    icon: "",
    gallery: [],
    playstore: ["", ""],
    appstore: ["", ""],
    teamMembers: [""],
    website: "",
    explainerVideo: "",
    xAccount: "",
    features: [""],
    techStack: [""],
    launchDate: "",
    userCount: "",
    status: "Live",
    brand_colors: ["#10B981"],
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [iconUploading, setIconUploading] = useState(false);
  const [iconUploadError, setIconUploadError] = useState("");
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryUploadError, setGalleryUploadError] = useState("");

  // Categories and statuses
  const categories = ["DeFi", "DePIN", "PayFi", "RWAs", "InfoFi", "Stablecoins", "Gaming", "AI"]
  const statuses = ["Live", "Beta", "Development", "Deprecated"]

  // Form validation
  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Product name is required"
        if (!formData.description.trim()) newErrors.description = "Description is required"
        if (!formData.alias.trim()) newErrors.alias = "Alias is required"
        break
      case 2:
        if (formData.category.length === 0) newErrors.category = "At least one category is required"
        break
      case 3:
        if (formData.teamMembers.length === 0 || !formData.teamMembers[0].trim()) {
          newErrors.teamMembers = "At least one team member is required"
        }
        break
      case 4:
        // Technical info validation (optional)
        break
      case 5:
        if (!formData.website.trim()) newErrors.website = "Website URL is required"
        break
      case 6:
        // Media validation (optional)
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation handlers
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  // Form input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleCategoryChange = (category) => {
    setFormData((prev) => {
      if (prev.category.includes(category)) {
        return {
          ...prev,
          category: prev.category.filter((cat) => cat !== category),
        }
      } else {
        return {
          ...prev,
          category: [...prev.category, category],
        }
      }
    })
  }

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const newArray = [...prev[field]]
      newArray[index] = value
      return {
        ...prev,
        [field]: newArray,
      }
    })
  }

  const addArrayItem = (field, defaultValue = "") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleColorChange = (index, color) => {
    setFormData((prev) => {
      const newColors = [...prev.brand_colors]
      newColors[index] = color
      return {
        ...prev,
        brand_colors: newColors,
      }
    })
  }

  const addColor = () => {
    setFormData((prev) => ({
      ...prev,
      brand_colors: [...prev.brand_colors, "#FFFFFF"],
    }))
  }

  const removeColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      brand_colors: prev.brand_colors.filter((_, i) => i !== index),
    }))
  }

  const handleIconUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setIconUploadError("Please select a valid image file.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setIconUploadError("File size must be less than 5MB.");
      return;
    }

    setIconUploading(true);
    setIconUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${ENV.API_BASE_URL}/api/upload/icon`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to upload icon");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, icon: data.url }));
    } catch (error) {
      console.error("Icon upload error:", error);
      setIconUploadError(error instanceof Error ? error.message : "Failed to upload icon. Please try again.");
    } finally {
      setIconUploading(false);
    }
  };

  // Gallery upload handler using the designated upload endpoint
  const handleGalleryUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validate files
    const validFiles = Array.from(files).filter((file) => {
      if (!file.type.startsWith("image/")) {
        setGalleryUploadError(`${file.name} is not a valid image file.`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setGalleryUploadError(`${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setGalleryUploading(true);
    setGalleryUploadError("");

    try {
      const uploadPromises = validFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${ENV.API_BASE_URL}/api/upload/image`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `Failed to upload ${file.name}`);
        }

        const data = await response.json();
        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...uploadedUrls],
      }));
    } catch (error) {
      console.error("Gallery upload error:", error);
      setGalleryUploadError(
        error instanceof Error ? error.message : "Failed to upload one or more images. Please try again."
      );
    } finally {
      setGalleryUploading(false);
    }
  };

  // Update the removeGalleryImage function to match
  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // Form submission
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const apiData = {
        ...formData,
        brandColors: formData.brand_colors, 
      }
      delete apiData.brand_colors 

      const response = await fetch(`${ENV.API_BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      })

      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.status}`)
      }

      const data = await response.json()
      setSubmitSuccess(true)

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          description: "",
          alias: "",
          category: [],
          verified: false,
          openSource: false,
          isApproved: true,
          icon: "",
          gallery: [],
          playstore: ["", ""],
          appstore: ["", ""],
          teamMembers: [""],
          website: "",
          explainerVideo: "",
          xAccount: "",
          features: [""],
          techStack: [""],
          launchDate: "",
          userCount: "",
          status: "Live",
          brand_colors: ["#10B981"],
        })
        setCurrentStep(1)
        setSubmitSuccess(false)
      }, 3000)
    } catch (err) {
      console.error("Submission Error:", err)
      setSubmitError(err.message || "Failed to create product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Step indicators
  const StepIndicator = ({ currentStep }) => {
    const steps = [
      { number: 1, title: "Basic Information" },
      { number: 2, title: "Details & Status" },
      { number: 3, title: "Team Members" },
      { number: 4, title: "Technical Info" },
      { number: 5, title: "Links & Contact" },
      { number: 6, title: "Media & Assets" },
    ]

    return (
      <div className="flex justify-center mb-12">
        <div className="flex items-center overflow-x-auto md:overflow-hidden">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex flex-col items-center ${index > 0 ? "ml-4" : ""}`}
                onClick={() => validateStep(currentStep) && setCurrentStep(step.number)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                    ${
                      currentStep === step.number
                        ? "bg-green-500 text-white"
                        : currentStep > step.number
                          ? "bg-green-100 text-green-800 cursor-pointer"
                          : "bg-gray-100 text-gray-500"
                    }`}
                >
                  {step.number}
                </div>
                <div className="text-xs mt-2 text-center w-24">{step.title}</div>
              </div>

              {index < steps.length - 1 && (
                <div className={`w-24 h-0.5 mx-1 ${currentStep > index + 1 ? "bg-green-500" : "bg-gray-200"}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  // Header Component
  const Header = () => (

    <header className="bg-white border-b border-gray-200 py-4  px-0 md:px-6">

      {/* Mobile */}
      <section className="w-screen h-[80px] flex items-center justify-between  bg-black md:hidden">
        <a to="/" className="flex-shrink-0">
          <img
            src={whiteLogo}
            alt="logo"
            className="h-8 w-auto sm:w-[39px] sm:h-[30px] md:hidden"
          />
          <img src={logo} alt="logo" className="hidden md:block h-8 w-auto" />
        </a>
        <div className="flex items-center gap-2">
          {/* <ThemeToggle /> */}
          <button className="p-2" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-green-base" />
            ) : (
              <Menu className="w-6 h-6 text-green-base" />
            )}
          </button>
        </div>

        {/* menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-[80px] right-4 w-[149.69px] h-[192.8px] rounded-[24px] p-[17.42px] bg-[#525866] flex flex-col gap-[3px] z-50 items-center justify-center">
            <div className="flex items-center space-x-4 flex-col">
              <a href={"/admin"} className="mb-2">
                <Button
                  title="Back"
                  icon={<ChevronLeft />}
                  styles="bg-green-base text-[#E6F3ED] justify-middle font-regular text-[16px] leading-relaxed w-full text-balance"
                />
              </a>
            </div>
          </div>
        )}

      </section>

      {/*desktop*/}
      <div className="hidden items-center justify-between md:flex">
        <div className="flex items-center gap-4">
          <a href="/" className="flex-shrink-0">
            {/* <img src={whiteLogo} alt="logo" className="h-8 w-auto dark:hidden" /> */}
            <img
              src={logo}
              alt="logo"
              className="h-8 w-auto"
            />
          </a>
          <div className="flex items-center bg-neutral-200 dark:bg-[#20232D] px-4 py-2.5 rounded-[17px]">
            <ul className="flex space-x-6">
              <a href='/'>
              <li className="text-black dark:text-white hover:text-green-darker dark:hover:text-green-darker font-semibold cursor-pointer text-sm whitespace-nowrap">
                Home
              </li>
              </a>
              <a href='/'>
              <li className="text-black dark:text-white font-semibold hover:text-green-darker dark:hover:text-green-darker cursor-pointer text-sm whitespace-nowrap">
                About
              </li>
              </a>
              <a href='/'>
              <li className="text-black dark:text-white font-semibold hover:text-green-darker dark:hover:text-green-darker cursor-pointer text-sm whitespace-nowrap">
                Contact Us
              </li>
              </a>
            </ul>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="/admin"
            className="flex items-center space-x-2 bg-[#02834e] text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Go Back</span>
          </a>
        </div>
      </div>

      
    </header>
  )

  // Form steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Chatter"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed description of your product, its purpose, and what problems it solves..."
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.description ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alias/Short Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="alias"
                  value={formData.alias}
                  onChange={handleInputChange}
                  placeholder="e.g. chatter-app (used for URL slugs)"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.alias ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {errors.alias && <p className="mt-1 text-sm text-red-500">{errors.alias}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Details & Status</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categories <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.category.includes(category)
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
              </div>

              <div className="flex space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="verified"
                    name="verified"
                    checked={formData.verified}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="verified" className="ml-2 text-sm text-gray-700">
                    Verified
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="openSource"
                    name="openSource"
                    checked={formData.openSource}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="openSource" className="ml-2 text-sm text-gray-700">
                    Open Source
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Launch Date</label>
                <input
                  type="date"
                  name="launchDate"
                  value={formData.launchDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Count</label>
                <input
                  type="text"
                  name="userCount"
                  value={formData.userCount}
                  onChange={handleInputChange}
                  placeholder="e.g. 10000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Colors</label>
                <div className="space-y-2">
                  {formData.brand_colors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="w-10 h-10 rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeColor(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addColor}
                    className="px-4 py-2 text-sm text-green-600 hover:text-green-800"
                  >
                    + Add another color
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team Members <span className="text-red-500">*</span>
              </label>
              {formData.teamMembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="email"
                    value={member}
                    onChange={(e) => handleArrayChange("teamMembers", index, e.target.value)}
                    placeholder="Email address"
                    className={`flex-1 px-4 py-3 rounded-lg border ${
                      errors.teamMembers && index === 0 ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("teamMembers", index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {errors.teamMembers && <p className="mt-1 text-sm text-red-500">{errors.teamMembers}</p>}
              <button
                type="button"
                onClick={() => addArrayItem("teamMembers")}
                className="px-4 py-2 text-sm text-green-600 hover:text-green-800"
              >
                + Add another team member
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Technical Info</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleArrayChange("features", index, e.target.value)}
                      placeholder="Feature description"
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("features", index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("features")}
                  className="px-4 py-2 text-sm text-green-600 hover:text-green-800"
                >
                  + Add another feature
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
                {formData.techStack.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleArrayChange("techStack", index, e.target.value)}
                      placeholder="Technology name"
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("techStack", index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("techStack")}
                  className="px-4 py-2 text-sm text-green-600 hover:text-green-800"
                >
                  + Add another technology
                </button>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Links & Contact</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.website ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">X Account (Twitter)</label>
                <div className="flex items-center">
                  <span className="bg-gray-100 px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 text-gray-500">
                    @
                  </span>
                  <input
                    type="text"
                    name="xAccount"
                    value={formData.xAccount}
                    onChange={handleInputChange}
                    placeholder="username"
                    className="flex-1 px-4 py-3 rounded-r-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Explainer Video URL</label>
                <input
                  type="url"
                  name="explainerVideo"
                  value={formData.explainerVideo}
                  onChange={handleInputChange}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">App Store Links</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      <input
                        type="checkbox"
                        id="hasPlaystore"
                        checked={!!formData.playstore[0]}
                        onChange={(e) => handleArrayChange("playstore", 0, e.target.checked ? "true" : "")}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor="hasPlaystore" className="ml-2 text-sm text-gray-700">
                        Play Store
                      </label>
                    </div>
                    {formData.playstore[0] && (
                      <input
                        type="url"
                        value={formData.playstore[1]}
                        onChange={(e) => handleArrayChange("playstore", 1, e.target.value)}
                        placeholder="https://play.google.com/store/apps/..."
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    )}
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      <input
                        type="checkbox"
                        id="hasAppstore"
                        checked={!!formData.appstore[0]}
                        onChange={(e) => handleArrayChange("appstore", 0, e.target.checked ? "true" : "")}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor="hasAppstore" className="ml-2 text-sm text-gray-700">
                        App Store
                      </label>
                    </div>
                    {formData.appstore[0] && (
                      <input
                        type="url"
                        value={formData.appstore[1]}
                        onChange={(e) => handleArrayChange("appstore", 1, e.target.value)}
                        placeholder="https://apps.apple.com/app/..."
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 6:
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Media & Assets</h2>

      {/* Product Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Icon</label>
          <div className="flex items-center space-x-4">
            {formData.icon ? (
              <div className="relative">
                <img
                  src={formData.icon}
                  alt="Product icon"
                  className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, icon: "" }))}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  disabled={iconUploading}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50">
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
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
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
                    <span>{formData.icon ? "Change Icon" : "Upload Icon"}</span>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {formData.gallery.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
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

            <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50">
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
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors rounded-lg"
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

        {/* Upload Tips */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">💡 Media Tips:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
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

      default:
        return null
    }
  }

  // Navigation buttons
  const NavigationButtons = () => (
    <div className="flex justify-between mt-8">
      {currentStep > 1 ? (
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>
      ) : (
        <div></div>
      )}

      {currentStep < 6 ? (
        <button
          type="button"
          onClick={nextStep}
          className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-lg transition-colors"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Submit Product
            </>
          )}
        </button>
      )}
    </div>
  )

  // Success message
  const SuccessMessage = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Product Created Successfully!</h3>
          <p className="text-gray-600 mb-6">Your product has been created and is now approved in the system.</p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Submit a New <span className="text-green-600">Product</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Fill out the form below to have your product featured in the SuperteamNG Products Portal.
          </p>
        </div>

        <StepIndicator currentStep={currentStep} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {renderStep()}
          <NavigationButtons />
        </div>
      </main>

      {submitSuccess && <SuccessMessage />}

      {submitError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p>{submitError}</p>
        </div>
      )}
    </div>
  )
}

export default CreateProduct
