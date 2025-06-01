import React from "react";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
}

const Step3_Team: React.FC<Props> = ({ data, onUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleCoFounderChange = (index: number, value: string) => {
    const newCoFounders = [...data.coFounders];
    newCoFounders[index] = value;
    onUpdate({ coFounders: newCoFounders });
  };

  const addCoFounder = () => {
    onUpdate({ coFounders: [...data.coFounders, ""] });
  };

  const removeCoFounder = (index: number) => {
    const newCoFounders = data.coFounders.filter((_: any, i: number) => i !== index);
    onUpdate({ coFounders: newCoFounders.length > 0 ? newCoFounders : [""] });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Team Members</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />

      {/* Founder */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Founder:</label>
        <input
          name="founder"
          value={data.founder}
          onChange={handleChange}
          type="text"
          placeholder="e.g. John Doe"
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
      </div>

      {/* CEO */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">CEO:</label>
        <input
          name="ceo"
          value={data.ceo}
          onChange={handleChange}
          type="text"
          placeholder="e.g. Jane Smith"
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
        <p className="text-xs text-gray-500 mt-1">Leave empty if same as founder</p>
      </div>

      {/* Co-Founders */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Co-Founders:</label>
        <p className="text-xs text-gray-500 mb-3">Add any co-founders (optional)</p>
        {data.coFounders.map((coFounder: string, index: number) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="text"
              value={coFounder}
              onChange={(e) => handleCoFounderChange(index, e.target.value)}
              placeholder={`Co-Founder ${index + 1}`}
              className="flex-1 border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
            />
            {data.coFounders.length > 1 && (
              <button
                type="button"
                onClick={() => removeCoFounder(index)}
                className="text-red-500 hover:text-red-700 px-3"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addCoFounder}
          className="bg-[#02834E] text-white font-medium px-5 py-2 rounded-full text-sm hover:bg-green-700 transition"
        >
          + Add Co-Founder
        </button>
      </div>
    </div>
  );
};

export default Step3_Team;