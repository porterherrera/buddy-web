import Link from "next/link";
import {
  Users,
  Target,
  MapPin,
  DollarSign,
  Dumbbell,
  Bike,
  Footprints,
  CircleDot,
} from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Pair with a friend",
    desc: "Invite a buddy to keep each other accountable",
  },
  {
    icon: Target,
    title: "Set your commitment + penalty",
    desc: "Choose your weekly sessions and what you'll pay if you miss",
  },
  {
    icon: MapPin,
    title: "Check in at the gym",
    desc: "GPS location + photo proof every workout",
  },
  {
    icon: DollarSign,
    title: "Miss a session? Your friend gets paid",
    desc: "Automatic payments keep you honest",
  },
];

const scenarios = [
  { icon: Dumbbell, text: "Gym 5× / week — $20 per miss" },
  { icon: CircleDot, text: "Golf range 3× / week — $15 per miss" },
  { icon: Footprints, text: "Morning runs 4× / week — $10 per miss" },
  { icon: Bike, text: "Cycling 3× / week — $25 per miss" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center px-6 pt-20 pb-16 text-center">
        <h1 className="max-w-lg text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Miss Your Workout.{" "}
          <span className="text-green">Pay Your Friend.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-gray-400 leading-relaxed">
          Set your weekly fitness goals. Agree on a penalty. Check in with GPS +
          photo. Miss a session&nbsp;— money moves automatically.
        </p>
        <Link
          href="/signup"
          className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-green px-8 text-lg font-semibold text-black transition-opacity hover:opacity-90 active:scale-95"
        >
          Start a Buddy Challenge
        </Link>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-2xl px-6 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold">How it works</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {steps.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-card-border bg-card p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green/15 text-green">
                <s.icon size={24} />
              </div>
              <p className="text-sm text-gray-500">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why it works */}
      <section className="mx-auto w-full max-w-2xl px-6 py-16">
        <h2 className="mb-4 text-center text-2xl font-bold">Why it works</h2>
        <p className="mx-auto max-w-md text-center text-lg text-gray-400">
          The <span className="font-bold text-green">$20</span> you owe your
          friend hits different than the{" "}
          <span className="font-bold text-gray-300">$30</span> gym membership
          you ignore.
        </p>
      </section>

      {/* Example scenarios */}
      <section className="mx-auto w-full max-w-2xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Works for any routine
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {scenarios.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-card-border bg-card p-4"
            >
              <s.icon size={24} className="shrink-0 text-green" />
              <span className="text-sm font-medium">{s.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="flex flex-col items-center px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">Ready to stay accountable?</h2>
        <p className="mt-4 text-gray-400">
          Free to use. We only take 3% of penalty payments.
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-green px-8 text-lg font-semibold text-black transition-opacity hover:opacity-90 active:scale-95"
        >
          Start a Buddy Challenge
        </Link>
      </section>
    </div>
  );
}
