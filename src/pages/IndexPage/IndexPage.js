import React, { useEffect } from "react";
import LayoutTwo from "../../LayoutTwo";
import { IndexPageProps } from "../../components/Props/IndexPageProps";
import Banner from "../../components/BannerTechnology/BannerTechnology";
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import ExploreSection from "../../components/ExploreSection/ExploreSection";
import GlobelSection from "../../components/GlobelSection/GlobelSection";
import CoursesSection from "../../components/CoursesSection/CoursesSection";
import BrandsBlock from "../../components/BrandsBlock/BrandsBlock";
import MainBanner from "../../components/BannerTechnology/MainBanner";
import Accordion from "../../components/Accordion/Accordion";
import { isLoggedIn } from "src/config/utils";
import ModalHomePage from "src/components/ModalHomePage/ModalHomePage";
import { useHistory } from 'react-router-dom';
// import "./responsive.css"
// import "./style.css"

const IndexPage = () => {
  const [open, setOpen] = React.useState(false);
  const user_data = JSON.parse(localStorage.getItem('user_data'));
  const handleClose = () => setOpen(false);
  const history = useHistory();
  if (isLoggedIn()) {
    user_data.data.is_owner ? 
    window.location.href = `/dashboard`
    :
    window.location.href = `/home-user`
    // return <Redirect to={{ pathname: user_data.data.is_owner ? '/dashboard6' : 'home-user' }} />;
  }
  // check url params for cloud journey QR code
  const urlParams = new URLSearchParams(window.location.search);
  const qr_id = urlParams.get('qr-id');
  const qr_codes = {
    "81bcb310-9efb-11ee-8c90-0242ac120002": 1300,
    // "2d16577a-f46a-421a-ad00-b7808e50d739": 1172,
  }
  const [company_id, setCompanyId] = React.useState(null);
  
  useEffect(() => {
    if (qr_id) {
      localStorage.setItem("qr_source", qr_id)
      urlParams.delete('qr-id');
        history.replace({
          search: urlParams.toString(),
        });
      qr_id in qr_codes ? setOpen(true) : setOpen(false);
      setCompanyId(qr_id in qr_codes ? qr_codes[qr_id] : null);
    }
  },[]);

  return (
    <LayoutTwo>
        <ModalHomePage open={open} handleClose={handleClose} company_id={company_id} />
         <MainBanner />
         <Banner />
         <FeatureSection />
         <ExploreSection />
         <GlobelSection />
         <CoursesSection />
         <BrandsBlock />
        <Accordion {...IndexPageProps.faq_block} />  
    </LayoutTwo>
  );
};

export default IndexPage;
