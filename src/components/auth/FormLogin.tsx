'use client';

import { useActionState } from 'react';
import { signinUser } from '@/lib/actions';
import type { SignInType } from '@/types/auth';

const initialState: SignInType = {
  ok: false,
};

export default function FormLogin() {
  const [state, formAction] = useActionState(signinUser, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="p-4 rounded-lg text-sm text-red-800 bg-red-100">{state.error}</div>
      )}

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="email@example.com"
          className="w-full p-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-blue-500"
        />
        {state.errors?.email && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="******"
          className="w-full p-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-blue-500"
        />
        {state.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password[0]}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full p-2 text-white font-medium bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}
