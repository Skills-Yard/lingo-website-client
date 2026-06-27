export const ONBOARDING_TOTAL_STEPS = 9;

const onboardingStepByPath: Record<string, number> = {
  "/motivation": 1,
  "/age": 2,
  "/subject": 3,
  "/level": 4,
  "/schedule": 5,
  "/goal": 6,
  "/topics": 7,
  "/limitless": 8,
  "/signup": 9,
};

export function getOnboardingStep(pathname: string) {
  return onboardingStepByPath[pathname];
}
