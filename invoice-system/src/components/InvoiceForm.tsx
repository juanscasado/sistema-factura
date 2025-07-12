import { useState } from 'react';
import type { Invoice, InvoiceItem } from '../types';

interface Props {
  onAdd: (invoice: Invoice) => void;
}

const InvoiceForm: React.FC<Props> = ({ onAdd }) => {
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [desc, setDesc] = useState('');
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: desc, quantity: qty, price }]);
    setDesc('');
    setQty(1);
    setPrice(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer || !date || items.length === 0) return;
    onAdd({ id: Date.now(), customer, date, items });
    setCustomer('');
    setDate('');
    setItems([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nueva Factura</h2>
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
      <button type="submit">Guardar Factura</button>
    </form>
  );
};

export default InvoiceForm;