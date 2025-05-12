import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "next-themes"; // next-themes is compatible with React

import { Layout } from './components/layout/Layout';
import { Toaster } from "@/components/ui/toaster";

// Import page components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AiToolsPage from './pages/ai-tools/AiToolsPage';
import PolishEmailPage from './pages/ai-tools/polish-email/PolishEmailPage';
import TextInsightsPage from './pages/ai-tools/text-insights/TextInsightsPage';
import SummarizePage from './pages/ai-tools/summarize/SummarizePage';
import GenerateContentPage from './pages/ai-tools/generate-content/GenerateContentPage';
import TranslatePage from './pages/ai-tools/translate/TranslatePage';
import FontTransformerPage from './pages/ai-tools/font-transformer/FontTransformerPage';
import GrammarCheckPage from './pages/ai-tools/grammar-check/GrammarCheckPage';
import SpeechToTextPage from './pages/ai-tools/speech-to-text/SpeechToTextPage';
import TextToSpeechPage from './pages/ai-tools/text-to-speech/TextToSpeechPage';
import TranscribeAudioPage from './pages/ai-tools/transcribe-audio/TranscribeAudioPage';

import ContactPage from './pages/ContactPage';
import DataPrivacyPage from './pages/DataPrivacyPage';
import FaqPage from './pages/FaqPage';
import HelpPage from './pages/HelpPage';
import PricingPage from './pages/PricingPage';
import ExtensionInfoPage from './pages/ExtensionInfoPage';

import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import OtpVerificationPage from './pages/auth/OtpVerificationPage';
import UserDashboardPage from './pages/dashboard/user/UserDashboardPage';
import AdminDashboardPage from './pages/dashboard/admin/AdminDashboardPage';
import SettingsPage from './pages/settings/SettingsPage';

import NotFoundPage from './pages/NotFoundPage'; // Renamed from not-found.jsx

// A simple loading component for Suspense fallback
const LoadingFallback = () => <div className="flex flex-grow flex-col items-center justify-center text-center py-10">Loading...</div>;

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Router>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/ai-tools" element={<AiToolsPage />} />
              <Route path="/ai-tools/polish-email" element={<PolishEmailPage />} />
              <Route path="/ai-tools/text-insights" element={<TextInsightsPage />} />
              <Route path="/ai-tools/summarize" element={<SummarizePage />} />
              <Route path="/ai-tools/generate-content" element={<GenerateContentPage />} />
              <Route path="/ai-tools/translate" element={<TranslatePage />} />
              <Route path="/ai-tools/font-transformer" element={<FontTransformerPage />} />
              <Route path="/ai-tools/grammar-check" element={<GrammarCheckPage />} />
              <Route path="/ai-tools/speech-to-text" element={<SpeechToTextPage />} />
              <Route path="/ai-tools/text-to-speech" element={<TextToSpeechPage />} />
              <Route path="/ai-tools/transcribe-audio" element={<TranscribeAudioPage />} />
              
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/data-privacy" element={<DataPrivacyPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/extension-info" element={<ExtensionInfoPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/otp-verification" element={<OtpVerificationPage />} />
              <Route path="/dashboard/user" element={<UserDashboardPage />} />
              <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
