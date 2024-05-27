import React, { useEffect } from 'react';
import { dataApi } from '../dashboard/data/api/dataPart.api';// Importamos los datos de la API

const EmailReminder = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      // Función que se ejecutará cada 24 horas
      const currentDate = new Date();

      dataApi.forEach((item) => {
        const { provider, data } = item;
        const { doc } = data;
        const { mail } = provider[0].contact[0];

        doc.forEach((docItem) => {
          const { next_update } = docItem;
          const nextUpdateDate = new Date(next_update);

          // 30 días antes de la fecha de actualización
          const thirtyDaysBefore = new Date(nextUpdateDate);
          thirtyDaysBefore.setDate(nextUpdateDate.getDate() - 30);

          // 15 días después de la fecha de actualización
          const fifteenDaysAfter = new Date(nextUpdateDate);
          fifteenDaysAfter.setDate(nextUpdateDate.getDate() + 15);

          if (currentDate >= thirtyDaysBefore && currentDate < nextUpdateDate) {
            // Enviar correo 30 días antes de la fecha de actualización
            sendEmail(mail, `La fecha de actualización de ${docItem.name} se acerca (${next_update})`);
          } else if (currentDate.toDateString() === nextUpdateDate.toDateString()) {
            // Enviar correo el día de la fecha de actualización
            sendEmail(mail, `La fecha de actualización de ${docItem.name} ha llegado (${next_update})`);
          } else if (currentDate >= fifteenDaysAfter) {
            // Enviar correo 15 días después de la fecha de actualización
            sendEmail(mail, `Urgente: Actualizar ${docItem.name} (${next_update})`);
          }
        });
      });
    }, 24 * 60 * 60 * 1000); // Ejecutar cada 24 horas (24 * 60 * 60 * 1000 milisegundos)

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  const sendEmail = async (to, message) => {
    try {
      const response = await fetch('https://formspree.io/f/xwkgjypr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, message }),
      });

      if (response.ok) {
        console.log('Correo electrónico enviado correctamente');
      } else {
        console.error('Error al enviar el correo electrónico');
      }
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  };

  return <div>EmailReminder Component</div>;
};

export default EmailReminder;