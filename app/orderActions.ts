"use server";

export async function placeOrder(assetId: string, quantity: number) {
  // Runs on the server — safe to hit your DB / payments logic directly here.
  console.log(`Placing order for asset ${assetId}, quantity: ${quantity}`);

  // e.g. const transaction = await db.rentalTransactions.insert({ assetId, quantity, ... });

  return { success: true, assetId, quantity };
}
