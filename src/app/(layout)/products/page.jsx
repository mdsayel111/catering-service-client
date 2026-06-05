import Products from "@/components/products/Products";
import Container from "@/components/shared/container/Container";
import fetchData from "@/utils/fetch";

export default async function page() {
  const { data: res } =
    (await fetchData("/client/products-page", { cache: "no-store" })) || {};
  return (
    <Container>
      <Products
        products={res?.products || []}
        categories={res?.categories || []}
      />
    </Container>
  );
}
