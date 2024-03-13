"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../utils/auth";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
}) => {
  const router = useRouter();
  if (!isAuthenticated()) {
    router.push("/login");
  }
  return <> {children}</>;
};
export default AuthenticatedRoute;
