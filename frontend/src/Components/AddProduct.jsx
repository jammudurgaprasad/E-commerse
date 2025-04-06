//AddProduct.jsx
import React, { useState} from 'react';
import axios from 'axios';
import '../CSS/AddProduct.css';



const AddProduct =()=>{

    const [category,setCategory] = useState();
    const [subcategory,setSubcategory] = useState();
    const [subsubcategory,setsubsubCategory] = useState();
    const [weartype,setWeartype] = useState();
    const [sizes,setSizes] = useState([]);
    const [brandname,setbrandName] = useState();
    const [title,setTitle] = useState();
    const [actualprice,setActualprice] = useState();
    const [discount,setDiscount] = useState();
    const [finalprice,setFinalprice] = useState();
    const [description,setDescription] = useState();
    const [minquantity,setminquantity] = useState();
    const [images, setImages] = useState(["", "", "", ""]);

    React.useEffect(() => {
        const final_price = (actualprice * discount) / 100;
        setFinalprice(final_price);
    }, [actualprice, discount]); 
    
    const handleImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    };


    const categories =[
        "Fashion", "Mobiles", "Accessories", "Appliances", "Electronics", "Smart gadgets",
        "Home essentials", "Beauty and Personal Care", "Toys", "Stationary", "Food and Health",
        "Sports Hub", "Auto Accessories", "Furniture", "Medicines"
    ]

    const subCategory = ["Men","Women","Kids"];
    const msubsubCategory = ["mTop","mBottom","mFootwear"];
    const wsubsubCategory = ["wTop","wBottom","wFootwear"];
    const ksubsubCategory = ["wTop","wBottom","wFootwear"];

    const topbottomsizes = ["XS","S","M","L","XL","XXL"];
    const footwearsizes = [1,2,3,4,5,6,7,8,9,10,11,12];
    // Men's Clothing
    const mensTopWear = ["T-Shirts","Shirts","Jackets","Hoodies & Sweatshirts","Blazers","Sweaters","Kurta","Suits"];

    const mensBottomWear = [
        "Jeans",
        "Trousers",
        "Joggers",
        "Shorts",
        "Cargo Pants",
        "Formal Pants",
        "Track Pants",
        "Dhoti"
    ];

    const mensFootWear = [
        "Casual Shoes",
        "Formal Shoes",
        "Sneakers",
        "Loafers",
        "Boots",
        "Sandals & Floaters",
        "Sports Shoes",
        "Slippers & Flip-Flops"
    ];

    // Women's Clothing
    const womensTopWear = [
        "Tops & T-Shirts",
        "Blouses",
        "Kurtis",
        "Tunics",
        "Jackets & Shrugs",
        "Sweaters & Cardigans",
        "Sarees",
        "Lehenga Choli"
    ];

    const womensBottomWear = [
        "Jeans",
        "Trousers",
        "Palazzos",
        "Leggings",
        "Skirts",
        "Salwar",
        "Shorts",
        "Culottes"
    ];

    const womensFootWear = [
        "Heels",
        "Flats",
        "Wedges",
        "Sandals",
        "Sneakers",
        "Ballerinas",
        "Boots",
        "Flip-Flops"
    ];

    // Kids' Clothing
    const kidsTopWear = [
        "T-Shirts",
        "Shirts",
        "Sweatshirts",
        "Jackets",
        "Frocks & Dresses",
        "Kurta Sets",
        "Sweaters",
        "Hoodies"
    ];

    const kidsBottomWear = [
        "Jeans",
        "Track Pants",
        "Shorts",
        "Skirts",
        "Leggings",
        "Joggers",
        "Dungarees",
        "Trousers"
    ];

    const kidsFootWear = [
        "Casual Shoes",
        "Sports Shoes",
        "Sandals",
        "Slippers",
        "Boots",
        "Ballerinas",
        "Floaters",
        "Sneakers"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!category) {
            alert('Please select a category');
            return;
        }
    
        
        axios
            .post('https://e-commerse-vert-seven.vercel.app/upload', { 
                category, 
                subcategory, 
                subsubcategory, 
                weartype, 
                sizes,
                brandname,
                title,
                actualprice,
                discount,
                finalprice,
                minquantity,
                images,
                description,
             })
            .then((result) => {
                console.log(result);
                console.log(category, subcategory, subsubcategory, weartype,sizes,brandname,title,actualprice,discount,finalprice,minquantity,images );
            })
            .catch((err) => console.log(err));

    };

    const handleSizeChange = (size) => {
        setSizes((prevSizes) =>
            prevSizes.includes(size)
                ? prevSizes.filter((s) => s !== size)
                : [...prevSizes, size]
        );
    };

    



















    return (
        <div className="add-product-container">
            <h1 className="add-product-title">Add Product</h1>
            <form onSubmit={handleSubmit} className="product-form">
                <h2 className="section-title">Select Category</h2>
                <div className="category-list">
                    {categories.map((cat) => (
                        <label key={cat} className="category-item">
                            <input
                                type="radio"
                                name="category"
                                value={cat}
                                className="category-radio"
                                onChange={() => {
                                    setCategory(cat);
                                    setSubcategory(null);
                                    setsubsubCategory(null);
                                    setWeartype(null);
                                    setSizes([]);
                                }}
                            />
                            {cat}
                        </label>
                    ))}
                </div>
                {category === "Fashion" && (
                    <div className="subcategory-section">
                        <h2 className="section-title">Category Type:</h2>
                        {subCategory.map((gender) => (
                            <label key={gender} className="subcategory-item">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    className="subcategory-radio"
                                    onChange={() => {
                                        setSubcategory(gender);
                                        setsubsubCategory(null);
                                    }}
                                />
                                {gender}
                            </label>
                        ))}
                    </div>
                )}
                {subcategory && (
                    <div className="subsubcategory-section">
                        <h2 className="section-title">Category Variant:</h2>
                        {(subcategory === "Men"
                            ? msubsubCategory
                            : subcategory === "Women"
                            ? wsubsubCategory
                            : ksubsubCategory
                        ).map((sub) => (
                            <label key={sub} className="subsubcategory-item">
                                <input
                                    type="radio"
                                    name="variant"
                                    value={sub}
                                    className="subsubcategory-radio"
                                    onChange={() => setsubsubCategory(sub)}
                                />
                                {sub}
                            </label>
                        ))}
                    </div>
                )}
                {subcategory && subsubcategory && (
                    <div className="weartype-section">
                        <h2 className="section-title">Product Type:</h2>
                        {(subsubcategory === "mTop"
                            ? mensTopWear
                            : subsubcategory === "mBottom"
                            ? mensBottomWear
                            : subsubcategory === "mFootwear"
                            ? mensFootWear
                            : subsubcategory === "wTop"
                            ? womensTopWear
                            : subsubcategory === "wBottom"
                            ? womensBottomWear
                            : subsubcategory === "wFootwear"
                            ? womensFootWear
                            : subsubcategory === "kTop"
                            ? kidsTopWear
                            : subsubcategory === "kBottom"
                            ? kidsBottomWear
                            : subsubcategory === "kFootwear"
                            ? kidsFootWear
                            : []
                        ).map((type) => (
                            <label key={type} className="weartype-item">
                                <input
                                    type="radio"
                                    name="type"
                                    value={type}
                                    className="weartype-radio"
                                    onChange={() => setWeartype(type)}
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                )}
                {subcategory && subsubcategory && weartype && (
                    <div className="sizes-section">
                        <h2 className="section-title">Available Sizes:</h2>
                        {(subsubcategory.includes("Footwear") ? footwearsizes : topbottomsizes).map((size) => (
                            <label key={size} className="size-item">
                                <input
                                    type="checkbox"
                                    value={size}
                                    className="size-checkbox"
                                    checked={sizes.includes(size)}
                                    onChange={() => handleSizeChange(size)}
                                />
                                {size}
                            </label>
                        ))}
                    </div>
                )}
                <div className="product-details-section">
                    <h2 className="section-title">Product Details:</h2>
                    <label className="detail-label">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        className="detail-input"
                        required
                        onChange={(e) => setbrandName(e.target.value)}
                    />
                    <label className="detail-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="detail-input"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="detail-label">Actual Price</label>
                    <input
                        type="number"
                        name="actualprice"
                        className="detail-input"
                        required
                        onChange={(e) => setActualprice(parseFloat(e.target.value) || 0)}
                        value={actualprice}
                    />
                    <label className="detail-label">Discount Percentage:</label>
                    <input
                        type="number"
                        name="discount"
                        className="detail-input"
                        required
                        onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                        value={discount}
                    />
                    <label className="detail-label">Minimum Quantity</label>
                    <input
                        type="number"
                        name="minquantity"
                        className="detail-input"
                        required
                        onChange={(e) => setminquantity(parseFloat(e.target.value) || 0)}
                        value={minquantity}
                    />
                    <label className="detail-label">Description</label>
                    <textarea
                        type="text"
                        name="description"
                        className="detail-textarea"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {images.map((img, index) => (
                        <div key={index} className="image-input-container">
                            <label className="detail-label">Image {index + 1}</label>
                            <input
                                type="text"
                                value={img}
                                className="detail-input"
                                required
                                onChange={(e) => handleImageChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <button type="submit" className="submit-button">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;