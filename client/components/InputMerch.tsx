/* eslint-disable react/no-unknown-property */
import React, { Fragment, useState } from 'react';
import { getErrorMessage } from '../utils/utilFunctions';
import host from '@/utils/host';
import { merchSchema } from '@/schemas/merch';
import { z } from 'zod';

const InputMerch = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState<number | string>('');

  const onSubmitForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!image) {
      return;
    }

    let isValid = false;

    try {
      merchSchema.parse({
        name,
        description,
        price,
      });
      isValid = true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation failed:', error.errors);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
    if (isValid) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('price', price.toString());

      try {
        const formUpload = await fetch(`${host}/admin/admin-merch`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const formUploadResponse = await formUpload.json();
        console.log('Form uploaded successfully', formUploadResponse);

        window.location.href = '/admin/admin-merch';
      } catch (err) {
        console.error('Error uploading image', err);
        console.error(getErrorMessage(err));
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null);
    console.log(file);
  };

  return (
    <Fragment>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <div className="my-4">
          <h1 className="text-black text-3xl underline underline-offset-4">
            Create GDSC merch
          </h1>
        </div>
        <div className="flex flex-col space-y-8">
          <div>
            <p className="text-black text-lg font-semibold mb-1">Merch Name</p>
            <input
              type="text"
              className="text-black h-8 w-64 border border-stone-900"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <p className="text-black text-lg font-semibold mb-1">
              Merch Description
            </p>
            <textarea
              typeof="text"
              className="text-black h-24 w-1/2 border border-stone-900"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div>
            <p className="text-black text-lg font-semibold mb-1">Merch Photo</p>
            <p className="text-black text-sm mb-1">(Maximum 1 MB)</p>
            <input
              type="file"
              className="text-black"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
            />
            {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
          </div>
          <div>
            <p className="text-black text-lg font-semibold mb-1">
              Merch Price (₱)
            </p>
            <input
              type="number"
              className="text-black h-8 w-64 border border-stone-900"
              placeholder="Price"
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
            />
          </div>
          <div>
            <button className="h-10 w-40 bg-blue-600 border rounded-md hover:bg-blue-800">
              Add Merch
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default InputMerch;
