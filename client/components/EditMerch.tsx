import React, { Fragment, useState } from "react";
import { getErrorMessage } from "@/utils/utilFunctions";
import Modal from 'react-modal';

const EditMerch = ({ merch }: any) => {
  const [name, setName] = useState<string>(merch.name);
  const [description, setDescription] = useState<string>(merch.description);
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState<number | string>(merch.price);

  // Edit merch function
  const updateMerch = async (e: any) => {
    e.preventDefault();
    try {
      const body = { name, description, image, price};
      await fetch(`http://localhost:3001/admin/admin-merch/${merch.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(body),
      });

      // Close the modal and refresh the page
      handleCloseModal();
      window.location.href = "/admin/admin-merch";
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

      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={customStyles}>
        <div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
            Name:
              <input 
                type="text" 
                className='text-black h-8 w-64 border border-stone-900'
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </label >
          </div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
            Description:
              <input 
                type="text" 
                className='text-black h-8 w-64 border border-stone-900'
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
            </label>
          </div>
          <div>
            {/* <label className="text-black text-lg font-semibold mb-1">
              Image:
              <input 
                type="file" 
                className='text-black h-8 w-64 border border-stone-900'
                onChange={(e) => {
                  if (e === null) {
                    setImage(image);
                  } else {
                    setImage(e.target.files?.[0] || null);
                  }
                }}
              />
            </label> */}
          </div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
              Price:
              <input 
                type="text" 
                className='text-black h-8 w-64 border border-stone-900'
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
              />
            </label>
          </div>
          <button 
            type="button"
            className="h-10 w-20 bg-yellow-400 border rounded-md hover:bg-blue-800"
            onClick={updateMerch}>Save</button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default EditMerch;