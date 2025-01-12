import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

import './index.css'

function HomePage() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() =>{
        const fetchInvoices = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/invoices', {
                    method: 'GET',
                    headers: {
                        Authirization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json()
                if (response.ok) {
                    setInvoices(data)
                }
                else {
                    alert(data.message)
                }
            }
            catch {
                alert(`Error fetching invoices`)
            }
        };
        fetchInvoices();
    }, []);

    return (
        <div className="home-container">
            <h1 className="home-heading">Home Page</h1>
            <Link to="/invoice-form" className="invoice-link">Add Invoice</Link>
            <ul>
                {invoices.map((invoice) => (
                    <li key={invoice._id}> {invoice.invoiceNumber}-{invoice.clientName}-{invoice.amount}-{invoice.status}</li>
                ))}
            </ul>
        </div>
    )
};

export default HomePage;