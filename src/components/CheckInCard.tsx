export default function CheckInCard({
  date,
  time,
  location,
  verified,
}: {
  date: string;
  time: string;
  location: string;
  verified: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-card-border bg-card p-4">
      <div>
        <p className="font-medium">{date}</p>
        <p className="text-sm text-gray-400">
          {time} · {location}
        </p>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          verified
            ? "bg-green/20 text-green"
            : "bg-amber/20 text-amber"
        }`}
      >
        {verified ? "Verified" : "Pending"}
      </span>
    </div>
  );
}
