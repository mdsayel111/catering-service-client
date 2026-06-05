import AccountSideBar from "@/components/shared/AccountSideBar/AccountSideBar";
import Container from "@/components/shared/container/Container";

export default function layout({ children }) {
  return (
    <Container className="flex mx-auto max-sm:flex-col max-md:flex-col gap-5 mb-4 lg:my-10 max-w-7xl max-sm:w-full">
      <AccountSideBar />
      <div className="w-full">{children}</div>
    </Container>
  );
}
