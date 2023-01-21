import Link from "next/link";

export const Unauthorized = () => {
  return (
    <div className="h-screen py-20 bg-white rounded-md shadow-xl lg:px-40">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-red-700 lg:text-9xl">
          UNAUTHORIZED!
        </h1>
        <h6 className="mb-2 text-lg font-bold text-center text-gray-800 lg:text-2xl md:text-3xl">
          Oops! Sie haben keinen Zugang auf diese Seite
        </h6>

        <Link
          href="/"
          className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
        >
          Home
        </Link>
      </div>
    </div>
  );
};
