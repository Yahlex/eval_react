import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/authContext';

function UpdateProduct() {
    const { productId } = useParams();
    const { state: { jwt } } = useAuth();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        images: []
    });
    const [fileFormData, setFileFormData] = useState(new FormData());

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${productId}?populate=images`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                if (response.data && response.data.data) {
                    const { name, description, price, images } = response.data.data.attributes;
                    setProductData({
                        name,
                        description,
                        price,
                        images: images.data.map(img => ({ id: img.id, url: img.attributes.url }))
                    });
                }
            } catch (error) {
                toast.error('Failed to fetch product details.');
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, [productId, jwt]);

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length) {
            const updatedFileFormData = new FormData();
            Array.from(files).forEach(file => {
                updatedFileFormData.append('files', file);
            });
            setFileFormData(updatedFileFormData);
        }
    };

    const handleSubmit = async () => {
        try {
            let imageIds = productData.images.map(img => img.id);
            if (fileFormData.has('files')) {
                const uploadResponse = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, fileFormData, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                imageIds = uploadResponse.data.map(file => file.id);
            }

            const updatedData = {
                data: {
                    name: productData.name,
                    description: productData.description,
                    price: parseFloat(productData.price),
                    images: imageIds
                }
            };

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/products/${productId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                toast.success('Product updated successfully');
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error('Error updating product.');
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <Input clearable bordered label="Name" name="name" value={productData.name} onChange={handleChange} />
            <Input clearable bordered label="Price" type="number" name="price" value={productData.price} onChange={handleChange} />
            <Textarea bordered label="Description" name="description" value={productData.description} onChange={handleChange} />
            {productData.images.map((image, index) => (
                <img key={index} src={`${process.env.REACT_APP_BASE_URL}${image.url}`} alt="Product" style={{ width: '100px', height: '100px' }} />
            ))}
            <input type="file" multiple onChange={handleFileChange} className="my-3" />
            <Button onClick={handleSubmit}>Update Product</Button>
        </div>
    );
}

export default UpdateProduct;
