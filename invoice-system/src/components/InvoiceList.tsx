import type { Invoice } from '../types';

interface Props {
  invoices: Invoice[];
}

const InvoiceList: React.FC<Props> = ({ invoices }) => (
  <section>
    <h2>Facturas</h2>
    <ul>
      {invoices.map(inv => (
        <li key={inv.id}>
          <strong>{inv.customer}</strong> - {inv.date} - {inv.items.length} items
        </li>
      ))}
    </ul>
  </section>
);

export default InvoiceList;