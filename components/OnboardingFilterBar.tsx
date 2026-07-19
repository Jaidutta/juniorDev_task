interface FilterOption {
  key: string;
  label: string;
}

interface Props {
  options: readonly FilterOption[];
  active: FilterOption['key'];
  onSelect: (key: FilterOption['key']) => void;
}

const OnboardingFilterBar = ({ options, active, onSelect }: Props) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option) => {
      const activeOption = option.key === active;
      return (
        <button
          key={option.key}
          type="button"
          onClick={() => onSelect(option.key)}
          className={`rounded-full border px-4 py-2 text-sm transition ${
            activeOption
              ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
              : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
          }`}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

export default OnboardingFilterBar;
