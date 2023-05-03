import { createContext, useContext, useState } from "react";

interface AuthContextType {
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
}

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState(null);

  const value: AuthContextType = {
    userInfo,
    setUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
