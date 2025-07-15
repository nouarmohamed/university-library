"use client";

import AuthForm from '@/components/AuthForm'
import { signUp } from '@/lib/actions/auth.action';
import { registerSchema } from '@/lib/validation'

const page = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={registerSchema}
      defaultValues={{ fullName: '', email: '', universityId: 0, password: '', universityCard: '' }}
      onSubmit={signUp}
    />
  )
}

export default page