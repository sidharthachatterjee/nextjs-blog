import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export async function middleware(req) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  console.log({ user });

  NextResponse.next();

  //   if (!user) {
  //     // If no user, redirect to index.
  //     return { props: {}, redirect: { destination: "/", permanent: false } };
  //   }

  // If there is a user, return it.
  //   return { props: { user } };

  //   return new Response("Auth required", {
  //     status: 401,
  //     headers: {
  //       "WWW-Authenticate": 'Basic realm="Secure Area"',
  //     },
  //   });
}