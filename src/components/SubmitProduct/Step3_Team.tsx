import React, { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
}

const Step3_Team = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    { name: "", role: "" },
  ]);

  const handleChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMember = () => {
    setMembers([...members, { name: "", role: "" }]);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Team Members</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />
      
      {members.map((member, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
        >
          {/* Name Field */}
          <div>
            <label className="block mb-1 font-medium dark:text-white">Name:</label>
            <input
              type="text"
              placeholder="e.g. Chidera Anichebe"
              value={member.name}
              onChange={(e) =>
                handleChange(index, "name", e.target.value)
              }
              className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
            />
          </div>

          {/* Role Field */}
          <div>
            <label className="block mb-1 font-medium dark:text-white">Role:</label>
            <input
              type="text"
              placeholder="e.g. Founder"
              value={member.role}
              onChange={(e) =>
                handleChange(index, "role", e.target.value)
              }
              className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
            />
          </div>
        </div>
      ))}

      {/* Add Member Button */}
      <div>
        <button
          type="button"
          onClick={addMember}
          className="bg-[#02834E] text-white font-medium px-5 py-2 rounded-full text-sm hover:bg-green-700 transition"
        >
          + Add Member
        </button>
      </div>
    </div>
  );
};

export default Step3_Team;
