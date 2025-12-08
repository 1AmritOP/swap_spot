// File: app/api/upload-auth/route.ts
import { authOptions } from "@/lib/auth";
import { getUploadAuthParams } from "@imagekit/next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
      // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
      // token: "random-token", // Optional, a unique token for request
    });

    return Response.json({
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: "Authentication for imagekit failed",
      },
      { status: 500 }
    );
  }
}
