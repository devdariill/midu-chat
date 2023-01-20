import { createSupabaseServerClient } from "~/utils/supabase.server";
import { Form, useLoaderData } from "@remix-run/react";
import { LoaderArgs, json, ActionArgs } from "@remix-run/node";
import { Login } from "~/components/Login";
import { RealTimeMessages } from "~/components/RealTimeMessages";
//loader Server
export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const { data } = await supabase.from("messages").select();
  return json({ messages: data ?? [] }, { headers: response.headers });
};
// on submit => action
export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  // values of the form
  const formData = await request.formData();
  const { message } = Object.fromEntries(formData);
  console.log(message);
  await supabase.from("messages").insert({ content: String(message) });
  // TODO: guardar en la supabase
  return json({ message: "ok" }, { headers: response.headers });
};
export default function Index() {
  const { messages } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>midudev</h1>
      <Login />
      <Form method="post">
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </Form>
      <RealTimeMessages serverMessages={messages}/>
    </main>
  );
}
