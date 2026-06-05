import CompanyDetails from "@/components/about-us/comapny-details/CompanyDetails";
import Services from "@/components/about-us/services/Services";
import Testimonials from "@/components/shared/testimonials/Testimonials";
import Container from "@/components/shared/container/Container";
import fetchData from "@/utils/fetch";

export default async function page() {
  const data = (await fetchData("/client/about-page",{ cache: "no-store" }));
  const aboutPageData = data?.data || {};
  return (
    <div>
      <Container className={"my-6 lg:mb-10"}>
        <CompanyDetails data={aboutPageData?.companyDetails} />
        {/* <Services /> */}
        {aboutPageData?.testimonials?.length > 0 && (
          <Testimonials data={aboutPageData?.testimonials} />
        )}
      </Container>
    </div>
  );
}
