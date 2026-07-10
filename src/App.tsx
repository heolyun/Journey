import { AboutMe } from './components/AboutMe';
import { FeaturedProjects } from './components/FeaturedProjects';
import { FutureRoadmap } from './components/FutureRoadmap';
import { GrowthJourney } from './components/GrowthJourney';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-zinc-100">
      <Header />
      <main>
        <Hero />
        <FeaturedProjects />
        <AboutMe />
        <GrowthJourney />
        <FutureRoadmap />
      </main>
    </div>
  );
}
