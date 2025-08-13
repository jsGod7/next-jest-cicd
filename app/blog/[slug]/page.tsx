type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params) {
  return { title: `Post: ${params.slug}` };
}

export default function Page({ params }: Params) {
  const {slug} = params
  return <><h1>Slug: {slug}</h1><p>HoleTex</p></>
}
