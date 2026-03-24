import ProgressRing from "./ProgressRing";

export default function BuddyCard({
  name,
  activity,
  done,
  total,
}: {
  name: string;
  activity: string;
  done: number;
  total: number;
}) {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-5">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green/20 text-green font-bold">
          {name[0]}
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-400">{activity}</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <ProgressRing done={done} total={total} size={90} strokeWidth={6} />
      </div>
    </div>
  );
}
