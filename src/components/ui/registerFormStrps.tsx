import { registerSteps } from "@/utils/constants";

export default function RegisterFormSteps({ currentStep }: { currentStep: number }) {
  const totalSteps = registerSteps.length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <nav aria-label="Progress" className="w-full mt-5 px-2">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#8671D4] transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </nav>
  );
}
