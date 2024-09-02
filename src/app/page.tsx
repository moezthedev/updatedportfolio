import Header from "@/components/Header/Header";
import GoToTopButton from "@/components/GotoTopButton/GotoTopButton";
import Skills from "@/components/Skills/Skills";
import Services from "@/components/Services/Services";
import ProjectDetail from "@/components/Projects/Projects";
import ContactForm from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Roadmap from "@/components/Roadmap/Roadmap";
function Page() {
  return (
    <>
      <Header />
      <GoToTopButton />
      <Skills />

      <Roadmap />
      <ProjectDetail />
      <ContactForm />
      <Footer />
    </>
  );
}

export default Page;
