//UpdateProduct.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/UpdateProduct.css'

const UpdateProduct = () => {
    const location = useLocation();
    const { product } = location.state || {};

    // Initialize states with product data
    const [fashion,setFashion] = useState(product?.category || '');
    const [subsubcategory,setsubsubCategory] = useState(product?.subsubcategory || '');
    const [brandname, setbrandName] = useState(product?.brandname || '');
    const [title, setTitle] = useState(product?.title || '');
    const [actualprice, setActualprice] = useState(product?.actualprice || 0);
    const [discount, setDiscount] = useState(product?.discount || 0);
    const [finalprice, setFinalprice] = useState(product?.finalprice || 0);
    const [minquantity, setminquantity] = useState(product?.minquantity || 1);
    const [sizes, setSizes] = useState(product?.sizes || []); // Assuming sizes is an array
    const [description, setDescription] = useState(product?.description || '');
    const [images, setImages] = useState(product?.images || ['', '', '', '']);

    // Calculate final price
    useEffect(() => {
        const final_price = actualprice - (actualprice * discount) / 100;
        setFinalprice(final_price);
    }, [actualprice, discount]);

    // Handle size checkbox changes
    const handleSizeChange = (size) => {
        setSizes((prevSizes) =>
            prevSizes.includes(size)
                ? prevSizes.filter((s) => s !== size) // Remove size if already selected
                : [...prevSizes, size] // Add size if not selected
        );
    };

    // Available sizes for checkboxes (you can adjust this list)
    const topbottomsizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const footwearsizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


    const navigate = useNavigate();
    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent form reload
    
        const updatedProduct = {
            _id: product._id, // Important for identifying which product to update
            category: fashion,
            subsubcategory,
            brandname,
            title,
            actualprice,
            discount,
            finalprice,
            minquantity,
            sizes,
            description,
            images,
        };
    
        try {
            const response = await axios.post('https://e-commerse-vert-seven.vercel.app/update_product', updatedProduct);
            console.log('Product updated successfully:', response.data);
            alert('Product updated successfully!');
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product');
        }
        navigate('/display');
    };
    














    return (
        <div className="update-details-container">
            <form className="update-form">
                <h2 className="form-title">Update Details</h2>
    
                <label className="form-label">Brand</label>
                <input
                    type="text"
                    value={brandname}
                    onChange={(e) => setbrandName(e.target.value)}
                    className="form-input"
                />
    
                <label className="form-label">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                />
    
                <label className="form-label">Actual Price</label>
                <input
                    type="number"
                    value={actualprice}
                    onChange={(e) => setActualprice(parseFloat(e.target.value) || 0)}
                    className="form-input"
                />
    
                <label className="form-label">Discount Percentage</label>
                <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    className="form-input"
                />
    
                <label className="form-label">Final Price</label>
                <input
                    type="number"
                    value={finalprice}
                    readOnly
                    className="form-input"
                />
    
                {fashion === "Fashion" && (
                    <>
                        <label className="form-label">Sizes</label>
                        <div className="size-options">
                            {(subsubcategory === "mFootwear" || subsubcategory === "wFootwear" || subsubcategory === "kFootwear"
                                ? footwearsizes
                                : topbottomsizes
                            ).map((size) => (
                                <label key={size} className="size-label">
                                    <input
                                        type="checkbox"
                                        value={size}
                                        checked={sizes.includes(size)}
                                        onChange={() => handleSizeChange(size)}
                                        className="size-checkbox"
                                    />
                                    {size}
                                </label>
                            ))}
                        </div>
                    </>
                )}
    
                <label className="form-label">Minimum Quantity</label>
                <input
                    type="number"
                    value={minquantity}
                    onChange={(e) => setminquantity(parseInt(e.target.value) || 1)}
                    className="form-input"
                />
    
                <label className="form-label">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                />
    
                {images.map((img, index) => (
                    <div key={index} className="image-input-container">
                        <label className="form-label">Image {index + 1}</label>
                        <input
                            type="text"
                            value={img}
                            onChange={(e) => {
                                const newImages = [...images];
                                newImages[index] = e.target.value;
                                setImages(newImages);
                            }}
                            className="form-input"
                        />
                    </div>
                ))}
    
                <button type="button" onClick={handleUpdate} className="update-button">
                    Update
                </button>
            </form>
        </div>
    );













//     return (
//         <div>
//         <form>
//             <h2>Update Details :</h2>

//             <label>Brand</label>
//             <input 
//                 type="text" 
//                 value={brandname} 
//                 onChange={(e) => setbrandName(e.target.value)} 
//             />

//             <label>Title</label>
//             <input 
//                 type="text" 
//                 value={title} 
//                 onChange={(e) => setTitle(e.target.value)} 
//             />

//             <label>Actual Price</label>
//             <input 
//                 type="number" 
//                 value={actualprice} 
//                 onChange={(e) => setActualprice(parseFloat(e.target.value) || 0)} 
//             />

//             <label>Discount Percentage</label>
//             <input 
//                 type="number" 
//                 value={discount} 
//                 onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} 
//             />

//             <label>Final Price</label>
//             <input 
//                 type="number" 
//                 value={finalprice} 
//                 readOnly 
//             />

//             {fashion === "Fashion" && (
//     <>
//         <label>Sizes</label>
//         <div>
//             {(subsubcategory === "mFootwear" || subsubcategory === "wFootwear" || subsubcategory === "kFootwear" 
//                 ? footwearsizes 
//                 : topbottomsizes
//             ).map((size) => (
//                 <label key={size}>
//                     <input
//                         type='checkbox'
//                         value={size}
//                         checked={sizes.includes(size)}
//                         onChange={() => handleSizeChange(size)}
//                     />
//                     {size}
//                 </label>
//             ))}
//         </div>
//     </>
// )}


//             <label>Minimum Quantity</label>
//             <input 
//                 type="number" 
//                 value={minquantity} 
//                 onChange={(e) => setminquantity(parseInt(e.target.value) || 1)} 
//             />

//             <label>Description</label>
//             <textarea 
//                 value={description} 
//                 onChange={(e) => setDescription(e.target.value)} 
//             />

//             {images.map((img, index) => (
//                 <div key={index}>
//                     <label>Image {index + 1}</label>
//                     <input 
//                         type="text" 
//                         value={img}
//                         onChange={(e) => {
//                             const newImages = [...images];
//                             newImages[index] = e.target.value;
//                             setImages(newImages);
//                         }} 
//                     />
//                 </div>
//             ))}
//             <button onClick={handleUpdate}>Update</button>
//             </form>
//         </div>
        
//     );
};

export default UpdateProduct;
