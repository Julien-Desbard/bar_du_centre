"use server"
import { signIn, signOut } from "@/auth";

export async function handleSignOut() {
    await signOut({ redirectTo: "/login" });
}

export async function handleSignIn() {
    await signIn("github", { redirectTo: "/admin" });
}
