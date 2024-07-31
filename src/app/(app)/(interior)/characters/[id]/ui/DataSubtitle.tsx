type DataSubtitleProps = {
  text: string
}

export const DataSubtitle = ({ text }: DataSubtitleProps ) => {
  return (
    <h3 className="text-2xl normal-case font-inter font-medium tracking-normal mb-4 text-slate-400">{ text }:</h3>
  )
}