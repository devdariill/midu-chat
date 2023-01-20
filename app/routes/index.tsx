import { createSupabaseServerClient } from "~/utils/supabase.server"; 
import { useLoaderData } from "@remix-run/react";
import { LoaderArgs, json } from "@remix-run/node";
import { Login } from "~/components/Login";
//loader Server
export const loader = async ({request}: LoaderArgs) => {
  const response = new Response(); 
  const supabase = createSupabaseServerClient({request, response});
  const { data } = await supabase.from("messages").select();
  return json({ messages: data ?? [] }, { headers: response.headers });
};
export default function Index() {
  const { messages } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>midudev</h1>
      <Login/>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </main>
  );
}
