import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json(
      { message: "Supabase is not configured." },
      { status: 503 },
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (adminError) {
    return NextResponse.json(
      { message: adminError.message || "Could not verify admin access." },
      { status: 500 },
    );
  }

  if (!admin) {
    return NextResponse.json({ message: "Forbidden." }, { status: 403 });
  }

  revalidateTag("platforms");

  return NextResponse.json({ revalidated: true });
}
