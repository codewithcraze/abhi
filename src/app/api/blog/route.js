import { connectDB } from "../../../../lib/config";
import Blog from "../../../../model/Blog";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// export async function POST(req) {
//   try {
//     await connectDB();
//     const body = await req.json();

//     const newBlog = await Blog.create({
//       id: body.id,
//       url: body.url,
//       category: body.category,
//       title: body.title,
//       content: body.content,
//       image: body.image,
//     });

//     return Response.json({ message: "Blog created ✅", blog: newBlog });
//   } catch (error) {
//     return Response.json(
//       { message: "Blog creation failed ❌", error: error.message },
//       { status: 500 }
//     );
//   }
// }
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const imageFile = formData.get("image"); // 👈 file input
    const url = formData.get("url");
    const category = formData.get("category");
    const title = formData.get("title");
    const content = formData.get("content");

    // Convert image file to buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "blogs" }, function (err, result) {
          if (err) reject(err);
          else resolve(result);
        })
        .end(buffer);
    });

    // Save blog with Cloudinary image URL
    const newBlog = await Blog.create({
      url,
      category,
      title,
      content,
      image: result.secure_url, // 👈 Cloudinary image URL
    });

    return NextResponse.json({ message: "Blog created ✅", blog: newBlog });
  } catch (error) {
    return NextResponse.json(
      { message: "Blog creation failed ❌", error: error.message },
      { status: 500 }
    );
  }
}
