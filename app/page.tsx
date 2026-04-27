import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { DiyProjectsSection } from "@/components/DiyProjectsSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { SkillsSection } from "@/components/SkillsSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"

export default function Home(): React.ReactElement {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DiyProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
