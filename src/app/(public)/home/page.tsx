"use client";

import { Button } from "@/src/components/ui/button";
import { envVars } from "@/src/config/env";
import { motion } from "framer-motion";
import {
  Compass,
  Users,
  MapPin,
  Shield,
  Star,
  ArrowRight,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: Users,
    title: "Find Travel Buddies",
    description:
      "Connect with like-minded travelers heading to your dream destinations.",
  },
  {
    icon: MapPin,
    title: "Share Your Plans",
    description:
      "Create detailed itineraries and let others join your next adventure.",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description:
      "Trust ratings and reviews keep the community safe and reliable.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Thousands of travelers worldwide ready to explore together.",
  },
];

const stats = [
  { value: "50K+", label: "Travelers" },
  { value: "120+", label: "Countries" },
  { value: "25K+", label: "Trips Shared" },
  { value: "4.8", label: "Avg Rating", icon: Star },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "London, UK",
    text: "Found an amazing hiking buddy for my Nepal trek. We've been traveling together ever since!",
    avatar: `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1775151291/bnzrrzfwqmtyob9rajaa.jpg`,
  },
  {
    name: "Carlos R.",
    location: "Barcelona, Spain",
    text: "This platform changed how I travel. Meeting locals and fellow travelers has been incredible.",
    avatar: `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1775151291/denc8sh8fb3wulmakogd.jpg`,
  },
  {
    name: "Aiko T.",
    location: "Tokyo, Japan",
    text: "As a solo female traveler, having verified travel buddies gives me peace of mind.",
    avatar: `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1775151291/tlt9r9whuszvxhbstewj.jpg`,
  },
];

export default function HomePage() {
  const router = useRouter();
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            width={1600}
            height={900}
            loading="eager"
            src={`https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1775151293/urrnvewe9tpdy6xugyka.jpg`}
            alt="Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Compass className="w-4 h-4 text-secondary" />
              <span className="text-white/90 text-sm font-medium">
                Your next adventure starts here
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-headline font-extrabold text-white tracking-tight">
              Travel Together,
              <span className="text-secondary">Explore Forever</span>
            </h1>

            <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-xl font-medium">
              Discover compatible travel companions, share your plans, and
              transform solo journeys into unforgettable shared experiences.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="xl"
                onClick={() => router.push("/find-buddy")}
                className="rounded-xl px-8 h-12 text-base"
              >
                Find a Travel Buddy <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => router.push("/explore")}
                className="rounded-xl px-8 h-12 text-base bg-white/10 border-white/25 text-white hover:bg-white/20 hover:text-white"
              >
                Explore Travelers
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border p-6 text-center shadow-lg shadow-black/5"
              >
                <div className="text-2xl font-bold text-foreground flex items-center justify-center gap-1">
                  {stat.value}
                  {stat.icon && (
                    <Star className="w-5 h-5 fill-secondary text-secondary" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold">
              Why Travelers <span className="text-primary">Love Us</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Everything you need to find the perfect travel companion and plan
              your next adventure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold">
              What Travelers <span className="text-primary">Say</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    width={100}
                    height={100}
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <Image
              width={1200}
              height={800}
              src={`https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1775151567/q0exf8nwgydzuuutroox.jpg`}
              alt="Adventure"
              className="w-full h-72 sm:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-primary/90 to-primary/70 flex items-center">
              <div className="px-8 sm:px-12 max-w-lg">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Ready for Your Next Adventure?
                </h2>
                <p className="mt-3 text-white/80 text-sm">
                  Join thousands of travelers who found their perfect travel
                  companions.
                </p>
                <div className="mt-6 flex gap-3">
                  <Button
                    size="lg"
                    className="rounded-xl bg-white text-primary hover:bg-white/90"
                  >
                    <Link href="/find-buddy">Get Started Free</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-xl border-white/30 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/subscription">View Plans</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
