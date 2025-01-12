import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import "./index.css"

function InvoiceFormPage() {
    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: '',
        clientName: '',
        date: '',
        amount: '',
        status: 'Pending',
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        setInvoiceData({...invoiceData, [event.target.name]: event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/api/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(invoiceData)
            });
            if (response.ok) {
                navigate('/home')
            }
            else {
                const data = await response.json();
                alert(data.message);
            }
        }
        catch (error) {
            alert('Error submitting invoice');
        }
    };

    return (
        <div className='invoice-container'>
            <h1 className='invoice-heading'>Invoice Form</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label htmlFor='number' className='label'>Invoice Number:</label>
                    <input className='form-control' type='number' name='invoiceNumber' id='number' value={invoiceData.invoiceNumber} onChange={handleChange} required/>
                </div>
                <div className='input-container'>
                    <label className='label' htmlFor='name'>Client Name:</label>
                    <input className='form-control' type='text' name='clientName' id='name' value={invoiceData.clientName} onChange={handleChange} required/>
                </div>
                <div className='input-container'>
                    <label className='label' htmlFor='date'>Date:</label>
                    <input className='form-control' type='date' name='date' id='date' value={invoiceData.date} onChange={handleChange} required/>
                </div>
                <div className='input-container'>
                    <label className='label' htmlFor='amount'>Amount:</label>
                    <input className='form-control' type='number' name='amount' id='amount' value={invoiceData.amount} onChange={handleChange} required/>
                </div>
                <div className='input-container'>
                    <label className='label' htmlFor='select'>Select:</label>
                    <select className='form-control' name='status' value={invoiceData.status} onChange={handleChange} id = 'select'>
                        <option value= 'Pending'>Pending</option>
                        <option value='Paid'>Paid</option>
                        <option value='Unpaid'>Unpaid</option>
                    </select>
                </div>
                <button className='submit-button' type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default InvoiceFormPage;