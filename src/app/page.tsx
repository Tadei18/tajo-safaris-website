import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { IntroBand } from "@/components/home/IntroBand";
import { SignatureSafaris } from "@/components/home/SignatureSafaris";
import { QuickMatch } from "@/components/home/QuickMatch";
import { DestinationsStrip } from "@/components/home/DestinationsStrip";
import { WhyTajo } from "@/components/home/WhyTajo";
import { VisualEssay } from "@/components/home/VisualEssay";
import { Testimonials } from "@/components/home/Testimonials";
import { Conservation } from "@/components/home/Conservation";
import { FinalCTA } from "@/components/home/FinalCTA";
import { homeMetadata } from "@/data/seo";

export const metadata: Metadata = homeMetadata;

export default function Home() {
  return (
    <>
      <Hero />
      <IntroBand />
      <SignatureSafaris />
      <QuickMatch />
      <DestinationsStrip />
      <WhyTajo />
      <VisualEssay />
      <Testimonials />
      <Conservation />
      <FinalCTA />
    </>
  );
}
