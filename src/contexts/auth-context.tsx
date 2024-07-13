import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

import { UserData } from '../types/organizational-models';
import { firebaseApp } from '../firebase/firebase-config';

interface AuthContextType {
  user: UserData | null;
  token: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const getUserRol = async (uid: string) => {
  const docRef = doc(firestore, `usuarios/${uid}`);
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.role;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRole = await getUserRol(firebaseUser.uid);
        const userData: UserData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: userRole,
        };
        const token = await firebaseUser.getIdToken();
        setUser(userData);
        setToken(token);
      } else {
        setUser(null);
        setToken(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
