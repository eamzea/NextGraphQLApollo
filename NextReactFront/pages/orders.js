import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GET_EXECUTIVE_CLIENTS } from '../api/queries';
import Layout from '../components/Layout/Layout';
import Loading from '../components/common/Loading';
import Client from '../components/Client';

const Orders = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-gray-800 font-light">Orders</h1>
        <Link href="/new-order">
          <a className="text-xs text-white bg-blue-800 px-3 py-1 rounded-full uppercase shadow-md hover:shadow-2xl hover:bg-blue-900 hover:scale-105 transform duration-500 focus:outline-none">
            New Order +
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Orders;
