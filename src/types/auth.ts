export type SignInType = {
  ok: boolean;
  error?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};
