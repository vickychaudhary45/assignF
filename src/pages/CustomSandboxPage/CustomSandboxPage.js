import Layout from '../../Layout';
import CustomSandbox from 'src/components/CustomSandbox/CustomSandbox';

const CustomSandboxPage = () => {
  return (
    <Layout>
      <div className="main-content training-page">
        <div className="container">
          <div className="details-block">
            <CustomSandbox />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomSandboxPage;
