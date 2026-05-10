'use client';

import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  text: string;
  loadingText?: string;
  className?: string;
};

export default function SubmitButton({
  text,
  loadingText = 'Save...',
  className = '',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors ${className}`}
    >
      {pending ? loadingText : text}
    </button>
  );
}
