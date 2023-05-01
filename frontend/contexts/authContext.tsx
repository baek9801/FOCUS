import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
}

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const [userInfo, setUserInfo] = useState(null);

  const value: AuthContextType = {
    isLoading,
    setIsLoading,
    userInfo,
    setUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
