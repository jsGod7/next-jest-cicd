import type { Metadata, ResolvingMetadata } from 'next';

// 1. Định nghĩa type cho 'params' một cách riêng biệt và rõ ràng.
type PageParams = {
  slug: string;
};

// 2. Định nghĩa type cho props của trang.
type Props = {
  params: PageParams;
};

// 3. Áp dụng type 'Props' cho hàm generateMetadata.
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  return {
    title: `Post: ${slug}`,
  };
}

// 4. Áp dụng type 'Props' cho component Page.
export default function Page({ params }: Props) {
  return (
    <>
      <h1>Slug: {params.slug}</h1>
      <p>HoleTex</p>
    </>
  );
}