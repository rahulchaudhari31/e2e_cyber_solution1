import { useEffect, useId, useState } from 'react';
import { Loader2, Send, Sparkles } from 'lucide-react';
import siteContent from '../data/siteContent';
import { submitContactForm } from '../utils/api';
import { cx } from '../utils/cx';
import { Button, Input, Textarea, Toast } from './ui';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

const serviceOptions = [
  { value: '', label: 'Select a service' },
  ...siteContent.services.map((service) => ({ value: service.name, label: service.name })),
  { value: 'General enquiry', label: 'General enquiry' },
];

function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!/^[+\d][\d\s()-]{6,}$/.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!values.service) errors.service = 'Please choose a service.';

  if (!values.message.trim()) errors.message = 'Please tell us about your project.';
  else if (values.message.trim().length < 10) {
    errors.message = 'Please add at least 10 characters.';
  }

  return errors;
}

export default function ContactForm({ compact = false, className }) {
  const formId = useId();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [toast, setToast] = useState(null);

  const fieldId = (field) => `${formId}-${field}`;
  const isLoading = status === 'loading';

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(fieldId(firstError))?.focus();
      return;
    }

    setStatus('loading');

    try {
      await submitContactForm({ ...values, source: compact ? 'consultation-modal' : 'contact-page' });
      setValues(initialValues);
      setStatus('success');
      setToast({
        type: 'success',
        message: 'Thanks — your enquiry is on its way. We will be in touch shortly.',
      });
    } catch {
      setStatus('error');
      setToast({
        type: 'error',
        message: 'Something went wrong. Please try again or call us directly.',
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={cx(
          !compact && 'surface-card p-6 sm:p-9',
          compact && 'space-y-4',
          className,
        )}
      >
        <div className={cx(!compact && 'flex items-center justify-between gap-4')}>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-300">
              {compact ? 'Free consultation' : 'Project enquiry'}
            </span>
            <h2 className={cx('mt-3 font-semibold', compact ? 'text-2xl' : 'text-2xl sm:text-3xl')}>
              {compact ? 'Tell us what you need.' : 'Tell us about your goals.'}
            </h2>
          </div>
          <Sparkles className={cx('h-6 w-6 text-accent-300', compact ? 'hidden' : 'hidden sm:block')} />
        </div>

        <div className={cx('grid gap-4', compact ? 'mt-5 sm:grid-cols-2' : 'mt-8 sm:grid-cols-2')}>
          <Input
            id={fieldId('name')}
            name="name"
            label="Full name"
            placeholder="Your name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            autoComplete="name"
            disabled={isLoading}
          />
          <Input
            id={fieldId('email')}
            name="email"
            label="Email address"
            type="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
            disabled={isLoading}
          />
          <Input
            id={fieldId('phone')}
            name="phone"
            label="Phone number"
            type="tel"
            placeholder="0121 271 0369"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
            autoComplete="tel"
            disabled={isLoading}
          />

          <div className="w-full">
            <label
              htmlFor={fieldId('service')}
              className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-slate-400"
            >
              Service
            </label>
            <select
              id={fieldId('service')}
              name="service"
              value={values.service}
              onChange={handleChange}
              aria-invalid={Boolean(errors.service)}
              disabled={isLoading}
              className={cx(
                'w-full rounded-2xl border border-white/10 bg-ink-800 px-4 py-3.5 text-sm text-white transition-all duration-300 hover:border-white/20 focus:border-primary-400/70 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                errors.service && 'border-rose-400/70',
              )}
            >
              {serviceOptions.map((option) => (
                <option key={option.value || 'default'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.service && <p className="mt-2 text-xs text-rose-300">{errors.service}</p>}
          </div>

          <Textarea
            id={fieldId('message')}
            name="message"
            label="Message"
            rows={compact ? 3 : 5}
            placeholder="Tell us about your project..."
            value={values.message}
            onChange={handleChange}
            error={errors.message}
            className="sm:col-span-2"
            disabled={isLoading}
          />
        </div>

        <div
          className={cx(
            'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
            compact ? 'mt-5' : 'mt-8',
          )}
        >
          <p className="max-w-xs text-xs leading-relaxed text-slate-500">
            {compact
              ? 'A free, no-obligation review of your digital goals.'
              : "Share as much or as little as you like — we'll ask the right questions from there."}
          </p>
          <Button
            type="submit"
            size={compact ? 'md' : 'lg'}
            disabled={isLoading}
            iconRight={isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          >
            {isLoading ? 'Sending...' : compact ? 'Request consultation' : 'Send message'}
          </Button>
        </div>

        {status === 'error' && (
          <p className="mt-4 text-xs text-rose-300" role="alert">
            Submission failed. Please try again or call us directly.
          </p>
        )}
      </form>

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </>
  );
}
