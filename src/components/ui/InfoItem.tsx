type InfoItemProps = {
  title: string
  info: string
}

export const InfoItem = ({ title, info }: InfoItemProps) => {
  return (
    <div className="px-4 py-2 md:p-0 rounded-md md:rounded-none bg-slate-700 md:bg-transparent">
      <span className="text-sm block">{ title }:</span>
      <div className="text-2xl font-bold leading-7 capitalize">{ info }</div>
    </div>
  )
}