'use client';

import { useState } from 'react';
import { FaTimes, FaCircle } from 'react-icons/fa';
import OnboardingDetailSidebar from './OnboardingDetailSidebar';
import type {
  OnboardingProperty,
  StepDefinition,
  StatusLegend,
  StepStatus,
} from '@/types/onboarding';

interface Props {
  property: OnboardingProperty;
  stepDefinitions: StepDefinition[];
  onClose: () => void;
  statusLegend: StatusLegend;
}

const statusStyles: Record<
  StepStatus,
  { label: string; tone: string; iconColor: string }
> = {
  complete: {
    label: 'Complete',
    tone: 'bg-emerald-50 text-emerald-700',
    iconColor: 'text-emerald-500',
  },
  in_progress: {
    label: 'In progress',
    tone: 'bg-sky-50 text-sky-700',
    iconColor: 'text-sky-500',
  },
  action_required: {
    label: 'Action required',
    tone: 'bg-rose-50 text-rose-700',
    iconColor: 'text-rose-500',
  },
  not_started: {
    label: 'Not started',
    tone: 'bg-amber-50 text-amber-700',
    iconColor: 'text-amber-500',
  },
  on_hold: {
    label: 'On hold',
    tone: 'bg-amber-50 text-amber-700',
    iconColor: 'text-amber-500',
  },
};

const OnboardingDetailModal = ({
  property,
  stepDefinitions,
  onClose,
  statusLegend,
}: Props) => {
  const activeSteps = stepDefinitions.map((stepDefinition) => {
    const propertyStep = property.steps.find(
      (item) => item.id === stepDefinition.id,
    );
    return {
      ...stepDefinition,
      status: propertyStep?.status ?? 'not_started',
      note: propertyStep?.note,
    };
  });

  const summaryStatus =
    property.steps.length === 0
      ? 'not_started'
      : property.steps.some(
            (step) =>
              step.status === 'action_required' || step.status === 'on_hold',
          )
        ? 'action_required'
        : property.steps.every((step) => step.status === 'complete')
          ? 'complete'
          : property.steps.some((step) => step.status === 'in_progress')
            ? 'in_progress'
            : 'not_started';

  const statusInfo = statusStyles[summaryStatus] ?? statusStyles.not_started;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative mx-auto mb-8 mt-12 w-[min(95vw,1000px)] rounded-[2rem] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
              Property onboarding
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              {property.name}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {property.location} • {property.bedrooms} bedrooms
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_0.7fr]">
          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Target go-live</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {new Date(property.targetGoLiveDate).toLocaleDateString(
                    'en-GB',
                    { month: 'short', day: 'numeric', year: 'numeric' },
                  )}
                </p>
              </div>
              <div
                className={`rounded-full px-4 py-2 text-sm font-semibold ${statusInfo.tone}`}
              >
                {statusInfo.label}
              </div>
            </div>
            <div className="mt-6 rounded-3xl bg-slate-100 p-4">
              <p className="text-sm font-semibold text-slate-700">
                Latest checklist
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Review each onboarding step below. Any open notes highlight
                exactly what Madestays needs to complete the launch.
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
              Quick reference
            </p>
            <div className="mt-4 space-y-3">
              {Object.entries(statusLegend).map(([key, label]) => {
                const style =
                  statusStyles[key as StepStatus] ?? statusStyles.not_started;
                return (
                  <div key={key} className="flex gap-3">
                    <FaCircle className={`mt-1 h-3 w-3 ${style.iconColor}`} />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {style.label}
                      </p>
                      <p className="text-sm text-slate-600">{label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {activeSteps.map((step) => {
            const style = statusStyles[step.status] ?? statusStyles.not_started;
            return (
              <div
                key={step.id}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="max-w-[70%]">
                    <p className="text-sm font-semibold text-slate-900">
                      {step.label}
                    </p>
                    {step.note && (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {step.note}
                      </p>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${style.tone}`}
                  >
                    <FaCircle className={style.iconColor} /> {style.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <OnboardingDetailSidebar
            property={property}
            statusInfo={statusInfo}
            statusLegend={statusLegend}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingDetailModal;
