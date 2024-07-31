type InfoItemProps = {
  title: string
  info: string
}

export const InfoItem = ({ title, info }: InfoItemProps) => {
  return (
    <div className="px-4 py-2 md:p-0 rounded-md md:rounded-none border-[1px] md:border-none border-[rgba(255,255,255,0.2)]">
      <span className="text-sm block">{ title }:</span>
      <div className="text-2xl font-bold leading-7 capitalize">{ info }</div>
    </div>
  )
}