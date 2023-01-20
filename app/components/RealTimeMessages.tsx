import { useSupabase } from "~/hooks/useSupabase";
import { useEffect, useState } from "react";
import { Database } from "~/types/database";
type Message = Database["public"]["Tables"]["messages"]["Row"];
export function RealTimeMessages({
  serverMessages,
}: {
  serverMessages: Message[];
}) {
  const [messages, setMessage] = useState<Message[]>(serverMessages);
  const supabase = useSupabase();
  useEffect(() => {
    const channel = supabase
      .channel("message:*") // que canal queremos escuchar // TODO: FIX
      .on(
        "postgres_changes", //broadcast
        { event: "INSERT", schema: "public", table: "messages" }, // filter
        (payload) => {
          //callback
          const newMessage = payload.new as Message;
          // setMessage((messages) => [...messages, newMessage]); // TODO: FIX 2:25:47
          if (!messages.some((message) => message.id === newMessage.id)) {
            setMessage((messages) => [...messages, newMessage]);
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);
  return <pre>{JSON.stringify(messages, null, 2)}</pre>;
}
