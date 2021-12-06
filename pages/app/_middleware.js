import { NextRequest, NextResponse } from "next/server";

const jwt = require("@tsndr/cloudflare-worker-jwt");

// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_KEY,
//   {
//     fetch: fetch,
//   }
// );

export async function middleware(req) {
  // const { user, data, token, error } = await supabase.auth.api.getUserByCookie(
  //   req
  // );

  const token = req.cookies[`sb:token`];

  const isValid = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);

  console.log({
    token,
    SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
    isValid,
  });

  if (isValid) {
    NextResponse.next();
  } else {
    NextResponse.redirect(`/`);
  }

  // console.log({ user, data, token, error });

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
