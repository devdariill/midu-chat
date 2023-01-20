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
import { createClient } from "@supabase/supabase-js";
import { useState, useMemo } from "react";
import { Database } from "./types/database";
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Midu Chat en Tiempo Real",
  viewport: "width=device-width,initial-scale=1",
});
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
export const loader = async ({}: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };
  return { env };
};
export default function App() {
  const { env } = useLoaderData<typeof loader>();
  const [supabase] = useState(() =>
    createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );
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
