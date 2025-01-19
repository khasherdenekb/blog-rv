export const PageBody = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <div id="blocks" className="border-b border-grid scroll-mt-24">
      <div className="container-wrapper">
        <div className="container flex items-center py-4">{children}</div>
      </div>
    </div>
  );
};
