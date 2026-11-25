import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Check,
  Chrome,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Twitter,
  Youtube,
} from 'lucide-react';
import siteContent from '../../data/siteContent';
import { formatPhoneHref } from '../../utils/content';
import { Button, Container, GlowOrb, Input } from '../ui';

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  google: Chrome,
  'youtube-play': Youtube,
  linkedin: Linkedin,
};

const footerNavigation = siteContent.footer.navigation;
const quickLinks = footerNavigation.filter((item) => !item.children?.length);
const serviceGroups = footerNavigation.find((item) => item.children?.length)?.children || [];

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/10 bg-ink-950">
      <GlowOrb tone="primary" className="-left-40 top-0 h-96 w-96 opacity-60" />
      <GlowOrb tone="accent" className="-right-32 bottom-0 h-80 w-80 opacity-40" />

      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1.15fr_1.35fr] lg:gap-10">
          <div>
            <Link to="/" className="group inline-flex items-center gap-3" aria-label={`${siteContent.company.name} home`}>
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-gradient text-white shadow-glow transition-transform duration-300 group-hover:rotate-6">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-semibold leading-none text-white">
                e2e<span className="text-primary-300">cyber</span>
                <span className="block pt-1 text-[9px] font-medium uppercase tracking-[0.32em] text-slate-500">
                  solutions
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              {siteContent.company.footerDescription}
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {siteContent.socialLinks.map((social) => {
                const Icon = socialIcons[social.label.toLowerCase()] || ArrowUpRight;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300/60 hover:bg-primary-500/15 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-white">Quick links</h3>
            <ul className="mt-6 space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-white">Services</h3>
            <ul className="mt-6 space-y-3.5">
              {serviceGroups.map((group) => (
                <li key={group.label}>
                  <Link
                    to={group.path}
                    className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {group.label}
                  </Link>
                </li>
              ))}
              {siteContent.services.slice(0, 3).map((service) => (
                <li key={service.name}>
                  <Link
                    to="/services"
                    className="text-sm text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-white">Let's talk</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              <li>
                <a
                  href={formatPhoneHref(siteContent.contact.phone)}
                  className="flex items-start gap-3 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" />
                  {siteContent.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteContent.contact.email}`}
                  className="flex items-start gap-3 break-all transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" />
                  {siteContent.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" />
                <span>
                  {siteContent.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            </ul>

            <form
              className="mt-7"
              onSubmit={(event) => {
                event.preventDefault();
                setSubscribed(true);
              }}
            >
              <label htmlFor="newsletter-email" className="mb-3 block text-xs text-slate-400">
                Get growth ideas in your inbox.
              </label>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <Input
                  id="newsletter-email"
                  name="newsletter-email"
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address for newsletter"
                  required
                  containerClassName="flex-1"
                />
                <Button type="submit" size="md" aria-label="Subscribe to newsletter" iconRight={<Send className="h-3.5 w-3.5" />}>
                  {subscribed ? <Check className="h-4 w-4" /> : 'Join'}
                </Button>
              </div>
              {subscribed && <p className="mt-2 text-xs text-accent-300">You're on the list. Thanks for subscribing!</p>}
            </form>
          </div>
        </div>

        <div className="hairline mt-14" />
        <div className="mt-7 flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{siteContent.footer.copyright}</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
            Strategy. Design. Growth.
          </p>
        </div>
      </Container>
    </footer>
  );
}
