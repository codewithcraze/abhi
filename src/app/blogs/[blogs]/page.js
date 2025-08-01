import React from "react";
import DetailBlog from "../../../Components/BlogDetailModule/DetailBlog/DetailBlog";

const BlogDetailPage = async ({ params }) => {
  const { blogs } = await params;
  console.log(blogs);
  return (
    <>
      <DetailBlog route={blogs} />
    </>
  );
};

export default BlogDetailPage;
