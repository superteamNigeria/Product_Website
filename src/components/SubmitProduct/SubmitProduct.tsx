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

const SubmitProduct = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    description: "",
    alias: "",
    category: "",

    // Details & Status
    verified: false,
    openSource: false,
    status: "",
    launchDate: "",
    userCount: "",
    features: [""],

    // Team
    founder: "",
    ceo: "",
    coFounders: [""],

    // Technical
    techStack: [""],
    repositoryLink: "",

    // Links & Contact
    website: "",
    xAccount: "",

    // Media & Assets
    gallery: [],
    explainerVideo: "",
    playstore: [false, ""],
    appstore: [false, ""],

    // Additional
    metadata: {},
  })

  const next = () => setStep((prev) => Math.min(prev + 1, 6))
  const previous = () => setStep((prev) => Math.max(prev - 1, 1))

  const updateFormData = (stepData: any) => {
    setFormData((prev) => ({ ...prev, ...stepData }))
  }

  const handleSubmit = async () => {
    try {
      // Validate required fields
      const requiredFields = {
        name: formData.name,
        description: formData.description,
        alias: formData.alias,
        category: formData.category,
      }

      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value || value.trim() === "")
        .map(([key, _]) => key)

      if (missingFields.length > 0) {
        alert(`Please fill in the following required fields: ${missingFields.join(", ")}`)
        return
      }

      // Show loading state
      const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement
      const originalText = submitButton?.textContent
      if (submitButton) {
        submitButton.disabled = true
        submitButton.textContent = "Submitting..."
      }

      // Transform form data to match API DTO structure
      const submitData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        alias: formData.alias.trim(),
        category: formData.category,
        verified: formData.verified || false,
        openSource: formData.openSource || false,
        isApproved: false, // Default to false as per API
        icon: "", // Will be handled separately if needed
        gallery: formData.gallery?.filter((url: string) => url.trim() !== "") || [],
        playstore: formData.playstore || [false, ""],
        appstore: formData.appstore || [false, ""],
        coFounders: formData.coFounders?.filter((cf: string) => cf.trim() !== "") || [],
        website: formData.website?.trim() || "",
        repositoryLink: formData.repositoryLink?.trim() || "",
        explainerVideo: formData.explainerVideo?.trim() || "",
        xAccount: formData.xAccount?.trim() || "",
        founder: formData.founder?.trim() || "",
        ceo: formData.ceo?.trim() || "",
        features: formData.features?.filter((f: string) => f.trim() !== "") || [],
        techStack: formData.techStack?.filter((ts: string) => ts.trim() !== "") || [],
        launchDate: formData.launchDate || "",
        userCount: formData.userCount || "",
        status: formData.status || "",
        metadata: formData.metadata || {},
      }

      console.log("Submitting product data:", submitData)

      // Make API call to submit product
      const response = await fetch("https://superteamng-products-backend.vercel.app/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      if (!response.ok) {
        let errorMessage = "Failed to submit product. Please try again."

        try {
          const errorData = await response.json()
          if (errorData.message) {
            errorMessage = Array.isArray(errorData.message) ? errorData.message.join(", ") : errorData.message
          }
        } catch (e) {
          // If we can't parse the error response, use the default message
          console.error("Error parsing error response:", e)
        }

        throw new Error(errorMessage)
      }

      const result = await response.json()
      console.log("Product submitted successfully:", result)

      // Show success message
      alert(
        "🎉 Product submitted successfully! Your submission is now under review and will be published once approved.",
      )

      // Reset form or redirect
      setFormData({
        name: "",
        description: "",
        alias: "",
        category: "",
        verified: false,
        openSource: false,
        status: "",
        launchDate: "",
        userCount: "",
        features: [""],
        founder: "",
        ceo: "",
        coFounders: [""],
        techStack: [""],
        repositoryLink: "",
        website: "",
        xAccount: "",
        gallery: [],
        explainerVideo: "",
        playstore: [false, ""],
        appstore: [false, ""],
        metadata: {},
      })

      // Reset to first step
      setStep(1)
    } catch (error) {
      console.error("Error submitting product:", error)

      let userMessage = "An error occurred while submitting your product. Please try again."
      if (error instanceof Error) {
        userMessage = error.message
      }

      alert(`❌ Submission failed: ${userMessage}`)
    } finally {
      // Restore button state
      const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement
      if (submitButton) {
        submitButton.disabled = false
        submitButton.textContent = "Submit →"
      }
    }
  }

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
          {step === 1 && <Step1_BasicInfo data={formData} onUpdate={updateFormData} />}
          {step === 2 && <Step2_Details data={formData} onUpdate={updateFormData} />}
          {step === 3 && <Step3_Team data={formData} onUpdate={updateFormData} />}
          {step === 4 && <Step4_Technical data={formData} onUpdate={updateFormData} />}
          {step === 5 && <Step5_Links data={formData} onUpdate={updateFormData} />}
          {step === 6 && <Step6_Media data={formData} onUpdate={updateFormData} />}
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
              onClick={handleSubmit}
              className="bg-[#02834E] text-white px-6 py-2 rounded-full text-sm transition-colors duration-300 hover:bg-[#6CB798] hover:text-black"
            >
              Submit →
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SubmitProduct
