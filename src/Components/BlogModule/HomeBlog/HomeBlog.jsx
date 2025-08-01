// "use client";
// import BlogCard from "@/CommonComponents/BlogCard/BlogCard";
// import { blogData } from "@/static/static";
// import React, { useState } from "react";
// import { Button, Col, Container, Row } from "react-bootstrap";

// const HomeBlog = () => {
//   const blogBtn = ["All", "Travel", "Web Development", "Health"];
//   const [data, setData] = useState("All");
//   return (
//     <>
//       <section className="">
//         <Container>
//           <div className="flex justify-center gap-[15px]">
//             {blogBtn?.map((item, index) => {
//               return (
//                 <Button
//                   variant={`${data == item ? "primary" : "secondary"}`}
//                   key={index}
//                   onClick={() => setData(item)}
//                 >
//                   {item}
//                 </Button>
//               );
//             })}
//           </div>
//           <Row className="!mt-[30px]">
//             {blogData
//               ?.filter((item) =>
//                 data === "All" ? item : item?.category == data
//               )
//               ?.map((blog, index) => {
//                 return (
//                   <Col lg={3} key={index}>
//                     <BlogCard key={blog.id} blog={blog} />
//                   </Col>
//                 );
//               })}
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default HomeBlog;
"use client";
import { useState } from "react";

export default function CreateBlog() {
  const [form, setForm] = useState({
    url: "",
    category: "",
    title: "",
    content: "",
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("⚠️ Please upload an image.");
      return;
    }

    const formData = new FormData();

    formData.append("url", form.url);
    formData.append("category", form.category);
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("image", image); // 👈 Uploading file

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Blog created!");
        console.log("Cloudinary URL:", data.blog.image);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit blog.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      <input
        name="url"
        placeholder="URL Slug"
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        required
      />
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        rows={5}
        onChange={handleChange}
        required
      />
      <input type="file" onChange={handleFileChange} accept="image/*" />

      <button type="submit">Create Blog</button>
      {message && <p>{message}</p>}
    </form>
  );
}
