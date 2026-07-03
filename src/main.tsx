import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter } from "react-router";
import { TooltipProvider } from './components/ui/tooltip.tsx';
import i18n from "./i18n";
import { ThemeProvider } from './contexts/theme.tsx';


function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const applyLanguage = (lng: string) => {
      document.documentElement.lang = lng;
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    };

    applyLanguage(i18n.resolvedLanguage || i18n.language);

    i18n.on("languageChanged", applyLanguage);

    return () => {
      i18n.off("languageChanged", applyLanguage);
    };
  }, [i18n]);
  return (
    <TooltipProvider>
      {children}
    </TooltipProvider>
  )
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RootLayout>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </RootLayout>
    </BrowserRouter>
  </StrictMode>,
)
