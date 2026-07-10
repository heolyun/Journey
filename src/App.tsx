import { AboutMe } from './components/AboutMe';
import { AllProjects } from './components/AllProjects';
import { FeaturedProjects } from './components/FeaturedProjects';
import { FutureRoadmap } from './components/FutureRoadmap';
import { GrowthJourney } from './components/GrowthJourney';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TroubleShooting } from './components/TroubleShooting';

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-zinc-100">
      <Header />
      <main>
        <Hero />
        <FeaturedProjects />
        <AboutMe />
        <GrowthJourney />
        <AllProjects />
        <TroubleShooting />
        <FutureRoadmap />
      </main>
    </div>
  );
}
