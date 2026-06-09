import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/Titles/SectionTitle";
import fetchData from "@/utils/fetch";

export default async function page() {
  const res = await fetchData("/return-and-refund", {
    next: { revalidate: 30 },
  });
  const data = res?.data;

  return (
    <Container className={"px-4 pb-6 md:pb-8 lg:pb-16"}>
      <SectionTitle title={data?.length > 0 ? data[0]?.title : ""} />
      <div
        dangerouslySetInnerHTML={{
          __html: data?.length > 0 ? data[0]?.description : "",
        }}
        className="[&>ol]:list-disc [&>ol]:ml-8"
      ></div>
    </Container>
  );
}
