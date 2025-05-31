// app/actions/setAdminTokens.ts
"use server";
import { cookies } from "next/headers";

type ISetAdminTokens = {
   accessToken: string;
};
export async function setAdminTokens({ accessToken }: ISetAdminTokens) {
   const cookieStore = await cookies();
   cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
   });
}
export async function deleteAdminTokens() {
   const cookieStore = await cookies();
   cookieStore.delete("accessToken");
}
export async function getAdminTokens() {
   const cookieStore = await cookies();
   const accessToken = cookieStore.get("accessToken")?.value;
   const refreshToken = cookieStore.get("refreshToken")?.value;
   console.log({ accessToken, refreshToken });
   return { accessToken, refreshToken };
}
