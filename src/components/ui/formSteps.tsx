import { steps } from "@/utils/constants";

export default function FormSteps({ currentStep }: { currentStep: number }) {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="space-y-4 md:flex md:space-x-8 md:space-y-0 mt-4"
      >
        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isCurrent = currentStep === index;
          const stepClass = isCompleted
            ? "text-white border-yellow-500 bg-yellow-500"
            : isCurrent
            ? "text-white border-[#A75815] bg-[#8671D4]"
            : "text-gray-500 border-gray-500";
          const borderClass = isCompleted
            ? "border-yellow-500"
            : isCurrent
            ? "border-[#8671D4]"
            : "border-gray-200";

          return (
            <li key={step.name} className="md:flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span
                    className={`text-sm font-medium ${stepClass} transition-colors border px-2 py-1 rounded-lg`}
                  >
                    {step.id}
                  </span>
                  <span className="text-sm font-medium ml-3">{step.name}</span>
                </div>
                <div
                  className={`flex-1 h-1 ml-3 transition-colors ${borderClass} ${
                    index < steps.length - 1 ? "md:border-t-4" : ""
                  }`}
                ></div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
