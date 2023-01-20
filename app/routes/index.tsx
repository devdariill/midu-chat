import { supabase } from "~/utils/supabase";
import { useLoaderData } from "@remix-run/react";
export const loader = async ({}) => {
  const { data } = await supabase.from("messages").select();
  console.log(data)
  return { data };
};
export default function Index() {
  const { data } = useLoaderData();
  return (
    <main>
      <h1>midudev</h1>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  )
}
