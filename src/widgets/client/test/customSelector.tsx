"use client"

interface Option {
  id: string
  label: string
  value: string
}

interface CustomSelectorProps {
  options: Option[]
  mode: "single" | "multiple"
  selectedIndices: number[]
  onChange: (indices: number[]) => void
}

export default function CustomSelector({ options, mode, selectedIndices, onChange }: CustomSelectorProps) {
  const handleSelect = (optionIndex: number) => {
    let newSelected: number[]

    if (mode === "single") {
      newSelected = [optionIndex]
    } else {
      if (selectedIndices.includes(optionIndex)) {
        newSelected = selectedIndices.filter((index) => index !== optionIndex)
      } else {
        newSelected = [...selectedIndices, optionIndex]
      }
    }

    onChange(newSelected)
  }

  const isSelected = (optionIndex: number) => selectedIndices.includes(optionIndex)

  return (
    <div className="space-y-3 w-full">
      {options.map((option, index) => (
        <div
          key={index}
          onClick={() => handleSelect(index)}
          className={`
            flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
            ${isSelected(index) ? "border-green-500 bg-green-50" : "border-gray-200 bg-gray-50 hover:border-gray-300"}
          `}
        >
          <div
            className={`
            flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold mr-3
            ${isSelected(index) ? "bg-green-500" : "bg-gray-400"}
          `}
          >
            {String.fromCharCode(65 + index)}
          </div>
          <span
            className={`
            text-[18px] font-medium
            ${isSelected(index) ? "text-green-800" : "text-gray-700"}
          `}
          >
            {option.label}
          </span>
        </div>
      ))}
    </div>
  )
}
