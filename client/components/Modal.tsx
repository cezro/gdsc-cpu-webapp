import React, { useState } from 'react';
import Modal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  merch: any;
  children?: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, merch }) => {
  const [name, setName] = useState<string>(merch.name);
  const [description, setDescription] = useState<string>(merch.description);
  const [image, setImage] = useState<File | null>(merch.image);
  const [price, setPrice] = useState<string>(merch.price);

  const handleSave = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image || ''); // Handle null case
    formData.append('price', price);

    onSave(formData);
    onClose();
  };

  const customStyles = {
    content: {
      width: '50%',
      height: '50%',
      margin: 'auto',
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
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
          <label className="text-black text-lg font-semibold mb-1">
            Image:
            <input 
              type="file" 
              className='text-black h-8 w-64 border border-stone-900'
              onChange={(e) => setImage(e.target.files?.[0] || null)} 
            />
          </label>
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
          className="btn btn-warning"
          onClick={handleSave}>Save</button>
      </div>
    </Modal>
  );
};

export default CustomModal;
