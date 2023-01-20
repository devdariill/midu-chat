import { supabase } from "~/utils/supabase";
import { useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/node";
export const loader = async ({}: LoaderArgs) => {
  const { data } = await supabase.from("messages").select();
  return { messages: data ?? [] };
};
export default function Index() {
  const { messages } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>midudev</h1>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </main>
  );
}
