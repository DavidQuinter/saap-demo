import React, { useState } from "react";
import './contactFilter.css';

export const SearchBarContact = ({ onSearch, onStatusFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleStatusFilter = (status) => {
    onStatusFilter(status);
  };

  return (
    <div className="box-contact-filter">
      <label>
        <span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.3501 14.3563C14.2568 14.4482 14.1311 14.4998 14.0001 14.5C13.8673 14.4994 13.7398 14.448 13.6438 14.3563L10.9438 11.65C9.80671 12.6051 8.34474 13.0844 6.86285 12.9878C5.38095 12.8912 3.99355 12.2263 2.99 11.1316C1.98645 10.037 1.44424 8.5972 1.47645 7.11251C1.50867 5.62782 2.11282 4.21289 3.1629 3.16281C4.21298 2.11272 5.62791 1.50858 7.1126 1.47636C8.59729 1.44415 10.0371 1.98636 11.1317 2.98991C12.2264 3.99346 12.8913 5.38086 12.9879 6.86276C13.0845 8.34465 12.6052 9.80662 11.6501 10.9438L14.3501 13.6438C14.3973 13.6903 14.4349 13.7457 14.4605 13.8069C14.4861 13.8681 14.4993 13.9337 14.4993 14C14.4993 14.0663 14.4861 14.132 14.4605 14.1931C14.4349 14.2543 14.3973 14.3097 14.3501 14.3563ZM7.2501 12C8.18956 12 9.10792 11.7214 9.88906 11.1995C10.6702 10.6776 11.279 9.9357 11.6385 9.06775C11.998 8.1998 12.0921 7.24474 11.9088 6.32333C11.7255 5.40192 11.2732 4.55555 10.6089 3.89125C9.94455 3.22695 9.09819 2.77456 8.17678 2.59128C7.25537 2.408 6.3003 2.50206 5.43235 2.86158C4.5644 3.22109 3.82255 3.82991 3.30062 4.61105C2.77868 5.39218 2.5001 6.31054 2.5001 7.25001C2.50175 8.50928 3.00273 9.7165 3.89317 10.6069C4.78361 11.4974 5.99083 11.9984 7.2501 12Z"
            fill="black"
            fill-opacity="0.2"
          />
        </svg>
        </span>
        <input
          className="contact-filter"
          type="text"
          placeholder="Buscar número de parte"
          value={searchTerm}
          onChange={handleChange}
        />
      </label>
      <div className="status-filters">
        <button onClick={() => handleStatusFilter(1)}>Actualizados</button>
        <button onClick={() => handleStatusFilter(2)}>Por vencer</button>
        <button onClick={() => handleStatusFilter(3)}>Vencidos</button>
      </div>
    </div>
  );
};
