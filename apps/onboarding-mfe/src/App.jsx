import { useEffect, useRef, useState } from "react";
import {
  Button,
  CameraPreview,
  Card,
  FileUploader,
  Input,
  Loader,
  Stepper
} from "@banking-mf/ui-library";
import { useBankingStore } from "@banking-mf/store";

const steps = ["Personal", "Address", "Income", "Review"];

function validateStep(step, form) {
  const errors = {};

  if (step === 1) {
    if (!form.personal.fullName.trim()) {
      errors.fullName = "Full name is required.";
    }
    if (!form.personal.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required.";
    }
    if (!form.personal.phone.trim()) {
      errors.phone = "Phone number is required.";
    }
    if (!form.personal.email.trim()) {
      errors.email = "Email is required.";
    }
    if (!form.documents.nidFront) {
      errors.nidFront = "NID front image is required.";
    }
    if (!form.documents.nidBack) {
      errors.nidBack = "NID back image is required.";
    }
    if (form.documents.livenessStatus !== "verified") {
      errors.livenessStatus = "Liveness verification must be completed.";
    }
  }

  if (step === 2) {
    if (!form.address.presentAddress.trim()) {
      errors.presentAddress = "Present address is required.";
    }
    if (!form.address.city.trim()) {
      errors.city = "City is required.";
    }
    if (!form.address.district.trim()) {
      errors.district = "District is required.";
    }
    if (!form.address.postalCode.trim()) {
      errors.postalCode = "Postal code is required.";
    }
  }

  if (step === 3) {
    if (!form.income.occupation.trim()) {
      errors.occupation = "Occupation is required.";
    }
    if (!form.income.monthlyIncome.trim()) {
      errors.monthlyIncome = "Monthly income is required.";
    }
    if (!form.income.companyName.trim()) {
      errors.companyName = "Company name is required.";
    }
  }

  return errors;
}

function StatusPill({ label, tone }) {
  const tones = {
    success: "bg-success-100 text-success-700",
    warning: "bg-amber-100 text-amber-700",
    neutral: "bg-slate-100 text-slate-600"
  };

  return (
    <span className={["inline-flex rounded-full px-3 py-1 text-sm font-medium", tones[tone]].join(" ")}>
      {label}
    </span>
  );
}

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
      <Card accent className="space-y-5">
        <div className="inline-flex w-fit rounded-full bg-success-100 px-3 py-1 text-sm font-semibold text-success-700">
          Onboarding submitted
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            {onboardingForm.personal.fullName || "Customer"} is ready for the next step.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            The shared profile is now available to the loan micro frontend and visible from the app
            shell dashboard.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">NID upload</p>
            <p className="mt-2 text-sm text-slate-600">Front and back uploaded</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">Liveness</p>
            <p className="mt-2 text-sm text-slate-600 capitalize">{documents.livenessStatus}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">Income</p>
            <p className="mt-2 text-sm text-slate-600">{onboardingForm.income.monthlyIncome}</p>
          </div>
        </div>
        <Button variant="secondary" onClick={resetOnboarding}>
          Start new onboarding
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Stepper steps={steps} currentStep={currentStep} />

      {currentStep === 1 ? (
        <Card className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
              Step 1
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Personal information</h2>
            <p className="mt-2 text-sm text-slate-500">
              Collect identity details, upload NID documents, and complete dummy face liveness.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              value={onboardingForm.personal.fullName}
              error={errors.fullName}
              onChange={(event) =>
                updateOnboardingSection("personal", { fullName: event.target.value })
              }
            />
            <Input
              label="Date of Birth"
              type="date"
              value={onboardingForm.personal.dateOfBirth}
              error={errors.dateOfBirth}
              onChange={(event) =>
                updateOnboardingSection("personal", { dateOfBirth: event.target.value })
              }
            />
            <Input
              label="Phone"
              placeholder="Enter phone number"
              value={onboardingForm.personal.phone}
              error={errors.phone}
              onChange={(event) =>
                updateOnboardingSection("personal", { phone: event.target.value })
              }
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter email address"
              value={onboardingForm.personal.email}
              error={errors.email}
              onChange={(event) =>
                updateOnboardingSection("personal", { email: event.target.value })
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <FileUploader
                label="NID Upload (Front)"
                helperText="Upload the front side of the national ID."
                accept="image/*,.pdf"
                file={documents.nidFront}
                onFileSelect={(file) => setNidFile("nidFront", file)}
              />
              {errors.nidFront ? <p className="text-sm text-danger-500">{errors.nidFront}</p> : null}
            </div>
            <div className="space-y-2">
              <FileUploader
                label="NID Upload (Back)"
                helperText="Upload the back side of the national ID."
                accept="image/*,.pdf"
                file={documents.nidBack}
                onFileSelect={(file) => setNidFile("nidBack", file)}
              />
              {errors.nidBack ? <p className="text-sm text-danger-500">{errors.nidBack}</p> : null}
            </div>
          </div>

          <div className="space-y-4">
            <CameraPreview capturedImage={documents.faceImage} onCapture={handleCapture} />

            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="text-sm font-semibold text-slate-700">Verification status:</span>
              {documents.livenessStatus === "verified" ? (
                <StatusPill label="Verified" tone="success" />
              ) : documents.livenessStatus === "verifying" ? (
                <>
                  <StatusPill label="Verifying" tone="warning" />
                  <Loader label="Simulating liveness check..." />
                </>
              ) : (
                <StatusPill label="Not started" tone="neutral" />
              )}
            </div>

            {errors.livenessStatus ? (
              <p className="text-sm text-danger-500">{errors.livenessStatus}</p>
            ) : null}
          </div>

          <div className="flex justify-end">
            <Button onClick={handleNext}>Continue</Button>
          </div>
        </Card>
      ) : null}

      {currentStep === 2 ? (
        <Card className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
              Step 2
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Address information</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Present Address"
              placeholder="Enter present address"
              value={onboardingForm.address.presentAddress}
              error={errors.presentAddress}
              onChange={(event) =>
                updateOnboardingSection("address", { presentAddress: event.target.value })
              }
            />
            <Input
              label="City"
              placeholder="Enter city"
              value={onboardingForm.address.city}
              error={errors.city}
              onChange={(event) => updateOnboardingSection("address", { city: event.target.value })}
            />
            <Input
              label="District"
              placeholder="Enter district"
              value={onboardingForm.address.district}
              error={errors.district}
              onChange={(event) =>
                updateOnboardingSection("address", { district: event.target.value })
              }
            />
            <Input
              label="Postal Code"
              placeholder="Enter postal code"
              value={onboardingForm.address.postalCode}
              error={errors.postalCode}
              onChange={(event) =>
                updateOnboardingSection("address", { postalCode: event.target.value })
              }
            />
          </div>

          <div className="flex flex-wrap justify-between gap-3">
            <Button variant="ghost" onClick={() => setOnboardingStep(1)}>
              Back
            </Button>
            <Button onClick={handleNext}>Continue</Button>
          </div>
        </Card>
      ) : null}

      {currentStep === 3 ? (
        <Card className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
              Step 3
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Income information</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Occupation"
              placeholder="Enter occupation"
              value={onboardingForm.income.occupation}
              error={errors.occupation}
              onChange={(event) =>
                updateOnboardingSection("income", { occupation: event.target.value })
              }
            />
            <Input
              label="Monthly Income"
              type="number"
              placeholder="Enter monthly income"
              value={onboardingForm.income.monthlyIncome}
              error={errors.monthlyIncome}
              onChange={(event) =>
                updateOnboardingSection("income", { monthlyIncome: event.target.value })
              }
            />
            <Input
              label="Company Name"
              placeholder="Enter company name"
              className="md:col-span-2"
              value={onboardingForm.income.companyName}
              error={errors.companyName}
              onChange={(event) =>
                updateOnboardingSection("income", { companyName: event.target.value })
              }
            />
          </div>

          <div className="flex flex-wrap justify-between gap-3">
            <Button variant="ghost" onClick={() => setOnboardingStep(2)}>
              Back
            </Button>
            <Button onClick={handleNext}>Continue</Button>
          </div>
        </Card>
      ) : null}

      {currentStep === 4 ? (
        <Card className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
              Step 4
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Review and submit</h2>
            <p className="mt-2 text-sm text-slate-500">
              Review all onboarding information before final submission.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
              <p className="font-semibold uppercase tracking-[0.18em] text-primary-600">
                Personal
              </p>
              <div className="mt-4 space-y-2 text-slate-600">
                <p>{onboardingForm.personal.fullName}</p>
                <p>{onboardingForm.personal.dateOfBirth}</p>
                <p>{onboardingForm.personal.phone}</p>
                <p>{onboardingForm.personal.email}</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
              <p className="font-semibold uppercase tracking-[0.18em] text-primary-600">Address</p>
              <div className="mt-4 space-y-2 text-slate-600">
                <p>{onboardingForm.address.presentAddress}</p>
                <p>{onboardingForm.address.city}</p>
                <p>{onboardingForm.address.district}</p>
                <p>{onboardingForm.address.postalCode}</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
              <p className="font-semibold uppercase tracking-[0.18em] text-primary-600">Income</p>
              <div className="mt-4 space-y-2 text-slate-600">
                <p>{onboardingForm.income.occupation}</p>
                <p>{onboardingForm.income.monthlyIncome}</p>
                <p>{onboardingForm.income.companyName}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
              <p className="font-semibold text-slate-800">NID upload status</p>
              <div className="mt-4 space-y-2 text-slate-600">
                <p>Front: {documents.nidFront?.name || "Missing"}</p>
                <p>Back: {documents.nidBack?.name || "Missing"}</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
              <p className="font-semibold text-slate-800">Liveness verification</p>
              <div className="mt-4 flex items-center gap-3">
                {documents.livenessStatus === "verified" ? (
                  <StatusPill label="Verified" tone="success" />
                ) : (
                  <StatusPill label="Incomplete" tone="warning" />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-3">
            <Button variant="ghost" onClick={() => setOnboardingStep(3)}>
              Back
            </Button>
            <Button onClick={handleSubmit}>Submit onboarding</Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
