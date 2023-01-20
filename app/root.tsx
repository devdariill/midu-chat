import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "./styles/global.css";
import { LoaderArgs } from "@remix-run/node";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
// import { createClient } from "@supabase/supabase-js";// old
import { useState, useMemo, useEffect } from "react";
import { Database } from "./types/database";
import { createSupabaseServerClient } from "./utils/supabase.server";
import { json } from "@remix-run/node";
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Midu Chat en Tiempo Real",
  viewport: "width=device-width,initial-scale=1",
});
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
export const loader = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };
  const response = new Response();
  // guardar cookies de la session ?.en el servidor
  const supabase = createSupabaseServerClient({ request, response });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return json({ env, session }, { headers: response.headers });
};
export default function App() {
  const { env, session } = useLoaderData<typeof loader>();
  console.log("Server", session);
  const [supabase] = useState(
    () => createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
    // createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Client", session);
    });
  }, []);
  // useMemo = useState_supabase
  // const supabase = useMemo(
  //   () => createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY),
  //   [env.SUPABASE_ANON_KEY,env.SUPABASE_URL]
  // );
  // se crea en cada render  de la app
  // const supabase = createClient(
  //   env.SUPABASE_URL,
  //   env.SUPABASE_ANON_KEY
  // )
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ supabase, name: "devdariill" }} />
        <div>Outlet</div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
