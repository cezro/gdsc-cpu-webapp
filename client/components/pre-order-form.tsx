/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unknown-property */
import React, { Fragment, useState } from 'react';
import { getErrorMessage } from '../utils/utilFunctions';
import host from '@/utils/host';
import Modal from 'react-modal';
import { Button } from './ui/button';

const PreOrderForm = ({ merch }: any) => {
  const merch_id = merch.id;
  const [user_id, setUserID] = useState<number | string>('');
  const [shipping_province, setShippingProvince] = useState('');
  const [shipping_city, setShippingCity] = useState('');
  const [shipping_street, setShippingStreet] = useState('');
  const [shipping_house_number, setShippingHouseNumber] = useState('');
  // const [merch_id, setMerchID] = useState<number | string>('');
  const [image, setImage] = useState<File | null>(null);
  const [merch_quantity, setMerchQuantity] = useState<number | string>('');
  const date_time_submitted = new Date();

  const preOrderMerch = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // if (!image) {
    //   return;
    // }

    // const formData = new FormData();
    // formData.append('user_id', user_id.toString());
    // formData.append('shipping_provice', shipping_province);
    // formData.append('shipping_city', shipping_city);
    // formData.append('shipping_street', shipping_street);
    // formData.append('shipping_house_number', shipping_house_number);
    // formData.append('merch_id', merch_id.toString());
    // formData.append('image', image);
    // formData.append('merch_quantity', merch_quantity.toString());
    // formData.append('date_time_submitted', date_time_submitted.toString());

    try {
      const body = {
        user_id,
        shipping_province,
        shipping_city,
        shipping_street,
        shipping_house_number,
        merch_id,
        image,
        merch_quantity,
        date_time_submitted,
      };
      const preOrderUpload = await fetch(`${host}/pre-order-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });
      const jsonData = await preOrderUpload.json();
      const userId = jsonData.userId;

      setUserID(userId);
      const formUploadResponse = await preOrderUpload.json();
      console.log('Form uploaded successfully', formUploadResponse);

      handleCloseModal();
      window.location.href = '/merch';
    } catch (err) {
      console.error('Error uploading image', err);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null);
  };

  return (
    <Fragment>
      <Button className="w-full" onClick={handleOpenModal}>
        Pre-Order
      </Button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <div>
          <div>Shipping Address:</div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
              Province:
              <input
                type="text"
                className="text-black h-8 w-64 border border-stone-900"
                value={shipping_province}
                onChange={(e) => setShippingProvince(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
              City:
              <input
                type="text"
                className="text-black h-8 w-64 border border-stone-900"
                value={shipping_city}
                onChange={(e) => setShippingCity(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
              Street:
              <input
                type="text"
                className="text-black h-8 w-64 border border-stone-900"
                value={shipping_street}
                onChange={(e) => setShippingStreet(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
              House Number:
              <input
                type="text"
                className="text-black h-8 w-64 border border-stone-900"
                value={shipping_house_number}
                onChange={(e) => setShippingHouseNumber(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
              Image:
              <input
                type="file"
                className="text-black h-8 w-64 border border-stone-900"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div>
            <label className="text-black text-lg font-semibold mb-1">
              Quantity:
              <input
                type="number"
                className="text-black h-8 w-64 border border-stone-900"
                value={merch_quantity}
                onChange={(e) => setMerchQuantity(e.target.value)}
              />
            </label>
          </div>
          <button
            type="button"
            className="h-10 w-20 bg-yellow-400 border rounded-md hover:bg-blue-800"
            onClick={preOrderMerch}
          >
            Save
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default PreOrderForm;
