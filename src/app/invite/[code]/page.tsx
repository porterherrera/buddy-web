import Link from "next/link";
import { Users, Dumbbell, DollarSign } from "lucide-react";

// Mock data — in production this would fetch from DB based on code
const mockInvite = {
  inviterName: "Jordan",
  activity: "Gym",
  sessionsPerWeek: 5,
  penalty: 20,
};

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const invite = mockInvite;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green/20">
          <Users size={32} className="text-green" />
        </div>

        <h1 className="text-2xl font-bold">
          {invite.inviterName} invited you!
        </h1>
        <p className="mt-2 text-gray-400">
          Join their fitness accountability challenge.
        </p>

        <div className="mt-8 rounded-2xl border border-card-border bg-card p-5 text-left">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Dumbbell size={20} className="text-green" />
              <div>
                <p className="text-sm text-gray-400">Activity</p>
                <p className="font-semibold">{invite.activity}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users size={20} className="text-green" />
              <div>
                <p className="text-sm text-gray-400">Commitment</p>
                <p className="font-semibold">
                  {invite.sessionsPerWeek}× per week
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign size={20} className="text-green" />
              <div>
                <p className="text-sm text-gray-400">Penalty per miss</p>
                <p className="font-semibold">${invite.penalty}</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-500">Invite code: {code}</p>

        <Link
          href="/signup"
          className="mt-8 flex h-14 items-center justify-center rounded-full bg-green text-lg font-bold text-black transition-opacity hover:opacity-90 active:scale-95"
        >
          Accept Challenge
        </Link>
      </div>
    </div>
  );
}
