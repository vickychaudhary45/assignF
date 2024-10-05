import { useState, useEffect } from "react";
import { getMaintenanceBanner } from "src/services/maintenance-services/services";
import "./Maintenance.scss";

const MaintenanceMode = () => {
  const [bannerData, setBannerData] = useState({})

  useEffect(() => {
    const Banner = async () => {
      const res = await getMaintenanceBanner();
      if (res?.data?.status === "success") {
        setBannerData(res?.data?.data)
      }
    };
    Banner();
  }, [])

  function getClassname() {
    if (bannerData?.banner_position === 1)
      return `maintenance-bottom`
    else if (bannerData?.banner_position === 0)
      return `maintenance-top`
    else
      return 'maintenance-none'
  }

  return (
    <div className={getClassname()}>
      <div className="container"
        dangerouslySetInnerHTML={{ __html: bannerData?.banner_text !== undefined ? bannerData.banner_text : "" }}
      >
        {/* { banner-content} */}
      </div>
    </div>
  );
};

export default MaintenanceMode;
