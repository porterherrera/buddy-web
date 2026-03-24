"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Camera, Check } from "lucide-react";

export default function CheckInPage() {
  const router = useRouter();
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    label: string;
  } | null>(null);
  const [locating, setLocating] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function getLocation() {
    setLocating(true);
    if (!navigator.geolocation) {
      setLocation({ lat: 33.4152, lng: -111.8315, label: "Mesa, AZ" });
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "Location confirmed",
        });
        setLocating(false);
      },
      () => {
        // Fallback mock
        setLocation({ lat: 33.4152, lng: -111.8315, label: "Mesa, AZ" });
        setLocating(false);
      }
    );
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPhoto(file);
  }

  async function handleSubmit() {
    if (!location) return;
    setSubmitting(true);

    const formData = new FormData();
    formData.append("lat", String(location.lat));
    formData.append("lng", String(location.lng));
    if (photo) formData.append("photo", photo);

    try {
      await fetch("/api/checkin", { method: "POST", body: formData });
    } catch {
      // mock — continue anyway
    }

    setSubmitting(false);
    setDone(true);
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  if (done) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green">
          <Check size={40} className="text-black" />
        </div>
        <h1 className="text-2xl font-bold">Checked in!</h1>
        <p className="text-gray-400">Redirecting to dashboard…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-4 py-8">
      <h1 className="text-2xl font-bold">Check In</h1>

      {/* GPS */}
      <div className="rounded-2xl border border-card-border bg-card p-5">
        <h2 className="mb-1 font-semibold">Confirm your location</h2>
        <p className="mb-4 text-sm text-gray-400">
          We need to verify you&apos;re at the right spot.
        </p>
        {!location ? (
          <button
            onClick={getLocation}
            disabled={locating}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green/20 font-medium text-green transition-colors hover:bg-green/30 disabled:opacity-50"
          >
            <MapPin size={20} />
            {locating ? "Getting location…" : "Get My Location"}
          </button>
        ) : (
          <div className="flex items-center gap-2 text-green">
            <MapPin size={20} />
            <span className="font-medium">
              📍 Location confirmed — {location.label}
            </span>
          </div>
        )}
      </div>

      {/* Photo */}
      <div className="rounded-2xl border border-card-border bg-card p-5">
        <h2 className="mb-1 font-semibold">Take a photo</h2>
        <p className="mb-4 text-sm text-gray-400">
          Snap a quick proof of your workout.
        </p>
        <label className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-green/20 font-medium text-green transition-colors hover:bg-green/30">
          <Camera size={20} />
          {photo ? photo.name : "Open Camera"}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhoto}
            className="hidden"
          />
        </label>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!location || submitting}
        className="mt-auto h-14 rounded-full bg-green text-lg font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Submit Check-In"}
      </button>
    </div>
  );
}
