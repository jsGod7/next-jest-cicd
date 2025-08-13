// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/** ===== Types ===== */
type PageParams = { slug: string };
type SearchParams = Record<string, string | string[] | undefined>;

type Post = {
  slug: string;
  title: string;
  html: string;
  excerpt?: string;
  publishedAt: string; // ISO
};

/** ===== Data layer demo (thay bằng fetch CMS/API của bạn) ===== */
async function getPostBySlug(slug: string): Promise<Post | null> {
  // Demo dataset để test/build qua CI
  const posts: Post[] = [
    {
      slug: "hello-world",
      title: "Hello World",
      excerpt: "Bài viết chào sân",
      html: "<p>Xin chào 👋 — đây là bài viết đầu tiên.</p>",
      publishedAt: "2024-01-01",
    },
  ];
  return posts.find((p) => p.slug === slug) ?? null;
}

/** ===== Metadata (tùy chọn) ===== */
export async function generateMetadata(
  { params }: { params: Promise<PageParams> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

/** ===== Page (NEXT 15: params/searchParams là Promise) ===== */
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;             // <- BẮT BUỘC await
  const sp = await searchParams;             // <- nếu cần query params
  const _draft = sp?.draft === "1";          // ví dụ dùng ?draft=1

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="prose mx-auto px-4 py-10">
      <h1>{post!.title}</h1>
      <p className="opacity-70">
        {new Date(post!.publishedAt).toLocaleDateString()}
      </p>
      <article dangerouslySetInnerHTML={{ __html: post!.html }} />
    </main>
  );
}

/** (tùy chọn) ISR */
export const revalidate = 60;
