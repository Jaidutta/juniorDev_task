import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Madestays Onboarding Dashboard',
  description: 'Luxury property onboarding progress for Madestays owners.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-[rgb(239,232,221)] text-slate-900'>
        <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
          {children}
        </div>
      </body>
    </html>
  );
};

export default MainLayout;
