"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/config/supabase/supabase-client";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleOAuth = async () => {
      // This parses the URL and completes the OAuth flow
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
        return;
      }

      if (data.session) {
        // Save session if you want, e.g., in context or localStorage
        router.replace("/lists"); // redirect after login
      }
    };

    handleOAuth();
  }, [router, supabase]);

  return <p>Logging in...</p>;
}
