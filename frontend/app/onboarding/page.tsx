"use client";
import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState("Setting up your account...");

  useEffect(() => {
    if (!isLoaded || !user) return;

    async function syncUser() {
      try {
        const token = await getToken();
        await apiFetch("/api/auth/sync-user", {
          method: "POST",
          token: token ?? undefined,
          body: JSON.stringify({
            clerkId: user!.id,
            email: user!.emailAddresses[0].emailAddress,
            name: user!.fullName ?? "",
          }),
        });
        setStatus("Account ready! Taking you to your jobs...");
        setTimeout(() => router.push("/dashboard/jobs"), 1000);
      } catch (err) {
        setStatus("Something went wrong. Please refresh.");
        console.error(err);
      }
    }

    syncUser();
  }, [isLoaded, user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <div className="flex items-center gap-1 font-bold text-xl">
        <span>⚡</span>
        <span>matchai</span>
      </div>
      <div>{status}</div>
    </div>
  );
}
