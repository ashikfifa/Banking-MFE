import { NavLink } from "react-router-dom";
import { Button, Card } from "@banking-mf/ui-library";
import { useBankingStore } from "@banking-mf/store";

function formatTimestamp(value) {
  if (!value) {
    return "Not submitted yet";
  }

  return new Date(value).toLocaleString();
}

function formatDate(value) {
  if (!value) {
    return "Pending";
  }

  return new Date(value).toLocaleDateString();
}

export function Dashboard() {
  const userProfile = useBankingStore((state) => state.userProfile);
  const onboardingProgress = useBankingStore((state) => state.onboardingProgress);
  const onboardingForm = useBankingStore((state) => state.onboardingForm);
  const loanApplication = useBankingStore((state) => state.loanApplication);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
              Banking Micro-Frontend
            </p>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                Shared onboarding and loan workflows from one app shell.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                The dashboard reads from the shared Zustand store, while onboarding and loan
                modules are lazy loaded through Vite Module Federation.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <NavLink to="/onboarding">
                <Button>Start onboarding</Button>
              </NavLink>
              <NavLink to="/loan">
                <Button variant="secondary">Open loan flow</Button>
              </NavLink>
            </div>
          </div>

          <div className="rounded-xl bg-gray-100 p-6 shadow">
            <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Live summary</p>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="text-slate-500">Customer</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {userProfile.fullName || "No profile created yet"}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-slate-500">Onboarding</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {onboardingProgress.isSubmitted ? "Completed" : `Step ${onboardingProgress.step}`}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Loan</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {loanApplication.status === "submitted"
                      ? "Application submitted"
                      : loanApplication.selectedProduct
                        ? `Step ${loanApplication.step}`
                        : "Not started"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Shared state snapshot</h2>
              <p className="text-sm text-slate-500">
                Data entered in onboarding is immediately visible across the shell and loan module.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-gray-100 p-4 shadow">
              <p className="text-sm font-semibold text-slate-800">User profile</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-slate-400">Full name</dt>
                  <dd className="font-medium text-slate-700">{userProfile.fullName || "Pending"}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Date of birth</dt>
                  <dd className="font-medium text-slate-700">
                    {formatDate(userProfile.dateOfBirth)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Email</dt>
                  <dd className="font-medium text-slate-700">{userProfile.email || "Pending"}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Phone</dt>
                  <dd className="font-medium text-slate-700">{userProfile.phone || "Pending"}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Monthly income</dt>
                  <dd className="font-medium text-slate-700">
                    {userProfile.monthlyIncome || "Pending"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Occupation</dt>
                  <dd className="font-medium text-slate-700">
                    {userProfile.occupation || "Pending"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl bg-gray-100 p-4 shadow">
              <p className="text-sm font-semibold text-slate-800">Onboarding status</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-slate-400">Address</dt>
                  <dd className="font-medium text-slate-700">
                    {userProfile.presentAddress || "Pending"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">City</dt>
                  <dd className="font-medium text-slate-700">{userProfile.city || "Pending"}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">District</dt>
                  <dd className="font-medium text-slate-700">{userProfile.district || "Pending"}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Postal code</dt>
                  <dd className="font-medium text-slate-700">
                    {userProfile.postalCode || "Pending"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">NID upload</dt>
                  <dd className="font-medium text-slate-700">
                    {onboardingForm.documents.nidFront && onboardingForm.documents.nidBack
                      ? "Front and back uploaded"
                      : "Pending upload"}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Liveness</dt>
                  <dd className="font-medium capitalize text-slate-700">
                    {onboardingForm.documents.livenessStatus}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400">Submitted</dt>
                  <dd className="font-medium text-slate-700">
                    {formatTimestamp(onboardingForm.submittedAt)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-slate-900">Loan snapshot</h2>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="text-slate-400">Selected product</p>
              <p className="mt-1 font-semibold text-slate-800">
                {loanApplication.selectedProduct?.name || "None selected"}
              </p>
            </div>
            <div>
              <p className="text-slate-400">Applicant email</p>
              <p className="mt-1 font-semibold text-slate-800">
                {loanApplication.personal.email || "Pending"}
              </p>
            </div>
            <div>
              <p className="text-slate-400">Submission time</p>
              <p className="mt-1 font-semibold text-slate-800">
                {formatTimestamp(loanApplication.submittedAt)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
