const env = import.meta.env || {};

export const contactFormConfig = {
  provider: env.VITE_CONTACT_PROVIDER || 'placeholder',
  endpoint: env.VITE_CONTACT_ENDPOINT || '',
  publicKey: env.VITE_EMAILJS_PUBLIC_KEY || '',
  serviceId: env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: env.VITE_EMAILJS_TEMPLATE_ID || '',
};

export async function submitContactForm(values) {
  // Add your key here: set contactFormConfig.publicKey/serviceId/templateId for EmailJS,
  // or contactFormConfig.endpoint for Formspree/a backend. Prefer import.meta.env values in production.

  if (contactFormConfig.endpoint) {
    const response = await fetch(contactFormConfig.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(`Contact form request failed with status ${response.status}`);
    }

    return response.json();
  }

  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    ok: true,
    provider: 'placeholder',
    reference: `local-${Date.now()}`,
  };
}
