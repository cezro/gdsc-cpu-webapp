import React, { Fragment, useState, ChangeEvent } from "react";
import { getErrorMessage } from "../utils/utilFunctions";


const InputMerch = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState<number | string>("");

  const onSubmitForm = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const body = { name, description, image, price };
      const response = await fetch("http://localhost:3001/admin/admin-merch", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location.href = "/admin/admin-merch";
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null);
  };

  return (
    <Fragment>
      <form className="d-flex mt-5" onSubmit={ onSubmitForm }>
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
              onChange={event => setName(event.target.value)}
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
              onChange={event => setDescription(event.target.value)} 
            />
          </div>
          <div>
            <p className="text-black text-lg font-semibold mb-1">Merch Photo</p>
            <input
              type="file"
              className="text-black"
              accept="image/png, image/jpeg"
              // onChange={handleImageChange}
            />
            {/* {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />} */}
          </div>
          <div>
            <p className="text-black text-lg font-semibold mb-1">Merch Price</p>
            <input
              type="number"
              className="text-black h-8 w-64 border border-stone-900"
              placeholder="Price"
              value={price}
              onChange={event => setPrice(Number(event.target.value))} 
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
