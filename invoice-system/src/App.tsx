import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import type { Invoice } from './types';

function App() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');

  // Cargar facturas desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('invoices');
    if (saved) setInvoices(JSON.parse(saved));
  }, []);

  // Guardar facturas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  const handleAddInvoice = (invoice: Invoice) => {
    if (editingInvoice) {
      setInvoices(invoices.map(inv => inv.id === invoice.id ? invoice : inv));
      setEditingInvoice(null);
    } else {
      setInvoices([...invoices, invoice]);
    }
    setActiveTab('list');
  };

  const handleDeleteInvoice = (id: number) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
  };

  const handleEditInvoice = (id: number) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (invoice) {
      setEditingInvoice(invoice);
      setActiveTab('form');
    }
  };

  // Filtrar facturas por cliente
  const filteredInvoices = invoices.filter(inv =>
    inv.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '1em 0' }}>
        <button
          onClick={() => { setActiveTab('list'); setEditingInvoice(null); }}
          style={{
            padding: '0.5em 1em',
            marginRight: '1em',
            background: activeTab === 'list' ? '#007bff' : '#e9ecef',
            color: activeTab === 'list' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Facturas
        </button>
        <button
          onClick={() => { setActiveTab('form'); setEditingInvoice(null); }}
          style={{
            padding: '0.5em 1em',
            background: activeTab === 'form' ? '#007bff' : '#e9ecef',
            color: activeTab === 'form' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Nueva Factura
        </button>
      </div>
      {activeTab === 'list' && (
        <>
          <div style={{ maxWidth: 400, margin: '1em auto' }}>
            <input
              type="text"
              placeholder="Buscar por cliente..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.5em', marginBottom: '1em' }}
            />
          </div>
          <InvoiceList invoices={filteredInvoices} onDelete={handleDeleteInvoice} onEdit={handleEditInvoice} />
        </>
      )}
      {activeTab === 'form' && (
        <InvoiceForm onAdd={handleAddInvoice} editingInvoice={editingInvoice} />
      )}
    </div>
  );
}

export default App;