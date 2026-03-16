import loanProducts from "../data/loanProducts.json";

export const loanSteps = ["Product", "Applicant", "Summary"];

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
  }

  if (personal.loanAmount && selectedProduct) {
    const requestedAmount = Number(personal.loanAmount);
    if (requestedAmount > selectedProduct.maxAmount) {
      errors.loanAmount = `Amount cannot exceed ${formatCurrency(selectedProduct.maxAmount)}.`;
    }
  }

  return errors;
}
