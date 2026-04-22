import { redirect } from "next/navigation";

export default async function TrackRedirectPage({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;

  if (params.token?.trim()) {
    redirect(`/track/${params.token.trim()}`);
  }

  redirect("/");
}
