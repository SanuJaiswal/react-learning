export const Shimmer = () => {
  return (
    <div className="flex justify-center flex-wrap gap-y-32 gap-x-12 p-16">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
        <div
          key={index}
          className="h-64 w-72 transition-transform duration-50 ease-in-out bg-f5f5f5 rounded-md overflow-hidden shadow-md"
        >
          <div className="h-52 w-full rounded-lg overflow-hidden shimmer-effect"></div>
          <div className="h-5 w-4/5 mt-4 ml-4 shimmer-effect"></div>
        </div>
      ))}
    </div>
  );
};
