import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { CustomerForm } from './components/CustomerForm';
import { CustomerList } from './components/CustomerList';
import type { Customer } from './types/Customer';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const addCustomer = (customerData: Omit<Customer, 'id'>) => {
    const newCustomer = {
      ...customerData,
      id: crypto.randomUUID(),
    };
    setCustomers([...customers, newCustomer]);
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const toggleCustomerStatus = (id: string) => {
    setCustomers(customers.map(customer =>
      customer.id === id
        ? { ...customer, status: customer.status === 'active' ? 'inactive' : 'active' }
        : customer
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Customer Relationship Manager</h1>
          </div>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-md">
            {customers.length} Customers
          </div>
        </div>

        <CustomerForm onSubmit={addCustomer} />
        
        {customers.length > 0 ? (
          <CustomerList
            customers={customers}
            onDelete={deleteCustomer}
            onToggleStatus={toggleCustomerStatus}
          />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No customers</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new customer.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;