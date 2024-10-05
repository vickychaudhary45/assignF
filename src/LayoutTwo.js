import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Livechat from "./components/LiveChat/Livechat";
import HeaderSlug from "./components/HeaderSlug/HeaderSlug";

const LayoutTwo = ({ children, mainClass, login }) => {
  const domainAccessInfo = JSON.parse(localStorage.getItem('domainAccessInfo'));
  return (
    <>
      <div className={`main-wrapper ${mainClass || ""}`}>
        {login?.enable_custom_login === 1 ? <HeaderSlug login={login} /> : <Header />}
        {login?.enable_custom_login === 1 ? <></> : <>{(domainAccessInfo?.companyInfo?.allow_whitelabeling) ? <></> : <><Livechat /></>}</>}
        {children}
        {login?.enable_custom_login === 1 ? null : <Footer />}
      </div>
    </>
  );
};

export default LayoutTwo;