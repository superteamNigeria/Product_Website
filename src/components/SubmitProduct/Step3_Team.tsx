"use client"

interface Props {
  data: any
  onUpdate: (data: any) => void
  errors?: Record<string, string>
}

const Step3_Team = ({ data, onUpdate, errors }: Props) => {
  // Updated to handle teamMembers array like CreateProductPage.jsx
  const handleTeamMemberChange = (index: number, value: string) => {
    const newTeamMembers = [...data.teamMembers]
    newTeamMembers[index] = value
    onUpdate({ teamMembers: newTeamMembers })
  }

  const addTeamMember = () => {
    onUpdate({ teamMembers: [...data.teamMembers, ""] })
  }

  const removeTeamMember = (index: number) => {
    const newTeamMembers = data.teamMembers.filter((_: any, i: number) => i !== index)
    onUpdate({ teamMembers: newTeamMembers.length > 0 ? newTeamMembers : [""] })
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Team Members</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />

      {/* Team Members */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">
          Team Members <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">Add team members' email addresses</p>

        {data.teamMembers.map((member: string, index: number) => (
          <div key={index} className="flex gap-2 mb-3">
            <input
              type="email"
              value={member}
              onChange={(e) => handleTeamMemberChange(index, e.target.value)}
              placeholder="Email address"
              className="flex-1 border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
            />
            {data.teamMembers.length > 1 && (
              <button
                type="button"
                onClick={() => removeTeamMember(index)}
                className="text-red-500 hover:text-red-700 px-3"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {errors?.teamMembers && <p className="text-red-500 text-sm mt-1">{errors.teamMembers}</p>}

        <button
          type="button"
          onClick={addTeamMember}
          className="bg-[#02834E] text-white font-medium px-5 py-2 rounded-full text-sm hover:bg-green-700 transition"
        >
          + Add Team Member
        </button>
      </div>
    </div>
  )
}

export default Step3_Team
