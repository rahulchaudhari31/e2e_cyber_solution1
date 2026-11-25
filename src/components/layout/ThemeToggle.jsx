import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cx } from '../../utils/cx';

export default function ThemeToggle({ className, withLabel = false }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      aria-pressed={isLight}
      className={cx(
        'inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-slate-300 transition-all duration-300 hover:border-primary-300/60 hover:text-white',
        className,
      )}
    >
      {isLight ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {withLabel && <span className="text-xs font-semibold">{isLight ? 'Light' : 'Dark'}</span>}
    </button>
  );
}
