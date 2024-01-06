/* eslint-disable react/no-unknown-property */
import React, { Fragment, useState } from 'react';
import { getErrorMessage } from '../utils/utilFunctions';
import host from '@/utils/host';
import { eventSchema } from '@/schemas/events';
import { z } from 'zod';

const InputMerch = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const onSubmitForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!image) {
      return;
    }

    let isValid = false;

    try {
      eventSchema.parse({
        name,
        description,
        date,
        time,
        location,
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
      formData.append('date', date);
      formData.append('time', time);
      formData.append('location', location);
      formData.append('image', image);

      try {
        const formUpload = await fetch(`${host}/admin/admin-events`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const formUploadResponse = await formUpload.json();
        console.log('Form uploaded successfully', formUploadResponse);

        window.location.href = '/admin/admin-events';
      } catch (err) {
        console.error('Error uploading image', err);
        console.error(getErrorMessage(err));
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null);
  };

  return (
    <Fragment>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <div className="my-4">
          <h1 className="text-black text-3xl underline underline-offset-4">
            Create GDSC event
          </h1>
        </div>
        <div className="flex flex-col space-y-8">
          <div>
            <p className="text-black text-lg font-semibold mb-1">Event Name</p>
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
              Event Description
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
            <p className="text-black text-lg font-semibold mb-1">Event Date</p>
            <input
              type="text"
              className="text-black h-8 w-64 border border-stone-900"
              placeholder="Date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div>
            <p className="text-black text-lg font-semibold mb-1">Event Time</p>
            <input
              type="text"
              className="text-black h-8 w-64 border border-stone-900"
              placeholder="Time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </div>
          <div>
            <p className="text-black text-lg font-semibold mb-1">
              Event Location
            </p>
            <input
              type="text"
              className="text-black h-8 w-64 border border-stone-900"
              placeholder="Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
          <div>
            <p className="text-black text-lg font-semibold mb-1">Event Photo</p>
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
            <button className="h-10 w-40 bg-blue-600 border rounded-md hover:bg-blue-800">
              Create Event
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default InputMerch;
