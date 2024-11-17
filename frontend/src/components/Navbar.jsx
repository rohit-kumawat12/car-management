import React, { useEffect, useContext, useState} from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoteContext from "../context/notes/NoteContext";

const Navbar = () => {

    let navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const [name, setName] = useState(null);
    console.log(name);
    const context = useContext(NoteContext);

    const {getUser} = context;

    useEffect(() => {

        const fetchUserData = async () => {
            if (localStorage.getItem('token')) {
                try {
                    const userdata = await getUser();
                    setName(userdata.name);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
        };

        fetchUserData();
        // eslint-disable-next-line
    }, []);

    return (
        <>

            <nav className="navbar">
                <div>
                    <Link className="navbarbrand" to="/">
                        Car Management
                    </Link>
                </div>
                <div>
                    <ul className="navbar-nav d-flex">
                            {localStorage.getItem('token') ? (
                                <li style={{display:"flex", gap:"20px"}}>
                                    <button className="mybtn" onClick={handleLogout}>Logout</button>
                                    {/* <Link className="myprofile-btn" to='/profile'>{name[0]}</Link> */}
                                </li>
                            ) : (
                                <li>
                                    {location.pathname === '/signup' ? (<Link to="/login" role="button">Login</Link>) : (<Link to="/signup" role="button">SignUp</Link>)}
                                </li>
                            )
                            }
                    </ul>
                </div>

            </nav>
            <div className="navbar-h"></div>

        </>
    );
}

export default Navbar;