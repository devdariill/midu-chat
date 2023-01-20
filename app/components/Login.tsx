// import { supabase } from "~/utils/supabase.server";
import { useSupabase } from "~/hooks/useSupabase";
export function Login() {
  const supabase = useSupabase();
  const handlerLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logout: ", error);
  };
  const handlerLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) console.log("Error login: ", error);
  };
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <button onClick={handlerLogin}>Login</button>
      <button onClick={handlerLogout}>Logout</button>
    </div>
  );
}
