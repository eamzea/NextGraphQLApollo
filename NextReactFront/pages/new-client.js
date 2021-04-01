import Layout from '../components/Layout/Layout';

const newClient = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-gray-800 font-light">New Client</h1>
      </div>
    </Layout>
  );
};

export default newClient;
