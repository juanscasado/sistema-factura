import React, { useState, useEffect } from 'react';
import type { Invoice, InvoiceItem } from '../types';

interface Props {
  onAdd: (invoice: Invoice) => void;
  editingInvoice?: Invoice | null;
}

const InvoiceForm: React.FC<Props> = ({ onAdd, editingInvoice }) => {
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [desc, setDesc] = useState('');
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingInvoice) {
      setCustomer(editingInvoice.customer);
      setDate(editingInvoice.date);
      setItems(editingInvoice.items);
    } else {
      setCustomer('');
      setDate('');
      setItems([]);
    }
    setError('');
  }, [editingInvoice]);

  const addItem = () => {
    if (!desc) {
      setError('La descripción es obligatoria.');
      return;
    }
    if (qty <= 0) {
      setError('La cantidad debe ser mayor a 0.');
      return;
    }
    if (price < 0) {
      setError('El precio no puede ser negativo.');
      return;
    }
    setItems([...items, { id: Date.now(), description: desc, quantity: qty, price }]);
    setDesc('');
    setQty(1);
    setPrice(0);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) {
      setError('El cliente es obligatorio.');
      return;
    }
    if (!date) {
      setError('La fecha es obligatoria.');
      return;
    }
    if (items.length === 0) {
      setError('Debe agregar al menos un item.');
      return;
    }
    const invoice: Invoice = {
      id: editingInvoice ? editingInvoice.id : Date.now(),
      customer,
      date,
      items,
    };
    onAdd(invoice);
    setCustomer('');
    setDate('');
    setItems([]);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingInvoice ? 'Editar Factura' : 'Nueva Factura'}</h2>
      {error && <div style={{ color: 'red', marginBottom: '1em' }}>{error}</div>}
      <input
        type="text"
        placeholder="Cliente"
        value={customer}
        onChange={e => setCustomer(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <div>
        <input
          type="text"
          placeholder="Descripción"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <input
          type="number"
          min={1}
          placeholder="Cantidad"
          value={qty}
          onChange={e => setQty(Number(e.target.value))}
        />
        <input
          type="number"
          min={0}
          step={0.01}
          placeholder="Precio"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
        />
        <button type="button" onClick={addItem}>Agregar Item</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.description} - {item.quantity} x ${item.price}</li>
        ))}
      </ul>
      <button type="submit">{editingInvoice ? 'Actualizar' : 'Guardar Factura'}</button>
    </form>
  );
};

export default InvoiceForm;