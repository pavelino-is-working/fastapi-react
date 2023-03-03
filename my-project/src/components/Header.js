import React, { useContext } from "react";

import GlobalContext from "../context/GlobalContext";

const Header = ({title}) => {
    const {token, setToken} = useContext(GlobalContext);

    const handleLogout = () =>{
    setToken(null);

    };
    return (
        <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <div className="flex justify-center text-2xl ">
        <h1 className="title">{title}</h1>
        
    </div>
            <div class="flex items-center lg:order-2">
                { token &&(
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
        Logout</button>
        )}
            </div>
        </div>
    </nav>
</header>

    
    );
}
export default Header;