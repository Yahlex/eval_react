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
    <Table className='my-7' aria-label='Example static collection table'>
      <TableHeader>
        <TableColumn>Image</TableColumn>
        <TableColumn className='text-center'>Nom</TableColumn>
        <TableColumn className='text-center'>Prix</TableColumn>
        <TableColumn className='text-center'>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className='text-center'>
              {product.attributes?.images?.data?.[0] ? (
                <img className='h-[100px] rounded-xl' src={`${process.env.REACT_APP_BASE_URL}${product.attributes.images.data[0].attributes.url}`} alt="Product" />
              ) : (
                <span>No image available</span>
              )}
            </TableCell>
            <TableCell>{product.attributes.name}</TableCell>
            <TableCell>{product.attributes.price} €</TableCell>
            <TableCell>
            <Button className='mr-3' color='primary' onClick={() => navigate(`/update-product/${product.id}`)} variant='flat'>
                Mettre à jour
            </Button>

              <Button color='danger' onPress={(event) => handleDelete(product.id, event)}>
                Supprimer
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
