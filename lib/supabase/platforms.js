import { createClient } from "./server";

const HOME_PLATFORM_COLUMNS = [
  "id",
  "name",
  "slug",
  "description",
  "category",
  "categoryColor",
  "countries",
  "hourlyRate",
  "rating",
  "payment",
].join(",");

export async function getPlatforms() {
  const supabase = await createClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("platforms")
    .select(HOME_PLATFORM_COLUMNS)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Unable to load platforms: ${error.message}`, {
      cause: error,
    });
  }

  return data ?? [];
}
