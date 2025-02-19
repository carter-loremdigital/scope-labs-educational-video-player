"use server";
import { revalidatePath } from "next/cache";

// Server action for revalidating the video dashboard from client components
export async function revalidateHome() {
  revalidatePath("/");
}
