"use client"

import { useState } from "react"
import Header from "../Header"
import Footer from "../Footer"
import Step1_BasicInfo from "./Step1_BasicInfo"
import Step2_Details from "./Step2_Metrics"
import Step3_Team from "./Step3_Team"
import Step4_Technical from "./Step4_Technical"
import Step5_Links from "./Step5_Links"
import Step6_Media from "./Step6_Media"
import ProgressIndicator from "./ProgressIndicator"
import { Check } from "lucide-react"

// Environment variables simulation
const ENV = {
  API_BASE_URL: "https://superteamng-products-backend.vercel.app",
}

const SubmitProduct = () => {
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Updated form data structure to match CreateProductPage.jsx
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    description: "",
    alias: "",
    category: [],

    // Details & Status
    verified: false,
    openSource: false,
    isApproved: false,
    status: "Live",
    launchDate: "",
    userCount: "",
    features: [""],
    brand_colors: ["#10B981"],

    // Team
    teamMembers: [""],

    // Technical
    techStack: [""],
    repositoryLink: "",

    // Links & Contact
    website: "",
    xAccount: "",
    explainerVideo: "",

    // Media & Assets
    icon: "",
    gallery: [],
    playstore: [false, ""],
    appstore: [false, ""],
  })

  const updateFormData = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }))
    setErrors({})
  }

  // Validation function aligned with CreateProductPage.jsx
  const validateStep = (currentStep) => {
    const newErrors = {}

    switch (currentStep) {
      case 1:
        if (!formData.name?.trim()) newErrors.name = "Product name is required"
        if (!formData.description?.trim()) newErrors.description = "Description is required"
        if (!formData.alias?.trim()) newErrors.alias = "Alias is required"
        if (!Array.isArray(formData.category) || formData.category.length === 0) {
          newErrors.category = "At least one category is required"
        }
        break
      case 2:
        if (!formData.status) newErrors.status = "Status is required"
        break
      case 3:
        if (
          !Array.isArray(formData.teamMembers) ||
          formData.teamMembers.length === 0 ||
          !formData.teamMembers[0]?.trim()
        ) {
          newErrors.teamMembers = "At least one team member is required"
        }
        break
      case 4:
        if (!Array.isArray(formData.techStack) || !formData.techStack.some((tech) => tech?.trim())) {
          newErrors.techStack = "At least one tech stack is required"
        }
        break
      case 5:
        if (!formData.website?.trim()) newErrors.website = "Website URL is required"
        break
      case 6:
        // Media validation (optional)
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const next = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 6))
    }
  }

  const previous = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  // Form submission handler aligned with CreateProductPage.jsx
  const handleSubmit = async () => {
    if (!validateStep(step)) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Format data according to API requirements
      const submitData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        alias: formData.alias.trim(),
        category: formData.category, // Already an array
        verified: Boolean(formData.verified),
        openSource: Boolean(formData.openSource),
        isApproved: false, // Default to false for user submissions
        icon: formData.icon || "",
        gallery: Array.isArray(formData.gallery) ? formData.gallery.filter((url) => url && url.trim()) : [],
        playstore: Array.isArray(formData.playstore) ? formData.playstore : [false, ""],
        appstore: Array.isArray(formData.appstore) ? formData.appstore : [false, ""],
        teamMembers: Array.isArray(formData.teamMembers)
          ? formData.teamMembers.filter((member) => member && member.trim())
          : [],
        website: formData.website?.trim() || "",
        explainerVideo: formData.explainerVideo?.trim() || "",
        xAccount: formData.xAccount?.trim() || "",
        features: Array.isArray(formData.features)
          ? formData.features.filter((feature) => feature && feature.trim())
          : [],
        techStack: Array.isArray(formData.techStack) ? formData.techStack.filter((tech) => tech && tech.trim()) : [],
        launchDate: formData.launchDate || "",
        userCount: formData.userCount || "",
        status: formData.status || "Live",
        brandColors: Array.isArray(formData.brand_colors)
          ? formData.brand_colors.filter((color) => color && color.trim())
          : ["#10B981"],
        metadata: {},
      }

      // Log the data being sent for debugging
      console.log("Submitting data:", JSON.stringify(submitData, null, 2))

      const response = await fetch(`${ENV.API_BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        // Get detailed error information
        let errorMessage = `Failed to create product: ${response.status}`
        try {
          const errorData = await response.json()
          if (errorData.message) {
            if (Array.isArray(errorData.message)) {
              errorMessage = errorData.message.join(", ")
            } else {
              errorMessage = errorData.message
            }
          }
        } catch (parseError) {
          console.error("Error parsing response:", parseError)
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()
      console.log("Product created successfully:", result)

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
          isApproved: false,
          icon: "",
          gallery: [],
          playstore: [false, ""],
          appstore: [false, ""],
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
        setStep(1)
        setSubmitSuccess(false)
      }, 3000)
    } catch (err) {
      console.error("Submission Error:", err)
      setSubmitError(err.message || "Failed to create product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success message component aligned with CreateProductPage.jsx
  const SuccessMessage = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl dark:bg-[#1E1E1E] dark:text-white">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 dark:bg-green-900">
            <Check className="w-8 h-8 text-green-600 dark:text-green-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">Product Submitted Successfully!</h3>
          <p className="text-gray-600 mb-6 dark:text-gray-300">
            Your product has been submitted and is now under review.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="px-6 py-3 bg-[#02834E] hover:bg-green-700 text-white rounded-full transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex-1 lg:px-[80px] lg:py-[48px] dark:bg-[#0A0D14]">
      <Header />
      <div className="mx-auto px-6 py-8">
        <h1 className="text-center text-2xl font-bold dark:text-white">
          Submit a New <span className="text-[#02834E] italic">Product</span>
        </h1>
        <p className="text-center mt-2 text-sm text-[#868C98] dark:text-gray-400">
          Fill out the form below to have your product featured in the SuperteamNG Products Portal.
        </p>

        <ProgressIndicator step={step} />

        <div className="mt-8">
          {step === 1 && <Step1_BasicInfo data={formData} onUpdate={updateFormData} errors={errors} />}
          {step === 2 && <Step2_Details data={formData} onUpdate={updateFormData} errors={errors} />}
          {step === 3 && <Step3_Team data={formData} onUpdate={updateFormData} errors={errors} />}
          {step === 4 && <Step4_Technical data={formData} onUpdate={updateFormData} errors={errors} />}
          {step === 5 && <Step5_Links data={formData} onUpdate={updateFormData} errors={errors} />}
          {step === 6 && <Step6_Media data={formData} onUpdate={updateFormData} errors={errors} />}
        </div>

        <div className="flex justify-between mt-12">
          {step > 1 && (
            <button onClick={previous} className="text-[#02834E] font-medium hover:underline">
              ← Previous
            </button>
          )}
          {step < 6 ? (
            <button
              onClick={next}
              className="bg-[#02834E] text-white px-6 py-2 rounded-full text-sm hover:bg-green-700"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#02834E] text-white px-6 py-2 rounded-full text-sm transition-colors duration-300 hover:bg-[#6CB798] hover:text-black disabled:bg-green-300 disabled:text-white disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit →"}
            </button>
          )}
        </div>
      </div>

      {submitSuccess && <SuccessMessage />}

      {submitError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p>{submitError}</p>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default SubmitProduct
