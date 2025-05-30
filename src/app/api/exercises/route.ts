import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const client = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_ANON_KEY as string
    );
    const { data, error } = await client.from("exercises").select("name");

    if (error) throw error;

    return new Response(JSON.stringify(data));
  } catch (err) {
    console.log(err);
    return new Response("サーバーエラーが発生しました", { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  const newExercise = await req.json();

  console.log(newExercise);

  try {
    const client = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_ANON_KEY as string
    );
    const { error } = await client.from("exercises").insert(newExercise);

    if (error) {
      if (error.code === "23505")
        return new Response("既に存在するトレーニング種目です", {
          status: 409,
        });
      return new Response("サーバーエラーが発生しました", { status: 500 });
    }

    return new Response("トレーニング種目が追加されました", { status: 201 });
  } catch (err) {
    return new Response("サーバーエラーが発生しました", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const { name, id } = await req.json();

  try {
    const client = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_ANON_KEY as string
    );
    const { data, error } = await client
      .from("exercises")
      .update({ name: name })
      .eq("id", id)
      .select();

    if (error?.code === "23505")
      return new Response("既に存在するトレーニング種目です", {
        status: 409,
      });
    if (data?.length === 0) {
      return new Response("存在しないトレーニング種目です", { status: 404 });
    }
    if (error) {
      return new Response("サーバーエラーが発生しました", { status: 500 });
    }

    return new Response("トレーニング種目が更新されました", { status: 200 });
  } catch (err) {
    return new Response("サーバーエラーが発生しました", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  try {
    const id = body.id;
    const client = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_ANON_KEY as string
    );
    const { data, error } = await client
      .from("exercises")
      .delete()
      .eq("id", id)
      .select();

    if (data?.length === 0) {
      return new Response("存在しないトレーニング種目です", { status: 404 });
    }
    return new Response("トレーニング種目が削除されました", { status: 204 });
  } catch (err) {
    return new Response("サーバーエラーが発生しました", { status: 500 });
  }
}
