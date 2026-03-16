import { useEffect, useState } from "react";
import { Stepper } from "@banking-mf/ui-library";
import { useBankingStore } from "@banking-mf/store";
import { ApplicantDetailsStep } from "./components/ApplicantDetailsStep.jsx";
import { LoanSubmitted } from "./components/LoanSubmitted.jsx";
import { ProductSelectionStep } from "./components/ProductSelectionStep.jsx";
import { ReviewStep } from "./components/ReviewStep.jsx";
import {
  fetchLoanProducts,
  formatCurrency,
  loanSteps,
  validateApplicantDetails
} from "./lib/loanHelpers.js";

export default function App() {
  const userProfile = useBankingStore((state) => state.userProfile);
  const loanApplication = useBankingStore((state) => state.loanApplication);
  const hydrateLoanFromProfile = useBankingStore((state) => state.hydrateLoanFromProfile);
  const selectLoanProduct = useBankingStore((state) => state.selectLoanProduct);
  const updateLoanPersonal = useBankingStore((state) => state.updateLoanPersonal);
  const setLoanStep = useBankingStore((state) => state.setLoanStep);
  const submitLoanApplication = useBankingStore((state) => state.submitLoanApplication);
  const resetLoan = useBankingStore((state) => state.resetLoan);

  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let isMounted = true;
    fetchLoanProducts().then((data) => {
      if (isMounted) {
        setProducts(data);
        setIsLoadingProducts(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    hydrateLoanFromProfile();
  }, [hydrateLoanFromProfile, userProfile.fullName, userProfile.phone, userProfile.email, userProfile.monthlyIncome]);

  const selectedProduct = loanApplication.selectedProduct;
  const personal = loanApplication.personal;
  const hasProfilePrefill = Boolean(userProfile.fullName || userProfile.email || userProfile.phone);

  const handleNextFromApplicant = () => {
    const nextErrors = validateApplicantDetails(personal, selectedProduct);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setLoanStep(3);
  };

  const handleSubmit = () => {
    const nextErrors = validateApplicantDetails(personal, selectedProduct);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setLoanStep(2);
      return;
    }

    submitLoanApplication();
  };

  if (loanApplication.status === "submitted") {
    return (
      <LoanSubmitted
        selectedProduct={selectedProduct}
        personal={personal}
        onReset={resetLoan}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Stepper steps={loanSteps} currentStep={loanApplication.step} />

      {loanApplication.step === 1 ? (
        <ProductSelectionStep
          products={products}
          isLoadingProducts={isLoadingProducts}
          onSelectProduct={selectLoanProduct}
          formatCurrency={formatCurrency}
        />
      ) : null}

      {loanApplication.step === 2 ? (
        <ApplicantDetailsStep
          selectedProduct={selectedProduct}
          hasProfilePrefill={hasProfilePrefill}
          personal={personal}
          errors={errors}
          onChange={updateLoanPersonal}
          onBack={() => setLoanStep(1)}
          onContinue={handleNextFromApplicant}
          formatCurrency={formatCurrency}
        />
      ) : null}

      {loanApplication.step === 3 ? (
        <ReviewStep
          selectedProduct={selectedProduct}
          personal={personal}
          onBack={() => setLoanStep(2)}
          onSubmit={handleSubmit}
          formatCurrency={formatCurrency}
        />
      ) : null}
    </div>
  );
}
