import Header from "@/components/Header/Header";
import GoToTopButton from "@/components/GotoTopButton/GotoTopButton";
import Skills from "@/components/Skills/Skills";
import Services from "@/components/Services/Services";
import ProjectDetail from "@/components/Projects/Projects";
import ContactForm from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Roadmap from "@/components/Roadmap/Roadmap";
import AchievementCollage from "@/components/Achievements/achievements";
import MentorTribute from "@/components/Mentors/Mentors";
function Page() {
  const mentors = [
    {
      name: "Sir Husnain",
      role: "Career Coach",
      company: "Amal Academy",
    },
    {
      name: "Madam Aleeza",
      role: "Program Coordinator",
      company: "Amal Academy",
    },
    {
      name: "Sir Usman Akram",
      role: "Fyp Supervisor",
      company: "NUST",
    },
    {
      name: "Sir Asad Mansoor Khan",
      role: "Fyp Co-Supervisor",
      company: "NUST",
    },
    {
      name: "Sir Faizan",
      role: "Lead Web Developer",
      company: "RiseTech",
    },
    {
      name: "Robin Nagpal",
      role: "Lead Software Engineer",
      company: "DoDAO",
    },
    {
      name: "Muhammad Shahzad",
      role: "CTO",
      company: "Enquaire",
    },
    {
      name: "Muhammad Jamal",
      role: "CEO",
      company: "Enquaire",
    },
    {
      name: "Muhammad Sami",
      role: "Associate Software Engineer",
      company: "DoDAO",
    },
    {
      name: "Sharjeel Ahmed",
      role: "Manager AI",
      company: "CareCloud",
    },
    {
      name: "Nuzair Zia",
      role: "Lead Software Engineer",
      company: "Telenor",
    },
  ];
  return (
    <>
      <Header />
      <GoToTopButton />
      <Skills />
      <AchievementCollage />
      <Roadmap />
      <ProjectDetail />
      <MentorTribute mentors={mentors} />
      <ContactForm />
      <Footer />
    </>
  );
}

export default Page;
