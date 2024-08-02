export const SkeletonSimilarPlanet = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center mb-4 gap-4">
        <div className="size-32 rounded-full bg-slate-700 animate-pulse"></div>
        <div className="h-10 w-40 rounded-sm bg-slate-700 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-[90%] h-3 rounded-sm bg-slate-700 animate-pulse"></div>
        <div className="w-full h-3 rounded-sm bg-slate-700 animate-pulse"></div>
        <div className="w-[80%] h-3 rounded-sm bg-slate-700 animate-pulse"></div>
        <div className="w-[85%] h-3 rounded-sm bg-slate-700 animate-pulse"></div>
        <div className="w-[60%] h-3 rounded-sm bg-slate-700 animate-pulse"></div>
      </div>
    </div>
  )
}