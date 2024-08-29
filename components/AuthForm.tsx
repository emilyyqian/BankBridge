'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = authFormSchema(type)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: ""
      },
    })
   
    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      setIsLoading(true)

      try {
        // Sign up with Appwrite & create Plaid token
        if (type === 'sign-up') {
          const newUser = await signUp(data)

          setUser(newUser)
        }
        if (type === 'sign-in') {
          const response = await signIn({
            email: data.email,
            password: data.password
          })

          if (response) router.push('/')
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    
  return (
    <section className="auth-form font-arimo">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image 
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="BankBridge logo"
          />
          <h1 className="text-24 font-libre-caslon-text font-bold text-black-1">BankBridge</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-26 lg:text-36 font-libre-caslon-text font-semibold text-gray-900">
            {user
              ? 'Link Account'
              : type === 'sign-in'
                ? 'Welcome Back.'
                : 'Join Us.'
            }
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
                ? 'Link your account to get started.'
                : type === 'sign-in'
                  ? 'Sign in with your email.'
                  : 'Please enter your details to sign up.'
            }
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/* PlaidLink */}
        </div>
      ): (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your first name" />
                    <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" />
                  </div>
                  <CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your specific address" />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="city" label="City" placeholder="Enter your city" />
                    <CustomInput control={form.control} name="state" label="State" placeholder="Ex. NJ" />
                    <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="Ex. 12452" />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="yyyy-mm-dd" />
                    <CustomInput control={form.control} name="ssn" label="SSN" placeholder="Ex. 123456789" />
                  </div>
                </>
              )}

              <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />

              <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />

              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn font-libre-caslon-text" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;Loading...
                    </>
                  ): type === 'sign-in'
                    ? 'Sign In' : 'Sign Up'
                  }
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-16 font-normal text-gray-600">
              {type === 'sign-in'
              ? "Don't have an account?"
              : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link font-libre-caslon-text">
              {type === 'sign-in' ? 'Create yours now.' : 'Sign in.'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm