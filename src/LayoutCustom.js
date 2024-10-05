import HeaderCustom from "./components/HeaderCustom/HeaderCustom";

const LayoutCustom = ({ children, mainClass }) => {
  localStorage.setItem('user_login_url', window.location.href);
  return (
    <>
      <div className={`main-wrapper ${mainClass || ""}`}>
        <HeaderCustom />
        {children}
      </div>
    </>
  );
};

export default LayoutCustom;