const LayoutTwo = ({ children, mainClass, login }) => {
  return (
    <>
      <div className={`main-wrapper ${mainClass || ""}`}>{children}</div>
    </>
  );
};

export default LayoutTwo;