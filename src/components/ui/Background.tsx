import Image from "next/image"

export const Background = () => {
  return (
    <div className="animate-fade animate-duration-2000 animate-delay-[400ms] animate-ease-in-out animate-fill-both">
      <Image src='/images/bg-header.webp' className="bg__header" width={ 1920 } height={ 444 } alt="Rebel Empire Background Header" />
      <Image src='/images/bg-footer.webp' className="bg__footer" width={ 1920 } height={ 602 } alt="Rebel Empire Background Footer" />
      <Image src='/images/bg-space.webp' className="bg" width={ 1920 } height={ 1080 } alt="Rebel Empire Background" />
      <div className="bg__video">
        <svg viewBox="0 0 2320 1158" preserveAspectRatio="none">
          <path d="M2320,137.1V1158H0V342.5c55-30.5,167-50.1,257.6-66l0,0l0.2,0c4.7-0.8,9.4-1.6,14-2.5c136.1-24,287.4,6,358,24 c70.6,18,398.3,150,428.6,184l0,0c16.6,18.6,51.3,57.7,84.3,98.1c-17.3-62.7-35.1-128,12.6-173.1c23.6-22.2,49.6-45,75.6-67.6v0v0 c90.7-79.1,179.9-157.1,156.4-208.4c-29.2-63.7,153.2-95.8,288.3-119.5c4.8-0.8,9.6-1.7,14.2-2.5c136.2-24,287.4,6,358,24 C2088.6,43.3,2214.7,91.6,2320,137.1z" />
        </svg>
        <video autoPlay muted loop>
          <source src="/images/bg.webm" />
        </video>
      </div>
    </div>
  )
}
