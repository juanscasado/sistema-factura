import { useState } from 'react';
import Header from './components/Header';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import type { Invoice } from './types';

function App() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const handleAddInvoice = (invoice: Invoice) => {
    setInvoices([...invoices, invoice]);
  };

  return (
    <div>
      <Header />
      <InvoiceForm onAdd={handleAddInvoice} />
      <InvoiceList invoices={invoices} />
    </div>
  );
}

export default App;