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
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
    brand_colors: [""],
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
  });

  const updateFormData = (stepData: any) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setErrors({});
  };

  const validateStep = () => {
    const stepErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        ["name", "description", "alias", "category"].forEach((field) => {
          if (!formData[field]?.trim()) {
            stepErrors[field] = "This field is required.";
          }
        });
        break;

      case 2:
        ["status", "launchDate", "userCount"].forEach((field) => {
          if (!formData[field]?.trim()) {
            stepErrors[field] = "This field is required.";
          }
        });
        if (!formData.features?.some((f) => f.trim())) {
          stepErrors.features = "At least one feature is required.";
        }
        break;

      case 3:
        if (!formData.founder?.trim()) {
          stepErrors.founder = "Founder name is required.";
        }
        break;

      case 4:
        if (!formData.techStack?.some((t) => t.trim())) {
          stepErrors.techStack = "At least one tech stack is required.";
        }
        if (!formData.brand_colors?.some((c) => c.trim())) {
          stepErrors.brand_colors = "At least one brand color is required.";
        }
        break;

      case 5:
        if (!formData.website?.trim()) {
          stepErrors.website = "Website is required.";
        } else if (!/^https?:\/\/.+/.test(formData.website)) {
          stepErrors.website = "Website must be a valid URL.";
        }

        if (!formData.xAccount?.trim()) {
          stepErrors.xAccount = "X account is required.";
        } else if (
          !(formData.xAccount.startsWith("@") || /^https?:\/\/.+/.test(formData.xAccount))
        ) {
          stepErrors.xAccount = "Must start with @ or be a valid URL.";
        }
        break;

      case 6:
        if (!formData.explainerVideo?.trim()) {
          stepErrors.explainerVideo = "Explainer video is required.";
        } else if (!/^https?:\/\/.+/.test(formData.explainerVideo)) {
          stepErrors.explainerVideo = "Explainer video must be a valid URL.";
        }

        if (!formData.gallery || formData.gallery.length === 0) {
          stepErrors.gallery = "At least one image URL is required.";
        } else {
          const hasInvalidGalleryItem = formData.gallery.some(
            (url: string) => !/^https?:\/\/.+/.test(url.trim())
          );
          if (hasInvalidGalleryItem) {
            stepErrors.gallery = "One or more gallery items are invalid URLs.";
          }
        }
        break;

    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 6));
    }
  };

  const previous = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
      const originalText = submitButton?.textContent;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
      }

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
        brand_colors: formData.brand_colors?.filter((c) => c.trim()) || [],
        launchDate: formData.launchDate || "",
        userCount: formData.userCount || "",
        status: formData.status || "",
        metadata: formData.metadata || {},
      };

      const response = await fetch("https://superteamng-products-backend.vercel.app/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message
          ? Array.isArray(errorData.message)
            ? errorData.message.join(", ")
            : errorData.message
          : "Failed to submit product.";
        throw new Error(errorMessage);
      }

      alert("🎉 Product submitted successfully! Your submission is now under review.");
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
        brand_colors: [""],
        metadata: {},
      });
      setStep(1);
    } catch (error: any) {
      console.error("Error submitting product:", error)

      let userMessage = "An error occurred while submitting your product. Please try again."
      if (error instanceof Error) {
        userMessage = error.message
      }
      alert(`❌ Submission failed: ${error.message}`);
    } finally {
      const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit →";
      }
    }
  };

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
              className="bg-[#02834E] text-white px-6 py-2 rounded-full text-sm transition-colors duration-300 hover:bg-[#6CB798] hover:text-black"
            >
              Submit →
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitProduct;
