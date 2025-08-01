import { connectDB } from "../../../../lib/config";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ message: "Hello World with DB ✅" });
  } catch (error) {
    return Response.json(
      { message: "DB connection failed ❌", error: error.message },
      { status: 500 }
    );
  }
}
