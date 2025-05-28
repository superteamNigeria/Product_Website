import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Step1_BasicInfo from "./Step1_BasicInfo";
import Step2_Metrics from "./Step2_Metrics";
import Step3_Team from "./Step3_Team";
import Step4_Links from "./Step4_Links";
import ProgressIndicator from "./ProgressIndicator";

const SubmitProduct = () => {
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => Math.min(prev + 1, 4));
  const previous = () => setStep((prev) => Math.max(prev - 1, 1));

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
          {step === 1 && <Step1_BasicInfo />}
          {step === 2 && <Step2_Metrics />}
          {step === 3 && <Step3_Team />}
          {step === 4 && <Step4_Links />}
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
          {step < 4 ? (
            <button
              onClick={next}
              className="bg-[#02834E] text-white px-6 py-2 rounded-full text-sm hover:bg-green-700"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              className="bg-[#02834E] text-white px-6 py-2 rounded-full text-sm hover:bg-green-700"
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
