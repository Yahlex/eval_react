import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useFetch } from '../../hooks/Api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext';
import { toast } from 'react-toastify';

export default function ProductsListDashboard({ artisanId }) {
  const { response: products, error: productsError, isLoading: productsIsLoading } = useFetch(`/products?filters[artisan][id][$eq]=${artisanId}&populate=*`);
  const { state: { jwt } } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async (id, event) => {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    console.log('BONJOUR ', response);
    if (response.status === 200) {
      toast.success('Produit correctement supprimé');
      event.target.parentNode.parentNode.remove();
    }
  };

  if (productsIsLoading) {
    return <h2>Chargement ...</h2>;
  }
  if (productsError) {
    return <pre>{JSON.stringify(productsError, null, 2)}</pre>;
  }
  if (!products || products.length === 0) {
    return <p>Aucun produit</p>;
  }

  return (
<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                    Image
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                    Nom
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                    Prix
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => (
                <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="py-4 px-6">
                        {product.attributes?.images?.data?.[0] ? (
                            <img className="h-[100px] rounded-xl" src={`${process.env.REACT_APP_BASE_URL}${product.attributes.images.data[0].attributes.url}`} alt="Product" />
                        ) : (
                            <span>No image available</span>
                        )}
                    </td>
                    <td className="py-4 px-6 text-center">{product.attributes.name}</td>
                    <td className="py-4 px-6 text-center">{product.attributes.price} €</td>
                    <td className="py-4 px-6 text-center">
                        <button 
                            className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2" 
                            onClick={() => navigate(`/update-product/${product.id}`)}>
                            Modifier
                        </button>
                        <button 
                            className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2 text-center" 
                            onClick={(event) => handleDelete(product.id, event)}>
                            Supprimer
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

  );
}
