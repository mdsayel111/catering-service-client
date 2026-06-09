import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/Titles/SectionTitle";
import fetchData from "@/utils/fetch";
import Image from "next/image";
// --- Main App Component for Detail Page ---
export default async function page({ params }) {
  const id = params.id;
  const { data } = await fetchData(`/blog/${id}`,  { cache: "no-store" });

  return (
    <Container>
      {/* Main Article Content */}
      <article className="lg:col-span-8">
        {/* Article Header */}
        <header className="mb-10">
          <SectionTitle title={data?.title} />
        </header>

        {/* Featured Image */}
        <Image
          src={data?.image}
          alt={`Featured image for ${data?.title}`}
          className="w-full rounded-lg lg:rounded-2xl object-cover aspect-[2/1]"
          width={600}
          height={600}
        />

        {/* Article Body */}
        <div className="prose prose-stone lg:prose-xl max-w-none">
          <p className="text-lg font-semibold mt-4 lg:mt-6 mb-2 lg:mb-4">
            {data?.shortDescription}
          </p>
          <p dangerouslySetInnerHTML={{ __html: data?.description }}></p>
        </div>
      </article>
    </Container>
  );
}
