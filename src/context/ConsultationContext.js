import { createContext, useContext } from 'react';

export const ConsultationContext = createContext({
  openConsultation: () => {},
  closeConsultation: () => {},
});

export function useConsultation() {
  return useContext(ConsultationContext);
}
