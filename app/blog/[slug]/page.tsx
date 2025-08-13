// Đổi tên 'Params' thành 'Props' cho rõ ràng hơn (best practice)
type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  return { title: `Post: ${params.slug}` };
}

// Áp dụng type 'Props' cho toàn bộ object props, và destructure 'params' từ đó
export default function Page({ params }: Props) {
  const { slug } = params;
  return (
    <>
      <h1>Slug: {slug}</h1>
      <p>HoleTex</p>
    </>
  );
}