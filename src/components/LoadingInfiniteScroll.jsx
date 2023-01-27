export default function LoadingInfiniteScroll() {
  return (
    <div className="flex justify-center items-center pt-4">
      <div className="grid gap-2">
        <div className="flex items-center justify-center space-x-2 animate-pulse">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
