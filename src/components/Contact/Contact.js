import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { WrapContact } from './Contact.styled';
import { deleteContact, editContact } from 'reduxe/sliceContacts';

const Contact = ({ contact }) => {
  const dispatcher = useDispatch();

  const handlerDelete = () => {
    dispatcher(deleteContact(contact.id));
  };

  const handlerEdit = () => {
    dispatcher(editContact(contact.id));
  };

  return (
    <WrapContact>
      {contact.name}: {contact.number}
      <button type="button" onClick={handlerDelete}>
        Delete
      </button>
      <button type="button" onClick={handlerEdit}>
        Edit
      </button>
    </WrapContact>
  );
};

Contact.propType = {
  contact: PropTypes.exact({
    id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    edit: PropTypes.bool,
  }).isRequired,
};

export default Contact;
