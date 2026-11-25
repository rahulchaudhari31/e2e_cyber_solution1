import siteContent from './siteContent';

const { company, contact } = siteContent;

const address = contact.addressLines.join(', ');

export const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=72',
    notice: 'No privacy policy text was found in the crawled source site. This is placeholder copy.',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          `${company.name} is an integrated web development, marketing and creative agency with digital at its core. You can contact us at ${contact.email} or ${address}.`,
        ],
      },
      {
        heading: 'Information we collect',
        paragraphs: [
          'Placeholder copy: describe the information collected through this website and any contact forms.',
        ],
        list: ['Details you submit in a contact form', 'Technical information needed to serve the site', 'Messages you send to us directly'],
      },
      {
        heading: 'How we use information',
        paragraphs: [
          'Placeholder copy: explain how information is used to respond to enquiries, deliver services and improve the website.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          `Placeholder copy: explain how to request access, correction or deletion. Contact ${contact.email} to make a request.`,
        ],
      },
      {
        heading: 'Policy updates',
        paragraphs: [
          'Placeholder copy: state when and how this policy may change, and how updates will be published.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms',
    slug: 'terms',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=72',
    notice: 'No terms text was found in the crawled source site. This is placeholder copy.',
    sections: [
      {
        heading: 'Using this website',
        paragraphs: [
          'Placeholder copy: set out the rules for using this website and any limitations on permitted use.',
        ],
      },
      {
        heading: 'Services and enquiries',
        paragraphs: [
          `${company.name} provides integrated web development, marketing, strategy and content solutions. Placeholder copy: state that enquiries do not form a contract until agreed in writing.`,
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'Placeholder copy: describe ownership of website content, designs, copy and project deliverables.',
        ],
      },
      {
        heading: 'Liability',
        paragraphs: [
          'Placeholder copy: describe any limitations of liability and warranties in line with approved legal advice.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          `Questions about these terms can be sent to ${contact.email} or ${address}.`,
        ],
      },
    ],
  },
};
