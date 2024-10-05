import Layout from "../../Layout";
import WhatisNew from "src/components/ReleaseNotes/ReleaseNotes";

const ReleaseNotesPage = () => {
  return (
    <Layout>
      <div className="main-content">
        <WhatisNew />
      </div>
    </Layout>
  );
}

export default ReleaseNotesPage;
