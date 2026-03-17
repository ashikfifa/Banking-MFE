import loanProducts from "../data/loanProducts.json";

export const loanSteps = ["Product", "Applicant", "Summary"];

export const LOAN_MONTHLY_INCOME_OPTIONS = [
  "20,000-29,999",
  "30,000-99,999",
  "100,000-149,000",
  "150,000+"
];

export const LOAN_AMOUNT_OPTIONS = [
  "1 lac – 5 lac",
  "6 lac – 15 lac",
  "16 lac – 50 lac",
  "51 lac – 1 cr",
  "1 cr – 2 cr",
  "More than 2 cr (Secured)"
];

export const LOAN_TENURE_OPTIONS = [
  "12 months",
  "24 months",
  "36 months",
  "48 months",
  "60 months"
];

const currencyFormatter = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0
});

export function formatCurrency(value) {
  return currencyFormatter.format(Number(value || 0));
}

export function fetchLoanProducts() {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(loanProducts), 700);
  });
}

export function validateApplicantDetails(personal, selectedProduct) {
  const errors = {};

  if (!personal.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }
  if (!personal.phone.trim()) {
    errors.phone = "Phone number is required.";
  }
  if (!personal.email.trim()) {
    errors.email = "Email is required.";
  }
  if (!personal.monthlyIncome.trim()) {
    errors.monthlyIncome = "Monthly income is required.";
  } else if (!LOAN_MONTHLY_INCOME_OPTIONS.includes(personal.monthlyIncome)) {
    errors.monthlyIncome = "Select a valid monthly income range.";
  }

  if (personal.loanAmount && !LOAN_AMOUNT_OPTIONS.includes(personal.loanAmount)) {
    errors.loanAmount = "Select a valid loan amount range.";
  }

  if (personal.loanTenure && !LOAN_TENURE_OPTIONS.includes(personal.loanTenure)) {
    errors.loanTenure = "Select a valid loan tenure.";
  }

  return errors;
}
