"use client";

import Link from "next/link";
import ProgressRing from "@/components/ProgressRing";
import BuddyCard from "@/components/BuddyCard";
import CheckInCard from "@/components/CheckInCard";

// Mock data
const week = "Mar 17 – Mar 23";
const commitment = { activity: "Gym", total: 5, done: 3 };
const buddy = { name: "Alex", activity: "Gym", total: 4, done: 2 };
const penalty = 20;
const remaining = commitment.total - commitment.done;
const buddyRemaining = buddy.total - buddy.done;

const checkins = [
  { date: "Mon, Mar 17", time: "6:32 AM", location: "EōS Fitness", verified: true },
  { date: "Tue, Mar 18", time: "7:15 AM", location: "EōS Fitness", verified: true },
  { date: "Thu, Mar 20", time: "6:48 AM", location: "EōS Fitness", verified: false },
];

const pastWeeks = [
  { week: "Mar 10 – Mar 16", done: 5, total: 5, paidOut: 0, received: 20 },
  { week: "Mar 3 – Mar 9", done: 4, total: 5, paidOut: 20, received: 0 },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Week of</p>
          <h1 className="text-xl font-bold">{week}</h1>
        </div>
        <ProgressRing done={commitment.done} total={commitment.total} size={64} strokeWidth={5} />
      </div>

      {/* My Commitment */}
      <div className="rounded-2xl border border-card-border bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
          My Commitment
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{commitment.activity}</p>
            <p className="text-sm text-gray-400">
              {commitment.total} sessions / week
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green">{commitment.done}</p>
            <p className="text-sm text-gray-400">done</p>
          </div>
        </div>
        <div className="mt-4 flex gap-4 text-center">
          <div className="flex-1 rounded-xl bg-green/10 p-3">
            <p className="text-xl font-bold text-green">{commitment.done}</p>
            <p className="text-xs text-gray-400">Completed</p>
          </div>
          <div className="flex-1 rounded-xl bg-amber/10 p-3">
            <p className="text-xl font-bold text-amber">{remaining}</p>
            <p className="text-xs text-gray-400">Remaining</p>
          </div>
        </div>
      </div>

      {/* Check In button */}
      <Link
        href="/checkin"
        className="flex h-14 items-center justify-center rounded-full bg-green text-lg font-bold text-black transition-opacity hover:opacity-90 active:scale-95"
      >
        Check In
      </Link>

      {/* Buddy Status */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
          Buddy Status
        </h2>
        <BuddyCard
          name={buddy.name}
          activity={buddy.activity}
          done={buddy.done}
          total={buddy.total}
        />
      </div>

      {/* Stakes */}
      <div className="rounded-2xl border border-card-border bg-card p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
          Stakes
        </h2>
        <div className="flex flex-col gap-2">
          {remaining > 0 && (
            <p className="text-sm">
              You owe{" "}
              <span className="font-bold text-red">
                ${remaining * penalty}
              </span>{" "}
              if you miss {remaining} more
            </p>
          )}
          {remaining === 0 && (
            <p className="text-sm text-green font-semibold">
              You hit your goal this week!
            </p>
          )}
          {buddyRemaining > 0 && (
            <p className="text-sm">
              {buddy.name} owes you{" "}
              <span className="font-bold text-green">
                ${buddyRemaining * penalty}
              </span>{" "}
              if they miss {buddyRemaining} more
            </p>
          )}
        </div>
      </div>

      {/* Recent Check-ins */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
          This Week&apos;s Check-ins
        </h2>
        <div className="flex flex-col gap-2">
          {checkins.map((c, i) => (
            <CheckInCard key={i} {...c} />
          ))}
        </div>
      </div>

      {/* Past Weeks */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
          Past Weeks
        </h2>
        <div className="flex flex-col gap-2">
          {pastWeeks.map((w, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-card-border bg-card p-4"
            >
              <div>
                <p className="text-sm font-medium">{w.week}</p>
                <p className="text-xs text-gray-400">
                  {w.done}/{w.total} sessions
                </p>
              </div>
              <div className="text-right">
                {w.paidOut > 0 && (
                  <p className="text-sm font-semibold text-red">
                    -${w.paidOut}
                  </p>
                )}
                {w.received > 0 && (
                  <p className="text-sm font-semibold text-green">
                    +${w.received}
                  </p>
                )}
                {w.paidOut === 0 && w.received === 0 && (
                  <p className="text-sm text-gray-400">Even</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
