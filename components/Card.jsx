// components/Card.jsx
import Image from "next/image";
import Link from "next/link";

const Card = ({ title, description, imageUrl, slug, author, date }) => {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <div
        className="relative overflow-hidden rounded-lg shadow-xl transform transition-all duration-300 hover:scale-[1.02] cursor-pointer
                   backdrop-filter backdrop-blur-md bg-indigo-300 dark:bg-black dark:bg-opacity-20 border border-indigo-400 dark:border-indigo-900 border-opacity-20 dark:border-gray-00 dark:border-opacity-30
                   flex flex-col h-full">
        {/* Card Image */}
        <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl || "/images/placeholder.jpg"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
        </div>

        {/* Card Content */}
        <div className="p-5 flex-grow flex flex-col justify-between text-black dark:text-gray-100">
          {" "}
          {/* Default text to white, dark mode to light gray */}
          <div>
            <h3 className="text-2xl font-bold mb-2 leading-tight group-hover:text-blue-300 dark:group-hover:text-blue-400 transition-colors duration-300">
              {" "}
              {/* Adjusted dark hover */}
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              {" "}
              {/* Adjusted dark text */}
              {description}
            </p>
          </div>
          {/* Metadata */}
          <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-500 mt-4">
            {" "}
            {/* Adjusted dark text */}
            <span>
              By{" "}
              <span className="font-medium text-gray-900 dark:text-gray-600">
                {author}
              </span>
            </span>{" "}
            {/* Adjusted dark text */}
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
