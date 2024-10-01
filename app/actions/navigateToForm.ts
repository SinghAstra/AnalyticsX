"use server";

import { redirect } from "next/navigation";

export async function navigateToEditForm(id: string) {
  redirect(`/forms/edit/${id}`);
}
