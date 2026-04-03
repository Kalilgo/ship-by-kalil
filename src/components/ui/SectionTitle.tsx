interface SectionTitleProps {
  children: string;
  className?: string;
}

export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`text-3xl md:text-4xl font-bold font-heading text-text-primary ${className}`}
    >
      {children}
    </h2>
  );
}