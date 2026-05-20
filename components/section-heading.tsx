type SectionHeadingProps = {
  kicker: string;
  title: string;
  emphasis: string;
  description?: string;
};

export function SectionHeading({
  kicker,
  title,
  emphasis,
  description,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">
        {title} <span>{emphasis}</span>
      </h2>
      {description ? <p className="section-copy">{description}</p> : null}
    </div>
  );
}
