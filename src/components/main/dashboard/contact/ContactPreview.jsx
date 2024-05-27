import PropTypes from 'prop-types';
import './ContactPreview.css';

export function ContactPreview({ id, part, status, onClick }) {
  let statusColor = '';

  switch (status) {
    case 1:
      statusColor = 'green';
      break;
    case 2:
      statusColor = 'yellow';
      break;
    case 3:
      statusColor = 'red';
      break;
    default:
      statusColor = 'gray';
  }

  return (
    <div className="previewContact" key={id} onClick={onClick}>
      <div className={`status-indicator ${statusColor}`}></div>
      <p>{part}</p>
    </div>
  );
}

ContactPreview.propTypes = {
  id: PropTypes.number.isRequired,
  part: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
};

/**
 * import PropTypes from 'prop-types';
 * Object.propTypes={}
 * Esta funcion de react nos ayuda a obigar a que una variable no sea indefinida
 * y que sea forzoso recibir un parametro

ContactPreview.propTypes = {
    name: PropTypes.string.isRequired
}
/**
 * import PropTypes from 'prop-types';
 * Object.defaulProps = {}
 * nos ayuda a definir valores por defecto de nuestro objeto para que en caso de estar 
 * vacio, este envie un valor por defecto a cada entrada.
 */
/*ContactPreview.defaultProps = {
  name: 'Provedor del Bajio',
  img: '../img/users/male.svg'
}*/