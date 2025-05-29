import React from "react";

interface Props {
  step: number;
}

const steps = [
  { label: "Basic Information" },
  { label: "Details & Metrics" },
  { label: "Team Members" },
  { label: "Links & Contact" },
];

const ProgressIndicator: React.FC<Props> = ({ step }) => {
  const progress = (step - 1) / (steps.length - 1);

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="relative w-full max-w-[880px] px-4">
        {/* Connecting Line (Base) */}
        <div className="absolute top-[18px] left-[calc(4.5rem)] right-[calc(4.5rem)] h-[2px] bg-[#D9D9D9] z-0" />

        {/* Connecting Line (Progress) */}
        <div
          className="absolute top-[18px] left-[calc(4.5rem)] h-[2px] bg-[#02834E] z-10 transition-all duration-300"
          style={{
            width: `calc(${progress * 100}% - ${progress * 9}rem)`, // adjusts for circle spacing
          }}
        />

        {/* Step Circles + Labels */}
        <div className="relative z-20 flex justify-between">
          {steps.map((s, index) => {
            const isActive = step === index + 1;
            const isCompleted = step > index + 1;

            return (
              <div key={index} className="flex flex-col items-center w-[72px]">
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#02834E] border-[#02834E] text-white"
                      : isCompleted
                      ? "bg-[#6CB798] border-[#6CB798] text-white"
                      : "bg-white border-[#D9D9D9] text-[#868C98]"
                  }`}
                >
                  {index + 1}
                </div>
                <p className="text-xs mt-2 text-center text-[#868C98] leading-tight">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
