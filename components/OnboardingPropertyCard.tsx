'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaBed, FaCalendarAlt } from 'react-icons/fa';
import type { OnboardingProperty } from '@/types/onboarding';

const getDaysUntilGoLive = (dateString: string) => {
  const target = new Date(dateString).getTime();
  const now = Date.now();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((target - now) / msPerDay);
};

interface Props {
  property: OnboardingProperty;
  onSelect: () => void;
  statusLabel: {
    label: string;
    tone: string;
    accent: string;
  };
  progress: number;
}

const fallbackImageSrc = '/images/property-placeholder.svg';

const OnboardingPropertyCard = ({
  property,
  onSelect,
  statusLabel,
  progress,
}: Props) => {
  const [imageSrc, setImageSrc] = useState(property.image || fallbackImageSrc);

  useEffect(() => {
    setImageSrc(property.image || fallbackImageSrc);
  }, [property.id, property.image]);

  const imageAlt =
    imageSrc === fallbackImageSrc
      ? `${property.name} image unavailable`
      : property.name;

  const daysUntilGoLive = getDaysUntilGoLive(property.targetGoLiveDate);
  const isOverdue = daysUntilGoLive < 0 && statusLabel.label !== 'Live';
  const statusClass = isOverdue
    ? 'rounded-full border border-rose-500 bg-rose-500 text-white'
    : `${statusLabel.tone} ${statusLabel.accent}`;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group text-left rounded-[1.75rem] border border-slate-200 bg-slate-100 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-200">
        <div className="relative h-44 w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => {
              if (imageSrc !== fallbackImageSrc) {
                setImageSrc(fallbackImageSrc);
              }
            }}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-4 py-3">
          <p className="text-sm text-slate-200">{property.location}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            {property.name}
          </h3>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span
          className={`${statusClass} rounded-full border px-3 py-1 text-xs font-semibold`}
        >
          {isOverdue ? 'Overdue' : statusLabel.label}
        </span>
        <p className="text-sm text-slate-500">
          {new Date(property.targetGoLiveDate).toLocaleDateString('en-GB', {
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="mt-4 grid gap-3">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span className="inline-flex items-center">
            <FaBed className="mr-2 h-4 w-4 text-slate-400" />
            {property.bedrooms} beds
          </span>
          <span className="inline-flex items-center">
            <FaCalendarAlt className="mr-2 h-4 w-4 text-slate-400" />
            {progress}% complete
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-sky-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium text-slate-600">
          <span>
            {property.steps.filter((step) => step.status === 'complete').length}{' '}
            complete
          </span>
          <span>
            {
              property.steps.filter((step) => step.status === 'in_progress')
                .length
            }{' '}
            active
          </span>
          <span>
            {
              property.steps.filter((step) => step.status === 'action_required')
                .length
            }{' '}
            issues
          </span>
        </div>
      </div>
    </button>
  );
};

export default OnboardingPropertyCard;
