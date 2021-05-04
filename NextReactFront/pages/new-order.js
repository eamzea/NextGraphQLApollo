import { useContext, useState } from 'react';
import Layout from '../components/Layout/Layout';
import AssignClient from '../components/orders/assignClient';
import AssignProducts from '../components/orders/AssignProducts';
import Resume from '../components/orders/Resume';
import Total from '../components/orders/Total';
import { OrderContext } from '../context/orderContext';

const neworder = () => {
  const { state, actions, dispatch } = useContext(OrderContext);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

      <AssignClient />
      <AssignProducts />
      <Resume />
      <Total />
      <button
        type="button"
        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900`}
      >
        Register Order
      </button>
    </Layout>
  );
};

export default neworder;
