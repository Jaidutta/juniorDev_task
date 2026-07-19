'use client';

import { useState } from 'react';
import OnboardingDetailModal from './OnboardingDetailModal';
import OnboardingFilterBar from './OnboardingFilterBar';
import OnboardingPropertyCard from './OnboardingPropertyCard';

import type {
  OnboardingProperty,
  Owner,
  StepDefinition,
  StatusLegend,
} from '@/types/onboarding';

const filterOptions = [
  { key: 'all', label: 'All properties' },
  { key: 'live', label: 'Live' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'action_required', label: 'Needs attention' },
  { key: 'not_started', label: 'Not started' },
] as const;

interface Props {
  owner: Owner;
  properties: OnboardingProperty[];
  stepDefinitions: StepDefinition[];
  statusLegend: StatusLegend;
}

const statusLabels = {
  complete: {
    label: 'Live',
    tone: 'bg-emerald-50 text-emerald-700',
    accent: 'border-emerald-200',
  },
  in_progress: {
    label: 'In progress',
    tone: 'bg-sky-50 text-sky-700',
    accent: 'border-sky-200',
  },
  action_required: {
    label: 'Needs attention',
    tone: 'bg-rose-50 text-rose-700',
    accent: 'border-rose-200',
  },
  not_started: {
    label: 'Not started',
    tone: 'bg-amber-50 text-amber-800',
    accent: 'border-amber-200',
  },
  on_hold: {
    label: 'On hold',
    tone: 'bg-amber-50 text-amber-800',
    accent: 'border-amber-200',
  },
};

type StatusKey = keyof typeof statusLabels;

const getStatusLabel = (key: StatusKey) =>
  statusLabels[key] ?? {
    label: 'Review',
    tone: 'bg-slate-100 text-slate-700',
    accent: 'border-slate-200',
  };

const getPropertySummaryStatus = (property: OnboardingProperty) => {
  if (!property.steps || property.steps.length === 0) return 'not_started';
  if (
    property.steps.some(
      (step) => step.status === 'action_required' || step.status === 'on_hold',
    )
  )
    return 'action_required';
  if (property.steps.every((step) => step.status === 'complete'))
    return 'complete';
  if (property.steps.some((step) => step.status === 'in_progress'))
    return 'in_progress';
  if (property.steps.some((step) => step.status === 'not_started'))
    return 'not_started';
  return 'in_progress';
};

const getCounts = (property: OnboardingProperty) => {
  const counts = {
    complete: 0,
    in_progress: 0,
    action_required: 0,
    not_started: 0,
    on_hold: 0,
  };
  property.steps?.forEach((step) => {
    const key = step.status as keyof typeof counts;
    if (counts[key] !== undefined) {
      counts[key] += 1;
    }
  });
  return counts;
};

const getCompletedSteps = (property: OnboardingProperty) =>
  getCounts(property).complete;

const getProgress = (
  property: OnboardingProperty,
  expectedStepCount: number,
) => {
  const completed = getCompletedSteps(property);
  return expectedStepCount === 0
    ? 0
    : Math.round((completed / expectedStepCount) * 100);
};

const OnboardingDashboard = ({
  owner,
  properties,
  stepDefinitions,
  statusLegend,
}: Props) => {
  const [selectedProperty, setSelectedProperty] =
    useState<OnboardingProperty | null>(null);
    
  const [activeFilter, setActiveFilter] = useState<
    (typeof filterOptions)[number]['key']
  >(filterOptions[0].key);

  const expectedStepCount = stepDefinitions.length;

  const portfolio = properties.reduce(
    (counts, property) => {
      const status = getPropertySummaryStatus(property);
      if (status === 'complete') counts.live += 1;
      else if (status === 'in_progress') counts.in_progress += 1;
      else if (status === 'action_required') counts.action_required += 1;
      else if (status === 'not_started') counts.not_started += 1;
      counts.completeSteps += getCompletedSteps(property);
      return counts;
    },
    {
      all: properties.length,
      live: 0,
      in_progress: 0,
      action_required: 0,
      not_started: 0,
      completeSteps: 0,
      expectedSteps: properties.length * expectedStepCount,
    },
  );

  const filteredProperties =
    activeFilter === 'all'
      ? properties
      : properties.filter((property) => {
          const status = getPropertySummaryStatus(property);
          if (activeFilter === 'live') return status === 'complete';
          if (activeFilter === 'in_progress') return status === 'in_progress';
          if (activeFilter === 'action_required')
            return status === 'action_required';
          if (activeFilter === 'not_started') return status === 'not_started';
          return true;
        });

  const summaryProgress =
    expectedStepCount === 0
      ? 0
      : Math.round((portfolio.completeSteps / portfolio.expectedSteps) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-2xl shadow-slate-900/20 ring-1 ring-white/10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">
              Madestays owner dashboard
            </p>
            <h1 className="mt-3 text-4xl font-normal font-wulkan tracking-tight sm:text-5xl">
              Charlotte, your portfolio progress
            </h1>
            <p className="mt-4 max-w-xl text-slate-300">
              Track every property through onboarding, spot the issues that need
              action, and see where your homes are closest to going live.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/10">
              <p className="text-sm text-slate-400">Account manager</p>
              <p className="mt-2 text-xl font-medium">{owner.accountManager}</p>
              <p className="mt-1 text-sm text-slate-400">
                Joined{' '}
                {new Date(owner.joinedDate).toLocaleDateString('en-GB', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/10">
              <p className="text-sm text-slate-400">Portfolio completion</p>
              <p className="mt-2 text-3xl font-semibold">{summaryProgress}%</p>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-sky-400 transition-all duration-300"
                  style={{ width: `${summaryProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/10">
            <p className="text-sm text-slate-400">Total properties</p>
            <p className="mt-3 text-3xl font-semibold">{portfolio.all}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/10">
            <p className="text-sm text-slate-400">Live now</p>
            <p className="mt-3 text-3xl font-semibold">{portfolio.live}</p>
          </div>
          <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/10">
            <p className="text-sm text-slate-400">In progress</p>
            <p className="mt-3 text-3xl font-semibold">
              {portfolio.in_progress}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900/90 p-6 ring-1 ring-white/10">
            <p className="text-sm text-slate-400">Needs attention</p>
            <p className="mt-3 text-3xl font-semibold">
              {portfolio.action_required}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Property checklist overview
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Filter by onboarding status and open any property to review the
              full checklist.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <OnboardingFilterBar
              options={filterOptions}
              active={activeFilter}
              onSelect={(key) => setActiveFilter(key as typeof activeFilter)}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProperties.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-lg font-semibold text-slate-900">
                No properties match that filter
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Try a different status or return to the full portfolio view.
              </p>
            </div>
          ) : (
            filteredProperties.map((property) => {
              const summaryStatus = getPropertySummaryStatus(property);
              const progress = getProgress(property, expectedStepCount);
              const statusData = getStatusLabel(summaryStatus);

              return (
                <OnboardingPropertyCard
                  key={property.id}
                  property={property}
                  onSelect={() => setSelectedProperty(property)}
                  statusLabel={statusData}
                  progress={progress}
                />
              );
            })
          )}
        </div>
      </div>

      {selectedProperty && (
        <OnboardingDetailModal
          property={selectedProperty}
          stepDefinitions={stepDefinitions}
          onClose={() => setSelectedProperty(null)}
          statusLegend={statusLegend}
        />
      )}
    </div>
  );
};

export default OnboardingDashboard;
