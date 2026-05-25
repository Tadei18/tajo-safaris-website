// Centralised site-wide constants. v1 placeholders — replace with real values
// before launch.

export const siteName = "Tajo Safaris and Tours";
export const siteTagline = "See, Encounter, Feel the Wild.";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tajosafarisandtours.com";

// Contact details (placeholders — see env vars for production-routed values).
export const contact = {
  phoneDisplay: "+254 708 754 111",
  phoneTel: "+254708754111",
  phoneDisplay2: "+254 731 737 921",
  phoneTel2: "+254731737921",
  whatsappNumber: "254708754111",
  email: "info@tajosafarisandtours.com",
  address: "Hilton Hotel Building, Mama Ngina Street, Nairobi, 1st Floor, Room 1",
  hours: "Mon–Sat, 8am–6pm EAT",
  timezone: "Nairobi (GMT+3)",
};

export const social = {
  instagram: "https://instagram.com/tajosafaris",
  facebook: "https://facebook.com/tajosafaris",
  youtube: "https://youtube.com/@tajosafaris",
  tiktok: "https://tiktok.com/@tajosafaris",
};

export const whatsappPresetText = encodeURIComponent(
  "Hi Tajo, I'd like to plan a safari."
);

export const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${whatsappPresetText}`;

export const navLinks = [
  { href: "/safaris", label: "Safaris" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const trustBadges = [
  "Member of KATO",
  "Tourism Regulatory Authority Licensed",
  "TripAdvisor Travelers' Choice",
] as const;

export const heroTrust = [
  "4.9 ★ Google",
  "KATO Member",
  "Featured by Travel + Leisure",
] as const;
