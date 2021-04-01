import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GET_EXECUTIVE_CLIENTS } from '../api/queries';
import Layout from '../components/Layout/Layout';
import Loading from '../components/common/Loading';

export default function Home() {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_EXECUTIVE_CLIENTS);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    router.push('/login');
    return null;
  }

  const { getExecutiveClients } = data;

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
        <Link href="/new-client">
          <a className="text-xs text-white bg-blue-800 px-3 py-1 rounded-full uppercase shadow-md hover:shadow-2xl hover:bg-blue-900 hover:scale-105 transform duration-500 focus:outline-none">
            New Client +
          </a>
        </Link>
      </div>

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <td className="w-1/5 p-2">Name</td>
            <td className="w-1/5 p-2">Email</td>
            <td className="w-1/5 p-2">Company</td>
          </tr>
        </thead>
        <tbody className="bg-white">
          {getExecutiveClients.map(client => (
            <tr key={client.id}>
              <td className="border px-4 py-2">
                {client.name} {client.lastName}
              </td>
              <td className="border px-4 py-2">{client.company} </td>
              <td className="border px-4 py-2">{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
