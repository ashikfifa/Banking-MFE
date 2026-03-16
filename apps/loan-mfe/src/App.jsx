import { useEffect, useMemo, useState } from "react";
import { Button, Card, Input, Loader, Stepper } from "@banking-mf/ui-library";
import { useBankingStore } from "@banking-mf/store";
import loanProducts from "./data/loanProducts.json";

const steps = ["Product", "Applicant", "Summary"];

const currencyFormatter = new Intl.NumberFormat("en-BD", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0
});

function formatCurrency(value) {
  return currencyFormatter.format(Number(value || 0));
}

function fetchLoanProducts() {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(loanProducts), 700);
  });
}

function validateApplicantDetails(personal, selectedProduct) {
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
  const hasProfilePrefill = useMemo(
    () => Boolean(userProfile.fullName || userProfile.email || userProfile.phone),
    [userProfile.email, userProfile.fullName, userProfile.phone]
  );

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
      <Card accent className="space-y-5">
        <div className="inline-flex w-fit rounded-full bg-success-100 px-3 py-1 text-sm font-semibold text-success-700">
          Application submitted
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            {selectedProduct?.name || "Loan"} submitted successfully.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            The application remains visible in the app shell because the loan state is stored in the
            shared workspace package.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="font-semibold text-slate-800">Product</p>
            <p className="mt-2 text-slate-600">{selectedProduct?.name}</p>
            <p className="mt-1 text-slate-500">{selectedProduct?.interestRate} interest</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="font-semibold text-slate-800">Applicant</p>
            <p className="mt-2 text-slate-600">{personal.fullName}</p>
            <p className="mt-1 text-slate-500">{personal.email}</p>
          </div>
        </div>
        <Button variant="secondary" onClick={resetLoan}>
          Start another application
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Stepper steps={steps} currentStep={loanApplication.step} />

      {loanApplication.step === 1 ? (
        <Card className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
              Step 1
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Select a loan product
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Products are loaded from a local JSON file through a small async wrapper to simulate an
              API request.
            </p>
          </div>

          {isLoadingProducts ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6">
              <Loader label="Fetching loan products..." />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="flex h-full flex-col justify-between border border-transparent bg-slate-50 p-5"
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">
                      {product.interestRate} interest
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900">{product.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500">{product.tagline}</p>
                  </div>
                  <div className="mt-6 space-y-4">
                    <p className="text-sm font-medium text-slate-700">
                      Maximum amount: {formatCurrency(product.maxAmount)}
                    </p>
                    <Button fullWidth onClick={() => selectLoanProduct(product)}>
                      Select product
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      ) : null}

      {loanApplication.step === 2 ? (
        <Card className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
                Step 2
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Applicant information
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Personal details can be prefilled from the onboarding micro frontend through the
                shared store.
              </p>
            </div>

            {selectedProduct ? (
              <div className="rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm">
                <p className="font-semibold text-primary-700">{selectedProduct.name}</p>
                <p className="text-primary-600">
                  {selectedProduct.interestRate} interest, max{" "}
                  {formatCurrency(selectedProduct.maxAmount)}
                </p>
              </div>
            ) : null}
          </div>

          {hasProfilePrefill ? (
            <div className="rounded-xl border border-success-200 bg-success-50 p-4 text-sm text-success-700">
              Applicant data has been prefilled from onboarding where available.
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              value={personal.fullName}
              error={errors.fullName}
              onChange={(event) => updateLoanPersonal({ fullName: event.target.value })}
            />
            <Input
              label="Phone"
              placeholder="Enter phone number"
              value={personal.phone}
              error={errors.phone}
              onChange={(event) => updateLoanPersonal({ phone: event.target.value })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter email address"
              value={personal.email}
              error={errors.email}
              onChange={(event) => updateLoanPersonal({ email: event.target.value })}
            />
            <Input
              label="Monthly Income"
              type="number"
              placeholder="Enter monthly income"
              value={personal.monthlyIncome}
              error={errors.monthlyIncome}
              onChange={(event) => updateLoanPersonal({ monthlyIncome: event.target.value })}
            />
            <Input
              label="Loan Amount"
              type="number"
              placeholder="Optional requested amount"
              value={personal.loanAmount}
              error={errors.loanAmount}
              onChange={(event) => updateLoanPersonal({ loanAmount: event.target.value })}
            />
            <Input
              label="Loan Tenure"
              placeholder="Optional tenure, e.g. 36 months"
              value={personal.loanTenure}
              onChange={(event) => updateLoanPersonal({ loanTenure: event.target.value })}
            />
          </div>

          <div className="flex flex-wrap justify-between gap-3">
            <Button variant="ghost" onClick={() => setLoanStep(1)}>
              Back
            </Button>
            <Button onClick={handleNextFromApplicant}>Review application</Button>
          </div>
        </Card>
      ) : null}

      {loanApplication.step === 3 ? (
        <Card className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-600">
              Step 3
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Review and submit</h2>
            <p className="mt-2 text-sm text-slate-500">
              Confirm the selected product and applicant details before submitting.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">
                Selected loan
              </p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                {selectedProduct?.name || "Not selected"}
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-slate-400">Interest rate</dt>
                  <dd className="font-medium text-slate-700">{selectedProduct?.interestRate}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Maximum amount</dt>
                  <dd className="font-medium text-slate-700">
                    {formatCurrency(selectedProduct?.maxAmount)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Requested amount</dt>
                  <dd className="font-medium text-slate-700">
                    {personal.loanAmount ? formatCurrency(personal.loanAmount) : "Not provided"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600">
                Applicant information
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-slate-400">Full name</dt>
                  <dd className="font-medium text-slate-700">{personal.fullName}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Phone</dt>
                  <dd className="font-medium text-slate-700">{personal.phone}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Email</dt>
                  <dd className="font-medium text-slate-700">{personal.email}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Monthly income</dt>
                  <dd className="font-medium text-slate-700">{personal.monthlyIncome}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-3">
            <Button variant="ghost" onClick={() => setLoanStep(2)}>
              Back
            </Button>
            <Button onClick={handleSubmit}>Submit application</Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
