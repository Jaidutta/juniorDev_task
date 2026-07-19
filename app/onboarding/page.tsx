'use client';

import { useEffect, useState } from 'react';
import OnboardingDashboard from '@/components/OnboardingDashboard';
import Spinner from '@/components/Spinner';
import onboardingData from '@/data/onboarding-data.json';
import type { OnboardingData } from '@/types/onboarding';

const OnboardingPage = () => {
  const [dashboardData, setDashboardData] = useState<OnboardingData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDashboardData(onboardingData as OnboardingData);
      setIsLoading(false);
    }, 650);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-[calc(100vh-85px)] bg-[rgb(239,232,221)]">
      {isLoading || !dashboardData ? (
        <div className="flex min-h-[calc(100vh-85px)] items-center justify-center px-4">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-12 shadow-xl">
            <Spinner loading={true} />
          </div>
        </div>
      ) : (
        <OnboardingDashboard
          owner={dashboardData.owner}
          properties={dashboardData.properties}
          stepDefinitions={dashboardData.onboardingStepDefinitions}
          statusLegend={dashboardData.statusLegend}
        />
      )}
    </section>
  );
};

export default OnboardingPage;
