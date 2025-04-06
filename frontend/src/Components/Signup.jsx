// //Signup.jsx
// import React from 'react';
// import { useState } from 'react';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';

// const Signup = () => {
//     const [name,setName] = useState();
//     const [email,setEmail] = useState();
//     const [password,setPassword] = useState();
//     const navigate = useNavigate()
//     const handleSubmit =(e)=>{
//         e.preventDefault();
//         axios
//             .post('http://localhost:3002/',{name, email, password})
//             .then(result => {
//                 console.log(result);
//                 navigate('/login');
//         }
//         )
//             .catch(err => console.log(err))

//     }
//   return (
//     <div>
//         <h1>Signup</h1>
//         <form onSubmit={handleSubmit}>
//             <input
//                 type='text'
//                 placeholder='Name'
//                 name='name'
//                 className='input'
//                 onChange={(e)=>setName(e.target.value)}
//             />
//             <input
//                 type='email'
//                 placeholder='E-Mail'
//                 name='email'
//                 className='input'
//                 onChange={(e)=>setEmail(e.target.value)}
//             />
//             <input
//                 type='password'
//                 placeholder='Password'
//                 name='password'
//                 className='input'
//                 onChange={(e)=>setPassword(e.target.value)}
//             />
//             <input
//                 type='submit'
//                 value='REGISTER'
//             />
//         </form>
//     </div>
//   )
// }

// export default Signup




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Signup.css'; // Import the CSS file

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('https://e-commerse-vert-seven.vercel.app/', { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1 className="signup-title">Signup</h1>
                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='input'
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type='email'
                    placeholder='E-Mail'
                    name='email'
                    className='input'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='input'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type='submit'
                    value='REGISTER'
                    className="signup-btn"
                />
                <p>Already have an account? <a href='/login'>Login</a></p>
            </form>
            
        </div>
    );
};

export default Signup;
