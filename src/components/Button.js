import PropTypes from 'prop-types';

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className='btn taskAddBtn flexc' style={{ margin: '0px 14px' }}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]), // Updated prop type definition
  onClick: PropTypes.func.isRequired, // Updated prop type definition
};

export default Button;