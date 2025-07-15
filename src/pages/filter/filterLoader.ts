export async function filterLoader({ params }: { params: { type?: string } }): Promise<{ type: string }> {
  const type = params.type ?? "all";
  return { type };
}

export async function categoryGameLoader({ params }: { params: { slug?: string } }): Promise<{ slug: string }> {
  const slug = params.slug;
  if (!slug) throw new Error("No category slug provided");

  return { slug };
}
