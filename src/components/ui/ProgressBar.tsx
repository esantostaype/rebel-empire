type Props = {
  number: number
}

export const ProgressBar = ({ number = 0 }: Props) => {
  return (
    <div className="relative text-sm w-full">
      <div className="absolute z-10 bg-accent px-2 py-1 rounded-md translate-x-[-50%] -top-10 font-bold" style={{ left:`${ number }%` }}>
        { number }
        <span className="absolute bottom-[-6px] left-1/2 translate-x-[calc(-50%+1px)] w-0 h-0 border-solid border-t-0 border-b-[6px] border-l-[6px] border-r-[6px] border-b-accent border-l-transparent border-r-transparent border-t-transparent transform rotate-180"></span>
      </div>
      <div className="absolute -bottom-6 left-0 text-[rgba(255,255,255,0.5)]">0</div>
      <div className="relative bg-[rgba(255,255,255,0.2)] rounded-md h-3 overflow-hidden flex-1">
        <div
          className="absolute h-3 w-full rounded-md bg-accent top-0 left-0"
          style={{ animationDuration: '1s', animationFillMode: 'both', animationName: 'progress', transform: `translateX(-${ 100 - ( number )}% )` }}
        ></div>
      </div>
      <div className="absolute -bottom-6 right-0 text-[rgba(255,255,255,0.5)]">100</div>
    </div>
  )
}