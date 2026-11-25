import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Phone, Sparkles, X } from 'lucide-react';
import siteContent from '../../data/siteContent';
import { formatPhoneHref } from '../../utils/content';
import { cx } from '../../utils/cx';
import { Button, Container } from '../ui';
import ThemeToggle from './ThemeToggle';

const navigation = siteContent.navigation;
const serviceItem = navigation.find((item) => item.children?.length);
const serviceGroups = serviceItem?.children || [];

function isActivePath(pathname, path) {
  if (path === '/' || !path || path === '#') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

function Logo({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group inline-flex items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-primary-400"
      aria-label={`${siteContent.company.name} home`}
    >
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-gradient text-white shadow-glow transition-transform duration-300 group-hover:rotate-6">
        <Sparkles className="h-5 w-5" />
      </span>
      <span className="font-display text-lg font-semibold leading-none tracking-tight text-white">
        e2e<span className="text-primary-300">cyber</span>
        <span className="block pt-1 text-[9px] font-medium uppercase tracking-[0.32em] text-slate-500">
          solutions
        </span>
      </span>
    </Link>
  );
}

function MegaMenu({ onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="glass absolute left-1/2 top-full z-50 w-[min(46rem,calc(100vw-3rem))] -translate-x-1/2 rounded-4xl p-5 shadow-card"
    >
      <div className="grid gap-5 sm:grid-cols-3">
        {serviceGroups.map((group) => (
          <div key={group.label}>
            <Link
              to={group.path}
              onClick={onNavigate}
              className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              {group.label}
              <ArrowUpRight className="h-3.5 w-3.5 text-primary-300" />
            </Link>
            <div className="mt-2 space-y-0.5">
              {group.children?.map((child) => (
                <Link
                  key={child.label}
                  to={child.path}
                  onClick={onNavigate}
                  className="block rounded-xl px-3 py-2 text-[13px] text-slate-400 transition-all hover:translate-x-1 hover:bg-white/5 hover:text-white"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
        <p className="text-xs text-slate-400">Not sure which service fits?</p>
        <Link
          to="/contact"
          onClick={onNavigate}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary-200 transition-colors hover:text-white"
        >
          Get a quote <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

function MobileDrawer({ open, onClose }) {
  const location = useLocation();
  const [expandedGroup, setExpandedGroup] = useState(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div data-surface="dark" className="fixed inset-0 z-[110] lg:hidden">
          <motion.button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 h-full w-full cursor-default bg-ink-950/75 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-[min(24rem,90vw)] flex-col border-l border-white/10 bg-ink-900/95 shadow-card backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <Logo onClick={onClose} />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-white/30 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <nav className="scrollbar-none flex-1 overflow-y-auto px-5 py-6">
              {navigation.map((item) => {
                if (!item.children?.length) {
                  return (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cx(
                          'block rounded-2xl px-4 py-3.5 font-display text-lg transition-colors',
                          isActive || isActivePath(location.pathname, item.path)
                            ? 'bg-primary-500/15 text-white'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  );
                }

                return (
                  <div key={item.label} className="mt-1">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedGroup((current) => (current === item.label ? null : item.label))
                      }
                      aria-expanded={expandedGroup === item.label}
                      className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left font-display text-lg text-slate-200 transition-colors hover:bg-white/5"
                    >
                      {item.label}
                      <motion.span animate={{ rotate: expandedGroup === item.label ? 180 : 0 }}>
                        <ChevronDown className="h-4 w-4 text-primary-300" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedGroup === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 pb-3 pl-4">
                            {item.children.map((group) => (
                              <div key={group.label}>
                                <Link
                                  to={group.path}
                                  onClick={onClose}
                                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-primary-200"
                                >
                                  {group.label}
                                </Link>
                                {group.children?.map((child) => (
                                  <Link
                                    key={child.label}
                                    to={child.path}
                                    onClick={onClose}
                                    className="block rounded-xl px-6 py-2 text-[13px] text-slate-400 transition-colors hover:text-white"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="border-t border-white/10 p-5">
              <Button to="/contact" onClick={onClose} iconRight={<ArrowUpRight className="h-4 w-4" />} fullWidth>
                Get a Quote
              </Button>
              <a
                href={formatPhoneHref(siteContent.contact.phone)}
                className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {siteContent.contact.phoneHeader}
              </a>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        data-surface="dark"
        className={cx(
          'sticky top-0 z-50 w-full border-b transition-all duration-500 ease-smooth',
          scrolled
            ? 'border-white/10 bg-ink-900/75 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.9)] backdrop-blur-2xl'
            : 'border-transparent bg-ink-900/20',
        )}
      >
        <Container className="flex h-[76px] items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navigation.map((item) => {
              if (item.children?.length) {
                const groupActive = item.children.some(
                  (group) =>
                    isActivePath(location.pathname, group.path) ||
                    group.children?.some((child) => isActivePath(location.pathname, child.path)),
                );

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen((current) => !current)}
                      className={cx(
                        'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                        groupActive || servicesOpen
                          ? 'bg-white/[0.08] text-white'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white',
                      )}
                    >
                      {item.label}
                      <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }}>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {servicesOpen && <MegaMenu onNavigate={() => setServicesOpen(false)} />}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    cx(
                      'relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                      isActive || isActivePath(location.pathname, item.path)
                        ? 'bg-white/[0.08] text-white'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={formatPhoneHref(siteContent.contact.phone)}
              className="hidden items-center gap-2 text-xs font-medium text-slate-300 transition-colors hover:text-white xl:inline-flex"
            >
              <Phone className="h-4 w-4 text-primary-300" />
              {siteContent.contact.phoneHeader}
            </a>
            <ThemeToggle className="hidden sm:inline-flex" />
            <Button
              to="/contact"
              size="sm"
              className="hidden sm:inline-flex"
              iconRight={<ArrowUpRight className="h-3.5 w-3.5" />}
            >
              Get a Quote
            </Button>
            <button
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((current) => !current)}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-white/25 lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current"
                />
              </span>
            </button>
          </div>
        </Container>
      </header>
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
