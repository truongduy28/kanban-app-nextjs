"use client";

import Button from "@/components/Button/Button";
import InputError from "@/components/Errors/InputError";
import InputText from "@/components/Input/Input";
import { useSignUp } from "@/hooks/useAuthApi";
import Link from "next/link";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

const SignUpPage = () => {
  // API sign up to create account
  const { mutate, error, isPending } = useSignUp();

  const [body, setBody] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBody((prevBody) => ({ ...prevBody, [name]: value }));
  }, []);

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(body, {
      onError: (e) => console.log(e),
    });
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={(e) => handleSignUp(e)}
      >
        {Object.entries(body).map(([key, value]) => (
          <>
            <InputText
              key={key}
              value={value}
              name={key}
              onChange={handleInputChange}
              label={key}
              placeholder={
                key.toLowerCase().includes("password")
                  ? "••••••••"
                  : `Enter your ${key}`
              }
              type={
                key.toLowerCase().includes("password") ? "password" : "text"
              }
            />
            {error && error.errors?.find((e) => e.param === key) && (
              <InputError
                msg={error.errors?.find((e) => e.param === key)?.msg as string}
              />
            )}
          </>
        ))}
        <Button
          title="Sign Up"
          className="mt-10"
          type="submit"
          isLoading={isPending}
        />
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
