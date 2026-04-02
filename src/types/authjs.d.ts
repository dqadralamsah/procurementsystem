import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      role: {
        roleCode: string;
        name: string;
      };
    } & DefaultSession['user'];
  }

  interface User {
    role?: {
      roleCode: string;
      name: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string;
    role?: {
      roleCode: string;
      name: string;
    };
  }
}
