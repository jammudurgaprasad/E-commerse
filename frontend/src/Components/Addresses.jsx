import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Addresses = () => {
    const [userId] = useState(localStorage.getItem('userId'));
    const [addresses, setAddresses] = useState([]);
    const [formData, setFormData] = useState({
        fullname: '',
        phonenumber: '',
        pincode: '',
        state: '',
        city: '',
        houseno: '',
        area: ''
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/get_address/${userId}`);
            setAddresses(response.data);
        } catch (error) {
            console.error("Error fetching addresses", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert("Please login first!");
            return;
        }
        try {
            await axios.post(`http://localhost:3002/add_address/${userId}`, formData);
            fetchAddresses(); // Refresh address list
            setFormData({ fullname: '', phonenumber: '', pincode: '', state: '', city: '', houseno: '', area: '' });
        } catch (error) {
            console.error("Error adding address", error);
        }
    };

    const handleDelete = async (addressId) => {
        try {
            await axios.delete(`http://localhost:3002/delete_address/${addressId}`);
            fetchAddresses(); // Refresh address list
        } catch (error) {
            console.error("Error deleting address", error);
        }
    };

    return (
        <div>
            <h2>Manage Addresses</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} required />
                <input type="number" name="phonenumber" placeholder="Phone Number" value={formData.phonenumber} onChange={handleChange} required />
                <input type="number" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
                <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                <input type="text" name="houseno" placeholder="House No" value={formData.houseno} onChange={handleChange} required />
                <input type="text" name="area" placeholder="Area" value={formData.area} onChange={handleChange} required />
                <button type="submit">Add Address</button>
            </form>
            
            <h3>Saved Addresses</h3>
            <ul>
                {addresses.map((address) => (
                    <li key={address._id}>
                        {address.fullname}, {address.phonenumber}, {address.houseno}, {address.area}, {address.city}, {address.state}, {address.pincode}
                        <button onClick={() => handleDelete(address._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Addresses;
