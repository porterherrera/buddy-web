"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const activities = [
  "Gym",
  "Running",
  "Cycling",
  "Swimming",
  "Yoga",
  "Golf Range",
  "CrossFit",
  "Other",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1
  const [name, setName] = useState("");

  // Step 2
  const [inviteLink, setInviteLink] = useState("");

  // Step 3
  const [activity, setActivity] = useState("");
  const [sessions, setSessions] = useState(3);
  const [penalty, setPenalty] = useState(20);

  function generateInvite() {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteLink(`${window.location.origin}/invite/${code}`);
  }

  function copyLink() {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
    }
  }

  function finish() {
    router.push("/dashboard");
  }

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Step indicator */}
        <div className="mb-10 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`h-1.5 w-full rounded-full transition-colors ${
                  s <= step ? "bg-green" : "bg-card-border"
                }`}
              />
              <span className="text-xs text-gray-500">Step {s}</span>
            </div>
          ))}
        </div>

        {/* Step 1 — Profile */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Set up your profile</h1>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-300">
                Your name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John"
                className="h-12 rounded-xl border border-card-border bg-card px-4 text-foreground placeholder:text-gray-500 focus:border-green focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-300">
                Profile photo
              </span>
              <input
                type="file"
                accept="image/*"
                className="text-sm text-gray-400 file:mr-3 file:rounded-full file:border-0 file:bg-green/20 file:px-4 file:py-2 file:text-sm file:font-medium file:text-green"
              />
            </label>

            <button
              onClick={() => setStep(2)}
              disabled={!name.trim()}
              className="mt-4 h-14 rounded-full bg-green font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2 — Invite buddy */}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Invite your buddy</h1>
            <p className="text-gray-400">
              Generate a unique link and share it with your accountability
              partner.
            </p>

            {!inviteLink ? (
              <button
                onClick={generateInvite}
                className="h-14 rounded-full bg-green font-semibold text-black transition-opacity hover:opacity-90"
              >
                Generate Invite Link
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-card-border bg-card p-3">
                  <span className="flex-1 truncate text-sm text-gray-300">
                    {inviteLink}
                  </span>
                  <button
                    onClick={copyLink}
                    className="shrink-0 rounded-lg bg-green/20 px-3 py-1.5 text-sm font-medium text-green"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Share this link with your buddy to pair up.
                </p>
              </div>
            )}

            <button
              onClick={() => setStep(3)}
              className="mt-4 h-14 rounded-full bg-green font-semibold text-black transition-opacity hover:opacity-90"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3 — Commitment */}
        {step === 3 && (
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Set your first commitment</h1>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-300">
                Activity type
              </span>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="h-12 rounded-xl border border-card-border bg-card px-4 text-foreground focus:border-green focus:outline-none"
              >
                <option value="">Select activity…</option>
                {activities.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-300">
                Sessions per week
              </span>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={1}
                  max={7}
                  value={sessions}
                  onChange={(e) => setSessions(Number(e.target.value))}
                  className="flex-1 accent-green"
                />
                <span className="w-8 text-center text-xl font-bold">
                  {sessions}
                </span>
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-300">
                Penalty per missed session
              </span>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={penalty}
                  onChange={(e) => setPenalty(Number(e.target.value))}
                  className="flex-1 accent-green"
                />
                <span className="w-12 text-center text-xl font-bold">
                  ${penalty}
                </span>
              </div>
            </label>

            <button
              onClick={finish}
              disabled={!activity}
              className="mt-4 h-14 rounded-full bg-green font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Start Challenge
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
