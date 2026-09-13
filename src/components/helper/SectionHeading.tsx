import React from 'react'

type Props= {
    title_1:string,
    title_2:string,
    description:string;
};

const SectionHeading = ({ title_1, title_2, description }: Props) => {
  return (
    <div className="text-center mb-8 sm:mb-12 md:mb-16 px-2">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2.5 sm:mb-4 tracking-tight">
        {title_1}{" "}
        <span className="text-indigo-700 dark:text-indigo-400">{title_2}</span>
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default SectionHeading