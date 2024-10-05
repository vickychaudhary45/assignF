import Layout from '../../Layout';
import VirtualMachines from 'src/components/VirtualMachines/VirtualMachines';

const VirtualMachine = () => {
  return (
    <Layout>
      <div className="main-content training-page">
        <div className="container">
          <div className="details-block">
            <VirtualMachines />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VirtualMachine;
