import React, { useState } from "react";

const Step2_Metrics = () => {
  const [form, setForm] = useState({
    monthlyUsers: "",
    volume: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Details & Metrics</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />
      
      {/* Monthly Active Users */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Number of monthly active users:</label>
        <select
          name="monthlyUsers"
          value={form.monthlyUsers}
          onChange={handleChange}
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm bg-white dark:bg-[#1E1E1E] dark:text-white"
        >
          <option value="">Please select an option</option>
          <option value="1-100">1 – 100</option>
          <option value="101-1k">101 – 1,000</option>
          <option value="1k-10k">1,001 – 10,000</option>
          <option value="10k-100k">10,001 – 100,000</option>
          <option value="100k+">100,000+</option>
        </select>
      </div>

      {/* Transaction Volume */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Transaction Volume:</label>
        <input
          name="volume"
          type="text"
          value={form.volume}
          onChange={handleChange}
          placeholder="e.g. $1,000,000 processed"
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
      </div>
    </div>
  );
};

export default Step2_Metrics;
