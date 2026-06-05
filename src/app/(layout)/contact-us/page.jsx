import ContactInfo from "@/components/contact-us/contact-info/ContactInfo";
import ContactMap from "@/components/contact-us/contact-map/ContactMap";
import Container from "@/components/shared/container/Container";
import fetchData from "@/utils/fetch";

// Main App component
export default async function ContactForm() {
  // const { data } = (await fetchData("/client/contact-page")) || {};
  return (
    <Container className="flex items-center justify-center my-6 lg:my-10">
      <div className="w-full ">
        <div className="grid grid-cols-1 gap-6 lg:gap-0 lg:grid-cols-[47%_47%] justify-between">
          <ContactInfo />
          <ContactMap />
        </div>
      </div>
    </Container>
  );
}
