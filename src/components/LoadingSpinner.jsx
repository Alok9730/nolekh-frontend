function LoadingSpinner() {
  return (
    <div className=" fixed inset-0 flex items-center justify-center w-full h-full">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-[#83fff7] animate-ping" />

        <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-[#11aca2] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg animate-pulse" />

        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 animate-bounce" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
