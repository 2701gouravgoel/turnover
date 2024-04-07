import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Input from "../../components/textInput";
import Navigation from "../../components/Navigation";
import Button from "../../components/button";
import { useRouter } from "next/router";
import { trpc } from "../_app";

interface formValue {
  email: string;
  password: string;
}
const SignIn: NextPage = ({}) => {
  const [formField, setFormField] = useState<formValue>({
    email: "",
    password: "",
  });

  const { email, password } = formField;
  const router = useRouter();
  const signInQuery = trpc.user.signIn.useQuery({ email, password });
  const handleFieldChange = ({
    id,
    value,
  }: {
    id: string;
    value: string;
  }): void => {
    setFormField((formField) => ({
      ...formField,
      [id]: value,
    }));
  };
  const onSubmit = () => {
    const { data = false } = signInQuery;
    if (!!data) {
      const { otpVerified } = data || {};
      localStorage.setItem("currentUser", email);
      if (otpVerified) {
        localStorage.setItem("otpVerified", "true");
        router.push("/products");
      } else router.push("/signUp/otp");
    } else alert("Not valid attempt");
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        localStorage.getItem("currentUser") &&
        localStorage.getItem("otpVerified")
      )
        router.push("/products");
    }
  }, [typeof window]);
  return (
    <div className="flex flex-col items-center page">
      <Navigation />
      <div className="flex flex-col border border-solid border-gray-300 br-20 px-15 py-10 items-center modal mt-10">
        <div className="mb-8">
          <span className="font-semibold text-black fs-32">Login</span>
        </div>
        <div className="text-black font-medium fs-24 margin-bottom-13">
          Welcome back to ECOMMERCE
        </div>
        <div className="text-black text-sm mb-8">
          The next gen business marketplace
        </div>
        <Input
          value={email}
          title="Email"
          id="email"
          onChange={handleFieldChange}
        />
        <Input
          value={password}
          title="Password"
          id="password"
          onChange={handleFieldChange}
        />
        <Button text="Login" onClick={onSubmit} />
        <div className="flex row items-center space-x-3">
          <span className="text-gray-800 text-sm">Don’t have an Account? </span>
          <span
            onClick={() => router.push("/signUp")}
            className="text-black text-sm font-medium cursor-pointer"
          >
            SIGN UP
          </span>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
