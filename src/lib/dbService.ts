import { AssayCertificate } from '../types';
import { db } from './firebase';
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const COLLECTION_NAME = 'certificates';

export const dbService = {
  getCertificate: async (id: string): Promise<AssayCertificate | null> => {
    const cleanId = id.trim().toUpperCase();
    try {
      const docRef = doc(db, COLLECTION_NAME, cleanId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as AssayCertificate) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, COLLECTION_NAME + '/' + cleanId);
    }
  },

  saveCertificate: async (cert: AssayCertificate): Promise<void> => {
    const cleanId = cert.id.trim().toUpperCase();
    try {
      await setDoc(doc(db, COLLECTION_NAME, cleanId), {
        ...cert,
        id: cleanId,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME + '/' + cleanId);
    }
  },

  deleteCertificate: async (id: string): Promise<void> => {
    const cleanId = id.trim().toUpperCase();
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, cleanId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, COLLECTION_NAME + '/' + cleanId);
    }
  },

  getAllCertificates: async (): Promise<AssayCertificate[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => doc.data() as AssayCertificate)
        .sort((a, b) => b.id.localeCompare(a.id));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  }
};
