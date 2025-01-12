const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.error('Connection error', err));

//Invoice Scheme
const invoiceSchema = new mongoose.Schema({
    clientName: {type: String, required: true},
    amount: {type: Number, required: true},
    dueDate: {type: Date, required: true},
    status: {type: String, required: 'Pending'}
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

// API Endpoints

// Create  new invoice
app.post('/invoices', async (req, res) => {
    try {
        const invoice = new Invoice(req.body);
        const savedInvoice = await invoice.save();
        res.status(201).send(savedinvoice);
    } catch (err) {
        res.status(400).json({message: err.message}); 
    }  
});

// Get all invoices
app.get('/invoices', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.send(invoices);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get a single invoice by ID
app.get('/invoices/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({message: 'Invoice not found'});
        }
        res.json(invoice);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Update an invoice
app.put('/invoices/:id', async (req, res) => {
    try {
        const updateInvoice = await Invoice.findByIdAndUpdate(req.params.id.req.body, {new: true});
        if (!updateInvoice) return res.status(404).json({message: 'Invoice not found'});
        res.json(updateInvoice);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

//Delete an invoice
app.delete('/invoices/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) return res.status(404).json({message: 'Invoice not found'});
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Invoice Management System running on http://localhost:${PORT}`);
});