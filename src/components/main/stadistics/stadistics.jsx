import { dataApi } from "../dashboard/data/api/dataPart.api";

const Stadistics = () => {
 const statusCount = {
   1: 0,
   2: 0,
   3: 0,
 };

 // Calcular las cantidades de cada status
 dataApi.forEach((item) => {
   const { doc } = item.data;
   doc.forEach((docItem) => {
     statusCount[docItem.status]++;
   });
 });

 return (
   <div>
     <h1>Estadisticas</h1>
     <div>Cantidad de elementos con status 1: {statusCount[1]}</div>
     <div>Cantidad de elementos con status 2: {statusCount[2]}</div>
     <div>Cantidad de elementos con status 3: {statusCount[3]}</div>
   </div>
 );
};

export default Stadistics;