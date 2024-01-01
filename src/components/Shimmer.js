export const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
        <div key={index} className="shimmer-card">
          <div className="shimmer-img"></div>
          <div className="shimmer-details"></div>
        </div>
      ))}
    </div>
  );
};
