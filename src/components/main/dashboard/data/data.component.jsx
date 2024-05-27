import React, { useState } from "react";
import { dataApi } from "./api/dataPart.api";
import "./data.component.css";

const DataComponent = ({ selectedPartId }) => {
  const [selectedPart, setSelectedPart] = useState(null);

  React.useEffect(() => {
    const part = dataApi.find((part) => part.id_part === selectedPartId);
    setSelectedPart(part);
  }, [selectedPartId]);

  if (!selectedPart) {
    return (
      <div>
        No se encontró información para el número de parte seleccionado.
      </div>
    );
  }

  const { provider, data } = selectedPart;
  const { company, vendor, address, contact } = provider[0];
  const { mail, phone } = contact[0];

  const handleUpdate = async (doc) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf";
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (file && file.type === "application/pdf") {
        const updatedDoc = {
          ...doc,
          last_update: new Date().toISOString().slice(0, 10),
          file: file,
        };

        const newNextUpdate = prompt(
          "Ingrese la nueva fecha de siguiente actualización (YYYY-MM-DD):"
        );
        if (newNextUpdate) {
          updatedDoc.next_update = newNextUpdate;
        }

        setSelectedPart((prevState) => ({
          ...prevState,
          data: {
            ...prevState.data,
            doc: prevState.data.doc.map((d) =>
              d.id === doc.id ? updatedDoc : d
            ),
          },
        }));

        alert("El archivo se ha actualizado correctamente");
      } else {
        alert("Por favor, selecciona un archivo PDF válido.");
      }
    };
    fileInput.click();
  };

  const handleView = (doc) => {
    if (doc.file) {
      const url = URL.createObjectURL(doc.file);
      window.open(url, "_blank");
    } else {
      alert("No se encontró el archivo PDF.");
    }
  };

  const handleAddFile = async () => {
    const name = prompt("Ingrese el nombre del archivo:");
    const nextUpdate = prompt(
      "Ingrese la fecha de la próxima actualización (YYYY-MM-DD):"
    );
    if (name && nextUpdate) {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "application/pdf";
      fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
          const newDoc = {
            id: data.doc.length + 1,
            name,
            status: 1,
            last_update: new Date().toISOString().slice(0, 10),
            next_update: nextUpdate,
            file: file,
          };

          setSelectedPart((prevState) => ({
            ...prevState,
            data: {
              ...prevState.data,
              doc: [...prevState.data.doc, newDoc],
            },
          }));

          alert("El nuevo documento se ha agregado correctamente");
        } else {
          alert("Por favor, selecciona un archivo PDF válido.");
        }
      };
      fileInput.click();
    } else {
      alert(
        "Por favor, ingresa un nombre y una fecha válida para el nuevo documento."
      );
    }
  };

  const getStatusClass = (status, lastUpdate, nextUpdate) => {
    const currentDate = new Date();
    const nextUpdateDate = new Date(nextUpdate);
    const thirtyDaysBefore = new Date(nextUpdateDate);
    thirtyDaysBefore.setDate(nextUpdateDate.getDate() - 30);

    if (currentDate < thirtyDaysBefore) {
      return "green";
    } else if (
      currentDate >= thirtyDaysBefore &&
      currentDate <= nextUpdateDate
    ) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <div className="data-container">
      <div className="data-vendor-container">
        <div id="company-name">
          <p>{company}</p>
        </div>
        <div>
          <ul>
            <li>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.642 2.26611H1.358C0.88414 2.26611 0.5 2.65025 0.5 3.12411V10.8761C0.5 11.35 0.88414 11.7341 1.358 11.7341H12.642C13.1159 11.7341 13.5 11.35 13.5 10.8761V3.12411C13.5 2.65025 13.1159 2.26611 12.642 2.26611Z"
                  stroke="rgb(28, 28, 28, 0.4)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.35938 5.87939H11.3462"
                  stroke="rgb(28, 28, 28, 0.4)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.35938 7.84863H11.3462"
                  stroke="rgb(28, 28, 28, 0.4)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5072 6.20769C3.5072 7.11388 4.24181 7.8485 5.148 7.8485C5.37709 7.8485 5.59521 7.80154 5.79327 7.71674C6.37866 7.46609 6.78879 6.88479 6.78879 6.20769C6.78879 5.3015 6.05419 4.56689 5.148 4.56689C4.24181 4.56689 3.5072 5.3015 3.5072 6.20769Z"
                  stroke="rgb(28, 28, 28, 0.4)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.65381 9.47328C2.91453 8.97738 3.28096 8.56753 3.71787 8.28314C4.15478 7.99874 4.64748 7.84937 5.1486 7.84937C5.64973 7.84937 6.14243 7.99874 6.57934 8.28314C7.01625 8.56753 7.38268 8.97738 7.6434 9.47328"
                  stroke="rgb(28, 28, 28, 0.4)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p>{vendor}</p>
            </li>
            <li>
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.59515 0C4.32212 0 3.10122 0.505711 2.20105 1.40588C1.30088 2.30605 0.795166 3.52695 0.795166 4.79998C0.795166 8.03997 5.02515 11.7 5.20515 11.856C5.31383 11.9489 5.45214 12 5.59515 12C5.73816 12 5.87647 11.9489 5.98515 11.856C6.19515 11.7 10.3951 8.03997 10.3951 4.79998C10.3951 3.52695 9.88942 2.30605 8.98925 1.40588C8.08908 0.505711 6.86819 0 5.59515 0ZM5.59515 10.59C4.31715 9.38997 1.99516 6.80398 1.99516 4.79998C1.99516 3.84521 2.37445 2.92954 3.04957 2.25441C3.7247 1.57928 4.64037 1.2 5.59515 1.2C6.54993 1.2 7.4656 1.57928 8.14073 2.25441C8.81586 2.92954 9.19514 3.84521 9.19514 4.79998C9.19514 6.80398 6.87315 9.39597 5.59515 10.59ZM5.59515 2.39999C5.12048 2.39999 4.65646 2.54075 4.26179 2.80446C3.86711 3.06818 3.5595 3.44301 3.37785 3.88155C3.1962 4.32009 3.14867 4.80265 3.24127 5.2682C3.33388 5.73375 3.56245 6.16139 3.8981 6.49704C4.23374 6.83268 4.66138 7.06126 5.12694 7.15386C5.59249 7.24647 6.07505 7.19894 6.51359 7.01729C6.95213 6.83564 7.32696 6.52803 7.59067 6.13335C7.85439 5.73867 7.99514 5.27466 7.99514 4.79998C7.99514 4.16347 7.74229 3.55302 7.2922 3.10293C6.84212 2.65285 6.23167 2.39999 5.59515 2.39999ZM5.59515 5.99998C5.35781 5.99998 5.12581 5.9296 4.92847 5.79774C4.73113 5.66589 4.57732 5.47847 4.4865 5.2592C4.39567 5.03993 4.37191 4.79865 4.41821 4.56588C4.46451 4.3331 4.5788 4.11928 4.74663 3.95146C4.91445 3.78364 5.12827 3.66935 5.36104 3.62305C5.59382 3.57674 5.8351 3.60051 6.05437 3.69133C6.27364 3.78216 6.46105 3.93596 6.59291 4.1333C6.72477 4.33064 6.79515 4.56265 6.79515 4.79998C6.79515 5.11824 6.66872 5.42347 6.44368 5.64851C6.21863 5.87355 5.91341 5.99998 5.59515 5.99998Z"
                  fill="#1C1C1C"
                  fillOpacity="0.4"
                />
              </svg>

              <p>{address}</p>
            </li>
            <li>
              <svg
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.03455 1.59716C1.13739 1.25346 1.45808 1 1.83338 1H12.5C12.8753 1 13.196 1.25346 13.2989 1.59716L7.16671 5.88967L1.03455 1.59716ZM6.14149e-05 1.82505C-1.38061e-05 1.82985 -1.98858e-05 1.83466 4.29375e-05 1.83946V9.83333C4.29375e-05 10.8428 0.8239 11.6667 1.83338 11.6667H12.5C13.5095 11.6667 14.3334 10.8428 14.3334 9.83333V1.83952M13.3334 2.79366V9.83333C13.3334 10.2905 12.9572 10.6667 12.5 10.6667H1.83338C1.37619 10.6667 1.00004 10.2905 1.00004 9.83333V2.79366L6.87998 6.90962C7.05214 7.03013 7.28128 7.03013 7.45344 6.90962L13.3334 2.79366ZM14.3334 1.82498C14.3288 0.819319 13.5067 0 12.5 0H1.83338C0.826663 0 0.00455388 0.819354 6.14149e-05 1.82505"
                  fill="#1C1C1C"
                  fillOpacity="0.4"
                />
              </svg>

              <p>{mail}</p>
            </li>
            <li>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4992 8.26717L10.4277 7.19566C10.1083 6.87882 9.67719 6.70018 9.2273 6.69827C8.7774 6.69635 8.34477 6.87132 8.02267 7.18543C7.85081 7.35828 7.62408 7.46582 7.38149 7.48955C7.1389 7.51329 6.89562 7.45173 6.69351 7.31548C5.89582 6.78311 5.21055 6.09916 4.67664 5.3025C4.54278 5.09814 4.48345 4.85389 4.50865 4.61089C4.53384 4.3679 4.64202 4.14101 4.81496 3.96847C5.12623 3.64607 5.29894 3.21464 5.29612 2.76651C5.2933 2.31839 5.11517 1.88917 4.79986 1.57072L3.72835 0.499207C3.40756 0.179511 2.97312 0 2.52023 0C2.06733 0 1.63289 0.179511 1.3121 0.499207L1.00379 0.807997C-0.603472 2.41526 -0.483171 5.79442 2.86092 9.13656C4.8773 11.1534 6.90684 11.998 8.55259 11.998C9.03704 12.0141 9.51986 11.9337 9.9729 11.7613C10.426 11.589 10.8402 11.3282 11.1914 10.9942L11.5002 10.6854C11.8205 10.3644 12.0003 9.92949 12.0001 9.47607C11.9999 9.02266 11.8198 8.58786 11.4992 8.26717ZM10.8105 9.99669L10.5018 10.3055C9.23543 11.5718 6.44025 11.3405 3.54863 8.44835C0.657014 5.55625 0.425178 2.75912 1.69151 1.49279L1.99786 1.18449C2.1358 1.04705 2.32258 0.96988 2.5173 0.96988C2.71202 0.96988 2.8988 1.04705 3.03674 1.18449L4.10825 2.256C4.24368 2.39211 4.32056 2.57576 4.32247 2.76775C4.32438 2.95975 4.25117 3.1449 4.11848 3.28367C3.78937 3.61488 3.58407 4.04913 3.53699 4.51367C3.48991 4.97821 3.60389 5.44482 3.85986 5.83533C4.4665 6.74315 5.24661 7.52209 6.15532 8.12739C6.54466 8.38339 7.01005 8.49805 7.47375 8.45222C7.93745 8.40639 8.37139 8.20284 8.70308 7.87558C8.8416 7.74132 9.02726 7.66676 9.22016 7.66795C9.41307 7.66913 9.5978 7.74596 9.73466 7.88191L10.8062 8.95343C10.8752 9.02149 10.9301 9.10253 10.9678 9.1919C11.0054 9.28126 11.025 9.37718 11.0254 9.47414C11.0258 9.57111 11.007 9.66719 10.9701 9.75687C10.9333 9.84654 10.879 9.92805 10.8105 9.99669Z"
                  fill="#1C1C1C"
                  fill-opacity="0.4"
                />
              </svg>

              <p>{phone}</p>
            </li>
          </ul>
        </div>
        <button onClick={handleAddFile}>Agregar nuevo archivo</button>
      </div>
      <div className="data-container">
        <div className="data-part-container">
          <p className="title">{data.name}</p>
          <div className="pillow-container">
            <div className="pillow">
              <p>{data.part}</p>
            </div>
            <div className="pillow">
              <p>{data.process}</p>
            </div>
            <div className="pillow">
              <p>{data.grade}</p>
            </div>
          </div>
        </div>
        <div>
          <table className="data-table data-part">
            <thead>
              <tr>
                <th className="tName">Name</th>
                <th className="tStatus">Status</th>
                <th className="tLU">Last Update</th>
                <th className="tNU">Next Update</th>
                <th className="tU">Update</th>
                <th className="tV">View</th>
              </tr>
            </thead>
            <tbody>
              {data.doc.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.name}</td>
                  <td
                    className={`${getStatusClass(
                      doc.status,
                      doc.last_update,
                      doc.next_update
                    )} status-indicator jf-center`}
                  ></td>
                  <td className="jf-center">{doc.last_update}</td>
                  <td className="jf-center">{doc.next_update}</td>
                  <td>
                    <button onClick={() => handleUpdate(doc)}>UPDATE</button>
                  </td>
                  <td>
                    <button onClick={() => handleView(doc)}>VIEW</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataComponent;
