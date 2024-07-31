interface LightsaberProps {
  hasHover?: boolean
}

export const Lightsaber = ({ hasHover }: LightsaberProps) => {
  return (
    <>
    { hasHover
      ? 
      <div className="flex gap-1 opacity-20 group-hover:opacity-100">
        <span className="w-2 h-1 bg-white group-hover:shadow-[0_0_8px_2px_var(--color-base)] transition-all transition-custom-ease duration-default"></span>
        <span className="w-16 h-1 rounded-r-sm bg-white group-hover:shadow-[0_0_8px_2px_var(--color-base)] transition-all transition-custom-ease duration-default"></span>
      </div>
      :
      <div className="flex gap-1">
        <div className="w-2 h-1 bg-white"></div>
        <div className="w-16 h-1 bg-white rounded-r-lg"></div>
      </div>
    } 
    </>   
  )
}