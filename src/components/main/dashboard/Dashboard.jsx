import React, { useState } from 'react';
import { ContactPreview } from "./contact/ContactPreview";
import './Dashboards.css';
import { dataContact } from "./contact/api.contact";
import { SearchBarContact } from "./contact/contactFilters";
import DataComponent from './data/data.component';

const Dashboard = () => {
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState(dataContact);
  

  const handleSearch = (searchTerm) => {
    const filtered = dataContact.filter((contact) =>
      contact.part.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const handleStatusFilter = (status) => {
    const filtered = dataContact.filter((contact) => contact.status === status);
    setFilteredContacts(filtered);
  };

  const handlePartClick = (partId) => {
    setSelectedPartId(partId);
  };
  
  return (
    <div className="dashboard">
      <SearchBarContact onSearch={handleSearch} onStatusFilter={handleStatusFilter} />
      <div className="contacts">
        {filteredContacts.map((contact) => (
          <ContactPreview
            key={contact.id}
            id={contact.id}
            part={contact.part}
            status={contact.status}
            onClick={() => handlePartClick(contact.id)}
          />
        ))}
      </div>
      {selectedPartId && <DataComponent selectedPartId={selectedPartId} />}
    </div>
  );
};

export default Dashboard;