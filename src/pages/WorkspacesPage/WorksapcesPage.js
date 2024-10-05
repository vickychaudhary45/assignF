import React from 'react';
import Layout from '../../Layout';
import Workspaces from 'src/components/Workspaces/Workspaces';

const Training = () => {
  return (
    <Layout>
      <div className="main-content training-page">
        <div className="container">
          <div className="details-block">
            <Workspaces />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Training;
