import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Input from "../../components/textInput";
import Navigation from "../../components/Navigation";
import Button from "../../components/button";
import { useRouter } from "next/router";
import { trpc } from "../_app";

interface formValue {
  name: string;
  email: string;
  password: string;
}

const SignUp: NextPage = ({}) => {
  const [formField, setFormField] = useState<formValue>({
    name: "",
    email: "",
    password: "",
  });
  const updateMutation = trpc.user.addUser.useMutation({
    async onSuccess() {
      alert("user Added");
    },
    async onError() {
      if (updateMutation.error?.data?.zodError) {
        const fieldErrors = updateMutation.error.data.zodError.fieldErrors;
        alert(fieldErrors);
      }
    },
  });
  const { name, email, password } = formField;
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        localStorage.getItem("currentUser") &&
        localStorage.getItem("otpVerified")
      ) {
        router.push("/products");
      }
    }
  }, []);
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
    updateMutation.mutate({ name, email, password });
    localStorage.setItem("currentUser", email);
    router.push("/signUp/otp");
  };
  return (
    <div className="flex flex-col items-center page">
      <Navigation />
      <div className="flex flex-col border border-solid border-gray-300 br-20 px-15 py-10 items-center modal mt-10">
        <div className="mb-8">
          <span className="font-semibold text-black fs-32">
            Create your account
          </span>
        </div>
        <Input
          value={name}
          title="Name"
          id="name"
          onChange={handleFieldChange}
        />
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
        <Button text="Create account" onClick={onSubmit} />
        <div className="flex row items-center space-x-3">
          <span className="text-gray-800 text-sm">Have an Account?</span>
          <span
            onClick={() => router.push("/signIn")}
            className="cursor-pointer text-black text-sm font-medium"
          >
            LOGIN
          </span>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
