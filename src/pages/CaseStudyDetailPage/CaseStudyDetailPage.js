import React, { useEffect, useState } from "react";
import "./CaseStudyDetailPage.scss";
import { images } from "../../config/images";
import { useParams, useLocation, Redirect } from "react-router-dom";
import LayoutTwo from "../../LayoutTwo";
import { getCaseStudyById } from "../../services/casestudy/services";
const API_ENDPOINT = "/case-study-detail-page";

const CaseStudyDetailPage = () => {
  // Retrieve parameters and state
  const { slug } = useParams();
  const location = useLocation();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const studyFromState = location.state?.study;
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Fetch case study details
  useEffect(() => {
    const fetchStudy = async () => {
      setLoading(true);
      try {
        const res = await getCaseStudyById(slug);
        if (res.status && res.data) {
          setCaseStudy(res?.data?.data);
        } else {
          console.error("Failed to fetch case study details");
        }
      } catch (error) {
        console.error("Error fetching case study details", error);
      }
      setLoading(false);
    };
    fetchStudy();
  }, [slug]);

  // Handle redirection if caseStudy is not available
  useEffect(() => {
    if (!loading && !caseStudy && !studyFromState) {
      setShouldRedirect(true);
    }
  }, [loading, caseStudy, studyFromState]);
  if (shouldRedirect) {
    return <Redirect to={API_ENDPOINT} />;
  }

  if (loading) return <div></div>;
  if (!caseStudy && !studyFromState) {
    return null;
  }
  
  const study = caseStudy || studyFromState;
  const { title, overview, challenges, solutions, outcomes, case_study_date } =
    study;

  // Helper function to truncate HTML
  const truncateHTML = (html, maxLength) => {
    const plainText = html?.replace(/<[^>]+>/g, "");
    return plainText?.length > maxLength
      ? `${plainText.slice(0, maxLength)}...`
      : plainText;
  };
  return (
    <LayoutTwo>
      <head>
        <title>{title}</title>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: overview,
            image: [`${images.caseStudyDetailB}`],
            datePublished: `${case_study_date}`,
            dateModified: `${case_study_date}`,
          })}
        </script>
      </head>
      <div id="wrapper">
        <div id="content-area" className="Detailed-page">
          <div className="Detailedtext-content">
            <p>{truncateHTML(title)}</p>
          </div>
          <div className="Detailed-content">
            <div className="image-container-Detailed">
              <img
                className="img-full img-bottom-Detailed"
                src={images.caseStudyDetailB}
                alt="caseStudyTop"
              />
              <img
                className="img-full img-top-Detailed"
                src={images.caseStudyDetail}
                alt="caseStudyLanding"
              />
            </div>
          </div>
          <div className="caseStudyDetailed-container">
            <div className="caseStudyIcon_Text">
              <div className="caseStudyText">
                <div className="section">
                  <div className="icon">
                    <figure className="img-icon">
                      <img src={images.overview} alt="overview" />
                    </figure>
                  </div>
                  <div className="content">
                    <div className="overview">
                      <div className="overviewHead">Client Overview</div>
                      <div
                        className="overviewDescription"
                        dangerouslySetInnerHTML={{ __html: overview }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="section">
                  <div className="icon">
                    <figure className="img-icon">
                      <img src={images.challenge} alt="challenge" />
                    </figure>
                  </div>
                  <div className="content">
                    <div className="overview">
                      <div className="overviewHead">Challenge</div>
                      <div
                        className="overviewDescription"
                        dangerouslySetInnerHTML={{ __html: challenges }}
                      />
                    </div>
                  </div>
                </div>
                <div className="section">
                  <div className="icon">
                    <figure className="img-icon">
                      <img src={images.Solution} alt="Solution" />
                    </figure>
                  </div>
                  <div className="content">
                    <div className="overview">
                      <div className="overviewHead">Solution by Whizlabs</div>
                      <div
                        className="overviewDescription"
                        dangerouslySetInnerHTML={{ __html: solutions }}
                      />
                    </div>
                  </div>
                </div>
                <div className="section">
                  <div className="icon">
                    <figure className="img-icon">
                      <img src={images.outcome} alt="outcome" />
                    </figure>
                  </div>
                  <div className="content">
                    <div className="overview" style={{ paddingBottom: "0px" }}>
                      <div className="overviewHead">Outcome</div>
                      <div
                        className="overviewDescription"
                        dangerouslySetInnerHTML={{ __html: outcomes }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutTwo>
  );
};

export default CaseStudyDetailPage;
