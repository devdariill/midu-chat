import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from './styles/global.css'
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Midu Chat en Tiempo Real",
  viewport: "width=device-width,initial-scale=1",
});
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles},] 
export default function App() {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
