import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Step1_BasicInfo from "./Step1_BasicInfo";
import Step2_Details from "./Step2_Metrics";
import Step3_Team from "./Step3_Team";
import Step4_Technical from "./Step4_Technical";
import Step5_Links from "./Step5_Links";
import Step6_Media from "./Step6_Media";
import ProgressIndicator from "./ProgressIndicator";

const SubmitProduct = () => {
  const [step, setStep] = useState(1);
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
    metadata: {}
  });

  const next = () => setStep((prev) => Math.min(prev + 1, 6));
  const previous = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const handleSubmit = async () => {
    try {
      // Transform form data to match DTO structure
      const submitData = {
        name: formData.name,
        description: formData.description,
        alias: formData.alias,
        category: formData.category,
        verified: formData.verified,
        openSource: formData.openSource,
        gallery: formData.gallery,
        playstore: formData.playstore,
        appstore: formData.appstore,
        coFounders: formData.coFounders.filter(cf => cf.trim() !== ""),
        website: formData.website,
        repositoryLink: formData.repositoryLink,
        explainerVideo: formData.explainerVideo,
        xAccount: formData.xAccount,
        founder: formData.founder,
        ceo: formData.ceo,
        features: formData.features.filter(f => f.trim() !== ""),
        techStack: formData.techStack.filter(ts => ts.trim() !== ""),
        launchDate: formData.launchDate,
        userCount: formData.userCount,
        status: formData.status,
        metadata: formData.metadata
      };

      console.log("Submitting product data:", submitData);
      // Add your API call here
      alert("Product submitted successfully!");
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Error submitting product. Please try again.");
    }
  };

  return (
    <div className="flex-1 lg:px-[80px] lg:py-[48px] dark:bg-[#0A0D14]">
      <Header />
      <div className="mx-auto px-6 py-8">
        <h1 className="text-center text-2xl font-bold">
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
            <button
              onClick={previous}
              className="text-[#02834E] font-medium hover:underline"
            >
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
  );
};

export default SubmitProduct;