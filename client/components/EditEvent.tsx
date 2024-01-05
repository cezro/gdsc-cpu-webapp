/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useState } from 'react';
import { getErrorMessage } from '@/utils/utilFunctions';
import Modal from 'react-modal';
import host from '@/utils/host';

const EditEvent = ({ event }: any) => {
  const [name, setName] = useState<string>(event.name);
  const [description, setDescription] = useState<string>(event.description);
  const [date, setDate] = useState<string>(event.date)
  const [time, setTime] = useState<string>(event.time)
  const [location, setLocation] = useState<string>(event.location)

 
  const updateEvent = async (e: any) => {
    e.preventDefault();
    try {
      const body = { name, description, date, time, location };
      await fetch(`${host}/admin/admin-events/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });

      // Close the modal and refresh the page
      handleCloseModal();
      window.location.href = '/admin/admin-events';
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  };

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const customStyles = {
    content: {
      width: '50%',
      height: '50%',
      margin: 'auto',
    },
  };

  return (
    <Fragment>
      <button
        type="button"
        className="h-10 w-20 bg-yellow-400 border rounded-md hover:bg-blue-800"
        onClick={handleOpenModal}
      >
        Edit
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
              Name:
              <input
                type="text"
                className="text-black h-8 w-64 border border-stone-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
              Description:
              <input
                type="text"
                className="text-black h-8 w-64 border border-stone-900"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
              Date:
              <input
                type="text"
                className="text-black h-8 w-64 border border-stone-900"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
              Description:
              <input
                type="text"
                className="text-black h-8 w-64 border border-stone-900"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
              Location:
              <input
                type="text"
                className="text-black h-8 w-64 border border-stone-900"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
          </div>
          <button
            type="button"
            className="h-10 w-20 bg-yellow-400 border rounded-md hover:bg-blue-800"
            onClick={updateEvent}
          >
            Save
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default EditEvent;