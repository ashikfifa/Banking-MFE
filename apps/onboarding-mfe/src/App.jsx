import { useEffect, useRef, useState } from "react";
import { Stepper } from "@banking-mf/ui-library";
import { useBankingStore } from "@banking-mf/store";
import { AddressStep } from "./components/AddressStep.jsx";
import { IncomeStep } from "./components/IncomeStep.jsx";
import { OnboardingSubmitted } from "./components/OnboardingSubmitted.jsx";
import { PersonalStep } from "./components/PersonalStep.jsx";
import { ReviewStep } from "./components/ReviewStep.jsx";
import { onboardingSteps, validateStep } from "./lib/onboardingValidation.js";

export default function App() {
  const onboardingForm = useBankingStore((state) => state.onboardingForm);
  const onboardingProgress = useBankingStore((state) => state.onboardingProgress);
  const updateOnboardingSection = useBankingStore((state) => state.updateOnboardingSection);
  const setOnboardingStep = useBankingStore((state) => state.setOnboardingStep);
  const setNidFile = useBankingStore((state) => state.setNidFile);
  const setLivenessStatus = useBankingStore((state) => state.setLivenessStatus);
  const submitOnboarding = useBankingStore((state) => state.submitOnboarding);
  const resetOnboarding = useBankingStore((state) => state.resetOnboarding);

  const [errors, setErrors] = useState({});
  const verificationTimerRef = useRef(null);

  useEffect(
    () => () => {
      window.clearTimeout(verificationTimerRef.current);
    },
    []
  );

  const currentStep = onboardingProgress.step;
  const documents = onboardingForm.documents;

  const handleNext = () => {
    const nextErrors = validateStep(currentStep, onboardingForm);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setOnboardingStep(Math.min(4, currentStep + 1));
  };

  const handleCapture = (imageData) => {
    window.clearTimeout(verificationTimerRef.current);
    setLivenessStatus("verifying", imageData);
    verificationTimerRef.current = window.setTimeout(() => {
      setLivenessStatus("verified", imageData);
    }, 2400);
  };

  const handleSubmit = () => {
    const reviewErrors = {
      ...validateStep(1, onboardingForm),
      ...validateStep(2, onboardingForm),
      ...validateStep(3, onboardingForm)
    };

    if (Object.keys(reviewErrors).length > 0) {
      setErrors(reviewErrors);
      return;
    }

    setErrors({});
    submitOnboarding();
  };

  if (onboardingProgress.isSubmitted) {
    return (
      <OnboardingSubmitted
        form={onboardingForm}
        documents={documents}
        onReset={resetOnboarding}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Stepper steps={onboardingSteps} currentStep={currentStep} />

      {currentStep === 1 ? (
        <PersonalStep
          personal={onboardingForm.personal}
          documents={documents}
          errors={errors}
          onPersonalChange={(values) => updateOnboardingSection("personal", values)}
          onFileSelect={setNidFile}
          onCapture={handleCapture}
          onContinue={handleNext}
        />
      ) : null}

      {currentStep === 2 ? (
        <AddressStep
          address={onboardingForm.address}
          errors={errors}
          onChange={(values) => updateOnboardingSection("address", values)}
          onBack={() => setOnboardingStep(1)}
          onContinue={handleNext}
        />
      ) : null}

      {currentStep === 3 ? (
        <IncomeStep
          income={onboardingForm.income}
          errors={errors}
          onChange={(values) => updateOnboardingSection("income", values)}
          onBack={() => setOnboardingStep(2)}
          onContinue={handleNext}
        />
      ) : null}

      {currentStep === 4 ? (
        <ReviewStep
          form={onboardingForm}
          documents={documents}
          onBack={() => setOnboardingStep(3)}
          onSubmit={handleSubmit}
        />
      ) : null}
    </div>
  );
}
