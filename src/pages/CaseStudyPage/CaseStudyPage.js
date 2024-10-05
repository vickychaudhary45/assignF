import React, { useState, useEffect } from "react";
import CaseStudyCard from "../../components/caseStudyCard/caseStudyCard";
import { NoCaseStudy, SkeletonLoading } from "./CaseStudySkeleton";
import "./CaseStudyPage.scss";
import { images } from "../../config/images";
import { Link } from "react-router-dom";
import { getCaseStudy } from "src/services/casestudy/services";
import LayoutTwo from "../../LayoutTwo";

const CaseStudy = () => {
  const scrollContainerRef = React.useRef(null);
  const [loading, setLoading] = useState(true);
  const [caseStudies, setcaseStudies] = useState([]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    getAllCaseStudy();
  }, []);

  const getAllCaseStudy = async () => {
    setLoading(true);
    await getCaseStudy().then((res) => {
      if (res.status) {
        setLoading(false);
        if (res.status && Array.isArray(res?.data?.data)) {
          let data = res.data.data;
          setcaseStudies(data);
        } else {
          console.error("Invalid data format or empty data array");
        }
      } else {
        setLoading(false);
        return;
      }
    });
  };

  return (
    <LayoutTwo>
      <head>
        <title>Case Studies</title>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline:
              "Discover how Whizlabs bridges cloud skill gaps for businesses through real-world success stories. Our case studies showcase innovative training strategies and measurable results, using advanced hands-on labs and cloud sandboxes.",
            image: [`${images.caseStudyTop}`],
            datePublished: "2024-01-05T08:00:00+08:00",
            dateModified: "2024-02-05T09:20:00+08:00",
          })}
        </script>
      </head>
      <div id="wrapper">
        <div id="content-area" className="case-study-page">
          <div className="case-study-content">
            <div className="image-container">
              <img
                className="img-full img-bottom"
                src={images.caseStudyTop}
                alt="caseStudyTop"
              />
              <img
                className="img-full img-top"
                src={images.caseStudyLanding}
                alt="caseStudyLanding"
              />
            </div>
            <div className="text-content">
              <h1>Case Studies</h1>
              <p>
                Discover how Whizlabs bridges cloud skill gaps for businesses
                through real-world success stories. Our case studies showcase
                innovative training strategies and measurable results, using
                advanced hands-on labs and cloud sandboxes.
              </p>
            </div>
            {caseStudies && caseStudies?.length > 0 && !loading ? (
              <>
                <div
                  class="box caseStudyCard-container"
                  ref={scrollContainerRef}
                >
                  {caseStudies &&
                    caseStudies?.length > 0 &&
                    caseStudies?.map((study) => (
                      <div className="caseStudyCard" key={study?.id}>
                        <Link
                          to={{
                            pathname: `/case-study-detail-page/${study.cs_param}`,
                            state: { study },
                          }}
                          className="caseStudies"
                        >
                          <CaseStudyCard study={study} />
                        </Link>
                      </div>
                    ))}
                </div>
                {caseStudies.length >= 6 && (
                  <>
                    <button
                      className="scroll-button left"
                      aria-label="Scroll Left"
                      onClick={scrollLeft}
                    >
                      &#10094;
                    </button>
                    <button
                      className="scroll-button right"
                      aria-label="Scroll Right"
                      onClick={scrollRight}
                    >
                      &#10095;
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                {!loading && caseStudies?.length == 0 ? (
                  <NoCaseStudy />
                ) : (
                  <SkeletonLoading />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </LayoutTwo>
  );
};

export default CaseStudy;
