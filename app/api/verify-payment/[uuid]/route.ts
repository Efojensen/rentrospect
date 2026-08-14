import { VerifyPayment } from "@/types/payment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    const { uuid } = await params;

    // TODO: Replace with your actual backend endpoint
    const backendUrl = `${process.env.NEXT_PUBLIC_MASTER}client/verifyPayment/${uuid}`;
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data: VerifyPayment = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
