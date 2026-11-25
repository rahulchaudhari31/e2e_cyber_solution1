import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { Modal } from '../ui';
import { ConsultationContext } from '../../context/ConsultationContext';

const ContactForm = lazy(() => import('../ContactForm'));

export default function ConsultationProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openConsultation = useCallback(() => setOpen(true), []);
  const closeConsultation = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openConsultation, closeConsultation }),
    [openConsultation, closeConsultation],
  );

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <Modal
        open={open}
        onClose={closeConsultation}
        title="Get a Free Consultation"
        description="A quick digital review of your business — no obligation, just practical next steps."
        size="lg"
      >
        <Suspense
          fallback={
            <div className="grid min-h-[24rem] place-items-center" role="status" aria-label="Loading consultation form">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-primary-300" />
            </div>
          }
        >
          <ContactForm compact />
        </Suspense>
      </Modal>
    </ConsultationContext.Provider>
  );
}
