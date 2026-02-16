import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { LeetCode } from "@/components/LeetCode";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

async function getRepos() {
  const GITHUB_API =
    "https://api.github.com/users/Anandgadge2/repos?sort=updated&per_page=30";
  try {
    const res = await fetch(GITHUB_API, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch repos:", error);
    return [];
  }
}

export default async function Home() {
  const initialRepos = await getRepos();

  return (
    <>
      <Hero />
      <About />
      <Projects initialData={initialRepos} />
      <LeetCode />
      <Experience />
      <Contact />
    </>
  );
}
