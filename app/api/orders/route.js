import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { items, shippingInfo, paymentInfo, totalAmount } = await req.json();

  try {
    const order = await prisma.order.create({
      data: {
        userId: parseInt(session.user.id, 10), // Convert user ID to integer
        items: JSON.stringify(items), // Convert items to JSON string
        shippingInfo: JSON.stringify(shippingInfo), // Convert shipping info to JSON string
        paymentInfo: JSON.stringify(paymentInfo), // Convert payment info to JSON string
        totalAmount,
        status: "Pending",
      },
    });

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response("Failed to create order", { status: 500 });
  }
}
