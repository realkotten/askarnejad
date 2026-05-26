import { AssayCertificate } from '../types';
import { mockCertificates } from '../data';

const STORAGE_KEY = 'askarnejad_certificates';

// Initialize the database with mock certificates as the initial seed if storage is empty
const getStoredCertificates = (): Record<string, AssayCertificate> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCertificates));
    return mockCertificates;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error parsing certificates from localStorage, resetting to mock data', e);
    return mockCertificates;
  }
};

export const dbService = {
  // Query certificate by hallmark ID (case insensitive search)
  getCertificate: (id: string): AssayCertificate | null => {
    const certs = getStoredCertificates();
    const cleanId = id.trim().toUpperCase();
    return certs[cleanId] || null;
  },

  // Save new or update existing certificate
  saveCertificate: (cert: AssayCertificate): void => {
    const certs = getStoredCertificates();
    const cleanId = cert.id.trim().toUpperCase();
    certs[cleanId] = {
      ...cert,
      id: cleanId, // Enforce uppercase key
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
  },

  // Delete a certificate
  deleteCertificate: (id: string): void => {
    const certs = getStoredCertificates();
    const cleanId = id.trim().toUpperCase();
    if (certs[cleanId]) {
      delete certs[cleanId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
    }
  },

  // List all certificates sorted by date/ID
  getAllCertificates: (): AssayCertificate[] => {
    const certs = getStoredCertificates();
    return Object.values(certs).sort((a, b) => b.id.localeCompare(a.id));
  }
};
