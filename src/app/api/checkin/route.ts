import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const lat = formData.get("lat");
  const lng = formData.get("lng");
  const photo = formData.get("photo");

  // Mock response — in production this would save to Supabase
  return NextResponse.json({
    success: true,
    checkin: {
      id: crypto.randomUUID(),
      lat: Number(lat),
      lng: Number(lng),
      hasPhoto: photo !== null,
      timestamp: new Date().toISOString(),
      status: "pending",
    },
  });
}
