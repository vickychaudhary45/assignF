export const NoCaseStudy = () => {
  return (
    <div className="skeleton-loading-container">
      {[1].map((index) => (
        <div key={index} className="skeleton horizontal">
          <div className="caseStudy-skeleton">
            <div className="caseStudy-skeleton-content">
              <div className="caseStudy-No-description">
                <div className="coming-soon">Coming Soon...</div>
              </div>
              <div className="caseStudy-skeleton-badge"></div>
              <div className="caseStudy-skeleton-badge"></div>
              <div className="caseStudy-skeleton-badge"></div>
              <div className="caseStudy-skeleton-info">
                <div className="caseStudy-skeleton-logo"></div>
                <div className="caseStudy-skeleton-whizlabs">
                  <div className="caseStudy-skeleton-name"></div>
                  <div className="caseStudy-skeleton-date"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export const SkeletonLoading = () => {
  return (
    <div className="skeleton-loading-container">
      {[1].map((index) => (
        <div key={index} className="skeleton horizontal">
          <div className="caseStudy-skeleton">
            <div className="caseStudy-skeleton-content">
              <div className="caseStudy-skeleton-description"></div>
              <div className="caseStudy-skeleton-arrowTitle">
                <div className="caseStudy-skeleton-title"></div>
                <div className="caseStudy-skeleton-arrow"></div>
              </div>
              <div className="caseStudy-skeleton-badge"></div>
              <div className="caseStudy-skeleton-badge"></div>
              <div className="caseStudy-skeleton-badge"></div>
              <div className="caseStudy-skeleton-info">
                <div className="caseStudy-skeleton-logo"></div>
                <div className="caseStudy-skeleton-whizlabs">
                  <div className="caseStudy-skeleton-name"></div>
                  <div className="caseStudy-skeleton-date"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
