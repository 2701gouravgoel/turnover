import { useState } from "react";
import type { NextPage } from "next";
import Navigation from "../../components/Navigation";
import Button from "../../components/button";
import { useRouter } from "next/router";
import { trpc } from "../_app";

const SignIn: NextPage = ({}) => {
  const [otp, setOTP] = useState<string[]>(["", "", "", "", "", "", "", ""]);
  let currentUser = "";
  if (typeof window !== "undefined") {
    currentUser = localStorage.getItem("currentUser") || "";
  }
  const router = useRouter();
  const otpQuery = trpc.user.checkOtp.useQuery({
    email: currentUser,
    otp: otp.join(""),
  });
  const handleChange = (index: number, value: string) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
  };
  const onSubmit = () => {
    console.log(otp.join(""));
    const { data = false } = otpQuery;
    if (data) {
      localStorage.setItem("otpVerified", "true");
      router.push("/products");
    } else alert("Not valid attempt");
  };
  return (
    <div className="flex flex-col items-center page">
      <Navigation />
      <div className="flex flex-col border border-solid border-gray-300 br-20 px-15 py-10 items-center modal mt-10">
        <div className="mb-8">
          <span className="font-semibold text-black fs-32">
            Verify your email
          </span>
        </div>
        <div className="text-black font-medium fs-24 margin-bottom-13">
          Welcome back to ECOMMERCE
        </div>
        <div className="text-black text-sm mb-8">
          Enter the 8 digit code you have received on {currentUser}
        </div>
        <div>
          <div className="text-black text-sm mb-2">Code</div>
          <div className="flex gap-3 mb-16">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                className="otpInput"
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>
        <Button text="Verify" onClick={onSubmit} />
      </div>
    </div>
  );
};
export default SignIn;
