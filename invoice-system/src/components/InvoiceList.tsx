import type { Invoice } from '../types';

interface Props {
  invoices: Invoice[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const InvoiceList: React.FC<Props> = ({ invoices, onDelete, onEdit }) => (
  <section className="facturas-section">
    <h2>Facturas</h2>
    <ul>
      {invoices.map(inv => {
        const total = inv.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        return (
          <li key={inv.id}>
            <strong>{inv.customer}</strong> - {inv.date} - {inv.items.length} items - <b>Total: ${total.toFixed(2)}</b>
            <button onClick={() => onEdit(inv.id)} style={{ marginLeft: '1em' }}>Editar</button>
            <button onClick={() => onDelete(inv.id)} style={{ marginLeft: '1em' }}>Eliminar</button>
          </li>
        );
      })}
    </ul>
  </section>
);

export default InvoiceList;