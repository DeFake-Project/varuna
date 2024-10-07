// Varuna Ontology (c) by DeFake Project
// 
// Varuna Ontology is licensed under a
// Creative Commons Attribution 4.0 International License.
// 
// You should have received a copy of the license along with this
// work. If not, see <https://creativecommons.org/licenses/by/4.0/>.

import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
            <div className="flex items-center">
                {/* <img src="/path/to/logo.png" alt="Logo" className="w-8 h-8 mr-2" /> */}
                <h1 className="text-lg font-bold">Digital Media Forensics Ontology</h1>
            </div>
            <nav>
                {/* <ul className="flex space-x-4">
                    <li>
                        <a href="#" className="text-white hover:text-gray-300">Home</a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-gray-300">About</a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-gray-300">Contact</a>
                    </li>
                </ul> */}
            </nav>
        </header>
    );
};

export default Header;