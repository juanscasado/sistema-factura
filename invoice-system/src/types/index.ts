export interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: number;
  date: string;
  customer: string;
  items: InvoiceItem[];
}