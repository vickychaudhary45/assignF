import "./caseStudyCard.scss";
import { images } from "../../config/images";
import moment from "moment";

export default function CaseStudyPage(study) {
  const { category, title, overview, case_study_date, is_visible, file_name } =
    study.study;

  const truncateHTML = (html, maxLength) => {
    const plainText = html.replace(/<[^>]+>/g, "");
    return plainText.length > maxLength
      ? `${plainText.slice(0, maxLength)}...`
      : plainText;
  };
  if (is_visible !== 1) {
    return null;
  }
  return (
    <div className="caseStudyContainer">
      <div className="caseStudy-image-container">
        {file_name ? (
          <img
            className="img_full_card"
            src={`${process.env.REACT_APP_B2B_MEDIA_URL}homepage/case-studies/${file_name}`}
            alt="caseStudyCardB"
          />
        ) : (
          <>
            <img
              className="img_full_card img-bottom"
              src={images.caseStudyCardB}
              alt="caseStudyCardB"
            />
            <img
              className="img_full_card img-top"
              src={images.caseStudyCard}
              alt="caseStudyCard"
            />
          </>
        )}
      </div>
      <div className="content">
        <div className="badge">{category}</div>
        <div className="arrowTitle">
          <h2 className="title">{truncateHTML(title)}</h2>
          <span className="arrow">
            <img src={images.caseStudyRedirect} alt="caseStudyRedirect" />
          </span>
        </div>
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: truncateHTML(overview, 200) }}
        ></p>
      </div>
    </div>
  );
}
