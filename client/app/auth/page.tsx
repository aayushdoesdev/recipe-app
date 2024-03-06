"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const page = () => {
  return (
    <div className="lg:flex justify-center items-center gap-14">
      <Register />
      <Login />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  axios.defaults.withCredentials = true;

  const handleSubmit = async () => {
    try {
      const result = await axios.post("https://recipe-app-mern-six.vercel.app/auth/register", {
        username,
        password,
      });
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex justify-center items-center sm:mt-36 lg:mt-12">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>New here? Get yourself registered</CardDescription>
        </CardHeader>
        <form>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="name"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const router = useRouter();
  axios.defaults.withCredentials = true;

  const handleSubmit = async () => {
    try {
      const result = await axios.post("https://recipe-app-mern-six.vercel.app/auth/login", {
        username,
        password,
      });
      
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex justify-center items-center mt-12">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome back! We missed you</CardDescription>
        </CardHeader>
        <form>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  id="name"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default page;
