import Banner from "@/components/home-page/banner/Banner";
import BestDeals from "@/components/home-page/best-deal/BestDeal";
import Category from "@/components/home-page/category/Category";
import Container from "@/components/shared/container/Container";
import Testimonials from "@/components/shared/testimonials/Testimonials";
import fetchData from "@/utils/fetch";

export default async function Home() {
  const data = await fetchData("/client/home-page", { cache: "no-store" });
  const homePageData = data?.data || {};
  return (
    <div className="">
      <Banner data={homePageData?.banners} />
      <Container className={"px-0 lg:px-0"}>
        <Category data={homePageData?.categories} />
        <BestDeals />
        {/* <FirstPromotion data={homePageData?.promotions} /> */}
        {homePageData?.testimonials?.length > 0 && (
          <Testimonials data={homePageData?.testimonials} />
        )}
      </Container>
    </div>
  );
}
