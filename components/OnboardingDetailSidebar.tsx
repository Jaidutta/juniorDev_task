'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaBed, FaCalendarAlt } from 'react-icons/fa';
import type {
  OnboardingProperty,
  StatusLegend,
  StepStatus,
} from '@/types/onboarding';

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

interface StatusInfo {
  label: string;
  tone: string;
  iconColor: string;
}

interface Props {
  property: OnboardingProperty;
  statusInfo: StatusInfo;
  statusLegend: StatusLegend;
}

const fallbackImageSrc = '/images/property-placeholder.svg';

const OnboardingDetailSidebar = ({
  property,
  statusInfo,
  statusLegend,
}: Props) => {
  const [imageSrc, setImageSrc] = useState(property.image || fallbackImageSrc);

  useEffect(() => {
    setImageSrc(property.image || fallbackImageSrc);
  }, [property.id, property.image]);

  const imageAlt =
    imageSrc === fallbackImageSrc
      ? `${property.name} image unavailable`
      : property.name;

  return (
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
              <span
                className={`mt-1 inline-flex h-3 w-3 rounded-full ${style.iconColor}`}
              />
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

      <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-950 text-slate-100">
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
              Property photo
            </p>
            <div className="mt-4 overflow-hidden rounded-3xl bg-slate-900">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  onError={() => {
                    if (imageSrc !== fallbackImageSrc) {
                      setImageSrc(fallbackImageSrc);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
              Property details
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p className="inline-flex items-center gap-2">
                <span className="font-semibold text-slate-100">Name:</span>
                {property.name}
              </p>
              <p className="inline-flex items-center gap-2">
                <FaMapMarkerAlt className="h-4 w-4 text-slate-400" />
                {property.location}
              </p>
              <p className="inline-flex items-center gap-2">
                <FaBed className="h-4 w-4 text-slate-400" />
                {property.bedrooms} bedrooms
              </p>
              <p className="inline-flex items-center gap-2">
                <FaCalendarAlt className="h-4 w-4 text-slate-400" />
                {new Date(property.targetGoLiveDate).toLocaleDateString(
                  'en-GB',
                  {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  },
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingDetailSidebar;
