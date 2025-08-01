import Link from "next/link";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 mb-[30px]">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-[150px] object-cover"
      />
      <div className="p-3">
        <span className="text-xs text-blue-500 font-semibold uppercase tracking-wide">
          {blog.category}
        </span>
        <h2 className="text-base !text-[18px] font-semibold mt-2 mb-1 text-gray-800 line-clamp-2">
          {blog.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">{blog.content}</p>
        <Link
          href={`/blogs/${blog.url}`}
          target="_blank"
          className="inline-block mt-3 text-blue-600 text-sm font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
