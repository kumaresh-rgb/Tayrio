import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, editContact, deleteContact } from '../components/Redux/contactSlice';

const ContentManagement = () => {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showInitialAlert, setShowInitialAlert] = useState(true); // State to manage the initial alert

  const handleAddContact = () => {
    dispatch(addContact({ name, email }));
    setName('');
    setEmail('');
    setShowInitialAlert(false); // Hide the initial alert after adding a contact
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setName(contact.name);
    setEmail(contact.email);
  };
  
  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
    if (contacts.length === 1) {
      setShowInitialAlert(true); // Show the alert when all contacts are deleted
    }
  };

  const handleUpdateContact = () => {
    dispatch(editContact({ id: selectedContact.id, name, email }));
    setSelectedContact(null);
    setName('');
    setEmail('');
  };

  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Content Management</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full mt-2"
        />
        <div className="mt-2">
          {selectedContact ? (
            <button
              onClick={handleUpdateContact}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Update Contact
            </button>
          ) : (
            <button
              onClick={handleAddContact}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Add Contact
            </button>
          )}
        </div>
        <div className="flex items-center mt-2">
      <input
        type="checkbox"
        checked={isActive}
        onChange={() => setIsActive(!isActive)}
        className="mr-2"
      />
      <label>Active</label>
    </div>
        {showInitialAlert && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 mt-2 rounded">
            <p className="font-bold">Alert:</p>
            <p>There are no contacts  Please add a contact.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="border p-4 rounded bg-white">
            <p className="font-semibold">{contact.name}</p>
            <p className="text-gray-600">{contact.email}</p>
            <div className="flex mt-2">
              <button
                onClick={() => handleEditContact(contact)}
                className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteContact(contact.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
