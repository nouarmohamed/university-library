"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "../config";

export const signInWithCredentials = async (params: Pick<User, "email" | "password">) => {
    const { email, password } = params;
    
    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1'

    const {success} = await ratelimit.limit(ip)
    if (!success) redirect('/too-fast')

    try {
        const result = await signIn("credentials", {email, password, redirect: false});
        
        if (result?.error) {
            return { success: false, error: result.error };
        }
        return { success: true };
    } catch (error) {
        console.error("Error signing in:", error);
        return { success: false, error: "Failed to sign in" };
    }
}

export const signUp = async (params: User) => {
    const {email, password, fullName, universityId, universityCard} = params;

    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
        return { success: false, error: "User already exists" };
    }

    const hashedPassword = await hash(password, 10);
    try {
        const user =await db.insert(users).values({
            email,
            password: hashedPassword,
            fullName,
            universityId,
            universityCard
        });
        if (!user) {
            return { success: false, error: "Failed to create user" };
        }
        const { workflowRunId } = await workflowClient.trigger({
            url: `${config.env.prodApiEndpoint}/api/workflows`,
            body: {email, fullName},
        })
        console.log(workflowRunId)

        await signInWithCredentials({email, password})

        return { success: true };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: "Failed to create user" };
    }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/sign-in" });
}