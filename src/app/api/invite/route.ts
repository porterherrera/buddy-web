import { NextResponse } from "next/server";

export async function POST() {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Mock — in production this would save to Supabase
  return NextResponse.json({
    success: true,
    invite: {
      code,
      url: `/invite/${code}`,
    },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  // Mock invite details
  return NextResponse.json({
    code,
    inviterName: "Jordan",
    activity: "Gym",
    sessionsPerWeek: 5,
    penalty: 20,
  });
}
