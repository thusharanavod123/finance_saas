interface AuthFieldProps {
  label: string;
  type: string;
  value: string;
  minLength?: number;
  onChange: (value: string) => void;
}

export function AuthField({ label, type, value, minLength, onChange }: AuthFieldProps) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        required
        type={type}
        minLength={minLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5"
      />
    </label>
  );
}
