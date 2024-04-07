import { z } from "zod";
//import { Prisma } from "@prisma/client";
import { t } from "../trpc";

interface user{
  name:string,email:string,password:string,otpVerified?:boolean
}
let users:user[]=[]

//as i am apply as frontend developer
//so i put it as without proper validations
export const userRouter = t.router({
    signIn: t.procedure
    .input( z.object({ email: z.string() ,password:z.string()}) )
    .query(async ({ input }) => {
      console.log(users,'users')
            const {email,password}=input
            const a=users.filter(({email:e,password:p})=>email===e&&password===p)
            if(a.length)
            {
              return a[0]
            }
        },
    ),
    checkOtp: t.procedure
    .input( z.object({email: z.string() , otp: z.string() }) )
    .query(async ({ input }) => {
            const {email,otp}=input
            console.log(otp,'otp')
            if(otp==='12345678')
            {
              users=users.map((user)=>{
                const {email:e}=user;
                if(email===e)
                  return {...user,otpVerified:true}
                return user
              })
              return true
            }
        },
    ),
    addUser: t.procedure
    .input( z.object({ name: z.string(),email: z.string(),password:z.string()}) )
    .mutation(async ({ input }) => {
        users=[...users,input]
        return true
    }),
});