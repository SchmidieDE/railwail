export interface User {
   id: number;
   email: string;
   first_name: string;
   last_name: string;
   username: string | null;
   tokens: number;
   tokensused: number;
   is_active: boolean;
}
