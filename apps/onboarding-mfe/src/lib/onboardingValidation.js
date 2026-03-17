export const onboardingSteps = ["Personal", "Address", "Income", "Review"];
export const MONTHLY_INCOME_OPTIONS = [
  "20,000-29,999",
  "30,000-99,999",
  "100,000-149,000",
  "150,000+"
];
const MAX_BIRTH_DATE = "2008-03-31";

export function validateStep(step, form) {
  const errors = {};

  if (step === 1) {
    if (!form.personal.fullName.trim()) {
      errors.fullName = "Full name is required.";
    }
    if (!form.personal.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required.";
    } else if (form.personal.dateOfBirth > MAX_BIRTH_DATE) {
      errors.dateOfBirth = "Date of birth must be on or before March 31, 2008.";
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
    } else if (!MONTHLY_INCOME_OPTIONS.includes(form.income.monthlyIncome)) {
      errors.monthlyIncome = "Select a valid monthly income range.";
    }
    if (!form.income.companyName.trim()) {
      errors.companyName = "Company name is required.";
    }
  }

  return errors;
}
