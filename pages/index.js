import { useState } from "react";
import Head from "next/head";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function Home() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
    supabase.auth.signIn({
      email,
    });
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome Home</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  );
}
