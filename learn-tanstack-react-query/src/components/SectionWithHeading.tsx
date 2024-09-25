import { memo } from "react";

type Props = React.PropsWithChildren<{
  title: string | JSX.Element;
}>;

function SectionWithHeading({ title, children }: Props): JSX.Element {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-red-600">{title}</h2>
      {children}
    </section>
  );
}

export default memo(SectionWithHeading);
