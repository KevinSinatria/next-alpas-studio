"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { INITIAL_LOGIN_FORM } from "@/constants/auth-constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { SupabaseClient } from "@supabase/supabase-js";
import { Eye, EyeClosed, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
// import type { Metadata } from "next";
import { useForm } from "react-hook-form";
import z from "zod";

// export const metadata: Metadata = {
//    title: "Alpas Studio | Admin Login Page",
//    description: "Halaman login untuk admin Alpas Studio.",
// };

const loginFormSchema = z.object({
   username: z.string().min(1, {
      message: "Username is required.",
   }),
   password: z.string().min(1, {
      message: "Password is required.",
   })
})

const LoginPage = () => {
   const form = useForm<z.infer<typeof loginFormSchema>>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: INITIAL_LOGIN_FORM
   });
   const [showPassword, setShowPassword] = useState(false);

   function onSubmit(values: z.infer<typeof loginFormSchema>) {
   
      console.log("Form submitted with values:", values);
      if (values.username  == 'waqqir' && values.password == 'waqqir2101'){
         console.log("login berasil");
         return window.location.href = '/admin';
      }
      else {
         console.log("login gagal");
         return; 
      }
      // Handle login logic here
   }

   return (
      <div className="flex flex-col items-center justify-center w-full px-8 h-screen">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 bg-white/20 rounded-lg shadow-lg backdrop-blur p-8 w-full max-w-xl">
               <header className="w-full flex items-center justify-center">
                  <h1 className="text-3xl font-semibold text-gray-800">Login</h1>
               </header>
               <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                           <div className="relative">
                              <Input type="text" className="bg-white focus-visible:ring-gray-900" placeholder="Your username here" {...field} />
                              <Mail className="absolute top-2 right-2" />
                           </div>
                        </FormControl>
                        <FormDescription className="text-gray-700">
                           This is your username.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                           <div className="relative">
                              <Input type={showPassword ? "text" : "password"} className="bg-white focus-visible:ring-gray-900" placeholder="Your password here" {...field} />
                              {showPassword ? <Eye onClick={() => setShowPassword(!showPassword)} size={32} className="absolute top-[2px] right-1 p-1 rounded-lg transition-all hover:bg-gray-300 cursor-pointer" /> : <EyeClosed onClick={() => setShowPassword(!showPassword)} size={32} className="absolute top-[2px] right-1 p-1 rounded-lg transition-all hover:bg-gray-300 cursor-pointer" />}
                           </div>
                        </FormControl>
                        <FormDescription className="text-gray-700">
                           This is your password.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit">Login</Button>
               <footer className="w-full flex flex-col gap-8 items-center justify-center">
                  <p className="italic text-xs">*make sure that youre an admin from ALPAS Studio</p>
                  <Image src="/alpas-dark-logo.svg" alt="Alpas Logo" width={100} height={100} />
               </footer>
            </form>
         </Form>
      </div>
   )
}

export default LoginPage;