import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

function App({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session);
      if (event === "SIGNED_IN") {
        setIsAuthenticated(true);
      }
      if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
      }
    });
    checkUser();
    return () => {
      data.unsubscribe();
    };
  }, []);
  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setIsAuthenticated(true);
    }
  }
  async function handleAuthChange(event, session) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }
  return (
    <div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/app">App</Link>
        {isAuthenticated ? "Signed in" : "Anonymous"}
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
