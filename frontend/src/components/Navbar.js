import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="px-4 py-5 flex items-center bg-blue-500">
            <div className="flex space-x-6 items-center">
                <div className="text-3xl font-bold text-white italic">
                    <Link to="/" className="text-black italic">
                        SentenceScanner
                    </Link>
                </div>
                <Link to="/" className="text-black hover:text-white hover:scale-105 duration-200">
                    Home
                </Link>
                <Link to="/analyze" className="text-black hover:text-white hover:scale-105 duration-200">
                    Analyze
                </Link>
                
            </div>
        </nav>
    );
}

export default Navbar;
