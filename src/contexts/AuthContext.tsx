"use client";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [updateImg, setUpdateImg] = useState<string>("");

useEffect(() => {
    const setStorage = () => {
      const userData = {
        authenticated: true,
        userName: 'ANDERSON ROGERIO B RODRIGUES',
        token:
          '4279E72401E0370266372D022914B20226AF8A514BA79AD4FB7B7E339426AC80484BC7623B29CDF7A387022675C1A4A6A9108BFF7B3E0B8D49220B04751B62F71A50EDFA3231C18671A78E2F6E8E124D',
        programs: [
          {
            code: 2866,
            acesso: true,
          },
          {
            code: 2867,
            acesso: true,
          },
          {
            code: 2868,
            acesso: true,
          },
          {
            code: 2874,
            acesso: true,
          },
          {
            code: 2878,
            acesso: true,
          },
          {
            code: 2890,
            acesso: true,
          },
          {
            code: 2928,
            acesso: true,
          },
          {
            code: 2939,
            acesso: true,
          },
        ],
        folders: [
          {
            path: 'bi3',
          },
          {
            path: 'apptv',
          },
          {
            path: 'ecommerce',
          },
        ],
      };
      setCookie('portal_access', JSON.stringify(userData));
    };
    setStorage();
  }, []);

  useEffect(() => {
    const recoveredUser: any = getCookie("portal_access");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const signOut = () => {
    deleteCookie("portal_access");
    setUser(null);
    router.push("http://portal.gruposolar.com.br/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        signOut,

        loading,
        setLoading,

        updateImg,
        setUpdateImg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);