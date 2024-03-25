"use client";

import Button from "@/components/Button/Button";
import InputError from "@/components/Errors/InputError";
import InputText from "@/components/Input/Input";
import { useLogin } from "@/hooks/useAuthApi";
import { useAuth } from "@/providers/AuthContext";
import Link from "next/link";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

function LoginPage() {
  // API login to kanban system
  const { mutate, error, isPending, data } = useLogin();
  const { setToken, reVerifyToken } = useAuth();

  const [body, setBody] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBody((prevBody) => ({ ...prevBody, [name]: value }));
  }, []);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(body, {
      onError: (e) => console.log(e),
      onSuccess: (data) => {
        setToken(data);
        reVerifyToken();
      },
    });
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Login to use!
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
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
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Forgot password?
          </a>
        </div>
        <Button title="Login" isLoading={isPending} type="submit" />
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          {"Don't have an account? "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
