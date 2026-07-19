export interface StepDefinition {
  id: string;
  label: string;
  order: number;
}

export type StepStatus =
  | 'complete'
  | 'in_progress'
  | 'action_required'
  | 'not_started'
  | 'on_hold';

export type StatusLegend = Partial<Record<StepStatus, string>>;

export interface PropertyStep {
  id: string;
  status: StepStatus;
  note?: string;
}

export interface OnboardingProperty {
  id: string;
  name: string;
  location: string;
  bedrooms: number;
  image: string;
  targetGoLiveDate: string;
  steps: PropertyStep[];
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  accountManager: string;
}

export interface OnboardingData {
  owner: Owner;
  onboardingStepDefinitions: StepDefinition[];
  statusLegend: StatusLegend;
  properties: OnboardingProperty[];
}
