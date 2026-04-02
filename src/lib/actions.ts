'use server';

import { signIn } from './auth';
import { AuthError } from 'next-auth';
import { SignInZod } from './zod';
import type { SignInType } from '@/types/auth';

export async function signinUser(prevState: SignInType, formData: FormData): Promise<SignInType> {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const parsed = SignInZod.safeParse(data);

  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
    });

    return {
      ok: true,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            ok: false,
            error: 'Email atau Password Salah',
          };
        default:
          return {
            ok: false,
            error: 'Terjadi kesalahan sistem',
          };
      }
    }
    throw error;
  }
}
