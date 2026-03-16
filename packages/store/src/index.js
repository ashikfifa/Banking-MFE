import { create } from "zustand";

const createOnboardingForm = () => ({
  personal: {
    fullName: "",
    dateOfBirth: "",
    phone: "",
    email: ""
  },
  address: {
    presentAddress: "",
    city: "",
    district: "",
    postalCode: ""
  },
  income: {
    occupation: "",
    monthlyIncome: "",
    companyName: ""
  },
  documents: {
    nidFront: null,
    nidBack: null,
    faceImage: "",
    livenessStatus: "idle"
  },
  submitted: false,
  submittedAt: ""
});

const createLoanApplication = () => ({
  selectedProduct: null,
  personal: {
    fullName: "",
    phone: "",
    email: "",
    monthlyIncome: "",
    loanAmount: "",
    loanTenure: ""
  },
  step: 1,
  status: "idle",
  submittedAt: ""
});

const buildUserProfile = (form) => ({
  fullName: form.personal.fullName,
  dateOfBirth: form.personal.dateOfBirth,
  phone: form.personal.phone,
  email: form.personal.email,
  presentAddress: form.address.presentAddress,
  city: form.address.city,
  district: form.address.district,
  postalCode: form.address.postalCode,
  occupation: form.income.occupation,
  monthlyIncome: form.income.monthlyIncome,
  companyName: form.income.companyName
});

export const useBankingStore = create((set, get) => ({
  userProfile: {},
  onboardingProgress: {
    step: 1,
    completedSteps: 0,
    isSubmitted: false
  },
  onboardingForm: createOnboardingForm(),
  loanApplication: createLoanApplication(),

  updateOnboardingSection: (section, values) =>
    set((state) => {
      const onboardingForm = {
        ...state.onboardingForm,
        [section]: {
          ...state.onboardingForm[section],
          ...values
        }
      };

      return {
        onboardingForm,
        userProfile: buildUserProfile(onboardingForm)
      };
    }),

  setOnboardingStep: (step) =>
    set((state) => ({
      onboardingProgress: {
        ...state.onboardingProgress,
        step,
        completedSteps: Math.max(state.onboardingProgress.completedSteps, step - 1)
      }
    })),

  setNidFile: (side, file) =>
    set((state) => ({
      onboardingForm: {
        ...state.onboardingForm,
        documents: {
          ...state.onboardingForm.documents,
          [side]: file
            ? {
                name: file.name,
                size: file.size,
                type: file.type
              }
            : null
        }
      }
    })),

  setLivenessStatus: (status, faceImage = "") =>
    set((state) => ({
      onboardingForm: {
        ...state.onboardingForm,
        documents: {
          ...state.onboardingForm.documents,
          livenessStatus: status,
          faceImage: faceImage || state.onboardingForm.documents.faceImage
        }
      }
    })),

  submitOnboarding: () =>
    set((state) => {
      const submittedAt = new Date().toISOString();

      return {
        userProfile: buildUserProfile(state.onboardingForm),
        onboardingForm: {
          ...state.onboardingForm,
          submitted: true,
          submittedAt
        },
        onboardingProgress: {
          step: 4,
          completedSteps: 4,
          isSubmitted: true
        }
      };
    }),

  resetOnboarding: () =>
    set({
      userProfile: {},
      onboardingForm: createOnboardingForm(),
      onboardingProgress: {
        step: 1,
        completedSteps: 0,
        isSubmitted: false
      }
    }),

  hydrateLoanFromProfile: () =>
    set((state) => {
      if (!state.userProfile.fullName && !state.userProfile.email && !state.userProfile.phone) {
        return {};
      }

      return {
        loanApplication: {
          ...state.loanApplication,
          personal: {
            ...state.loanApplication.personal,
            fullName:
              state.loanApplication.personal.fullName || state.userProfile.fullName || "",
            phone: state.loanApplication.personal.phone || state.userProfile.phone || "",
            email: state.loanApplication.personal.email || state.userProfile.email || "",
            monthlyIncome:
              state.loanApplication.personal.monthlyIncome ||
              state.userProfile.monthlyIncome ||
              ""
          }
        }
      };
    }),

  selectLoanProduct: (product) =>
    set((state) => ({
      loanApplication: {
        ...state.loanApplication,
        selectedProduct: product,
        step: 2,
        status: "idle"
      }
    })),

  updateLoanPersonal: (values) =>
    set((state) => ({
      loanApplication: {
        ...state.loanApplication,
        personal: {
          ...state.loanApplication.personal,
          ...values
        }
      }
    })),

  setLoanStep: (step) =>
    set((state) => ({
      loanApplication: {
        ...state.loanApplication,
        step
      }
    })),

  submitLoanApplication: () =>
    set((state) => ({
      loanApplication: {
        ...state.loanApplication,
        step: 3,
        status: "submitted",
        submittedAt: new Date().toISOString()
      }
    })),

  resetLoan: () =>
    set({
      loanApplication: createLoanApplication()
    }),

  getSnapshot: () => get()
}));
