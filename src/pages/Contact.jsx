import {
  ArrowUpRight,
  Chrome,
  Clock3,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import siteContent from '../data/siteContent';
import { formatPhoneHref } from '../utils/content';
import ContactForm from '../components/ContactForm';
import { PageBanner } from '../components/sections';
import { PageMeta } from '../components/seo';
import { Badge, Button, Container, Reveal, SectionHeading } from '../components/ui';

const { company, contact, socialLinks } = siteContent;

const mapSrc =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2432.4075051450723!2d-1.8462798999999999!3d52.4355325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bbdecdbe4bfd%3A0xb78dac109ccf676b!2s1204B%20Stratford%20Rd%2C%20Birmingham%20B28%208HN!5e0!3m2!1sen!2suk!4v1683019534893!5m2!1sen!2suk';

const contactItems = [
  {
    icon: Phone,
    label: contact.contactLabels[0],
    value: contact.phone,
    detail: contact.phoneNewAccounts,
    href: formatPhoneHref(contact.phone),
  },
  {
    icon: Mail,
    label: contact.contactLabels[1],
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: MapPin,
    label: contact.contactLabels[2],
    value: contact.addressLines.join(', '),
  },
];

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  google: Chrome,
  'youtube-play': Youtube,
  linkedin: Linkedin,
};

const hoursAreMissing = company.businessHours.startsWith('TODO');
const address = contact.addressLines.join(', ');

export default function Contact() {
  return (
    <>
      <PageMeta title="Contact" description={contact.subtitle} path="/contact" />
      <PageBanner
        eyebrow={contact.title}
        title={contact.subtitle.replace('Contact Us ', '')}
        description={company.description}
        image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=72"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Contact', to: '/contact' },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button
            href={formatPhoneHref(contact.phone)}
            variant="outline"
            size="lg"
            icon={<Phone className="h-4 w-4" />}
          >
            {contact.phoneHeader}
          </Button>
          <Button to="/services" variant="ghost" size="lg">
            Browse services
          </Button>
        </div>
      </PageBanner>

      <section aria-labelledby="contact-form-heading" className="section-shell">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow opacity-45" />
        <Container className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal>
            <div id="contact-form-heading" className="sr-only">
              Contact form
            </div>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.12}>
            <SectionHeading
              eyebrow="Contact details"
              title="Find us, call us, write to us."
              description="Details taken from the original contact page."
            />

            <div className="mt-8 space-y-4">
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                const body = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-primary-400/20 bg-primary-500/10 text-primary-200">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {item.label}
                      </span>
                      <span className="mt-1 block break-words text-sm font-medium text-white">{item.value}</span>
                      {item.detail && (
                        <span className="mt-1 block text-xs text-slate-500">{item.detail}</span>
                      )}
                    </span>
                  </>
                );

                return (
                  <Reveal key={item.label} delay={index * 0.06}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="surface-card flex items-center gap-4 p-5 transition-colors hover:border-primary-300/40"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="surface-card flex items-center gap-4 p-5">{body}</div>
                    )}
                  </Reveal>
                );
              })}

              <Reveal delay={0.22}>
                <div className="surface-card flex items-start gap-4 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-accent-400/20 bg-accent-500/10 text-accent-300">
                    <Clock3 className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Business hours
                      </span>
                      {hoursAreMissing && <Badge variant="accent">Source TODO</Badge>}
                    </div>
                    <p className="mt-2 text-sm font-medium text-white">
                      {hoursAreMissing ? 'Not provided in source copy — add hours here.' : company.businessHours}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.28}>
                <div className="surface-card p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Social</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {socialLinks.map((social) => {
                      const Icon = socialIcons[social.label.toLowerCase()] || ArrowUpRight;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${social.label} placeholder profile`}
                          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300/60 hover:text-white"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-[11px] text-slate-600">Source URLs are placeholders ending in #.</p>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="contact-map-heading" className="section-shell border-t border-white/[0.06] bg-ink-900/40">
        <Container>
          <Reveal>
            <SectionHeading
              id="contact-map-heading"
              eyebrow="Visit us"
              title="1204b Stratford Road."
              description="Embedded map using the source contact page iframe URL."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="overflow-hidden rounded-5xl border border-white/10 bg-white/[0.04] p-3">
              <iframe
                title={`Google Map showing ${address}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-[22rem] w-full rounded-4xl border-0 sm:h-[28rem]"
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
