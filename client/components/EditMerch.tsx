import React, { Fragment, useState } from "react";
import { getErrorMessage } from "@/utils/utilFunctions";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const EditMerch = ({ merch }: any) => {
  
  const [name, setName] = useState<string>(merch.name);
  const [description, setDescription] = useState<string>(merch.description);
  const [image, setImage] = useState<File | null>(merch.image);
  const [price, setPrice] = useState<number>(merch.price);

  //edit description function
  const updateDescription = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // allows to run code before refreshing
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:3001/admin/admin-merch/${merch.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location.href = "/admin/admin-merch";
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  }

  return (
    <Fragment>
      <button type="button" className="h-10 w-20 bg-yellow-400 border rounded-md hover:bg-blue-800" data-toggle="modal" data-target={`#id${merch.id}`}>
        Edit
      </button>

      <div 
        className="modal" 
        id={`id${merch.id}`} 
        onClick={() => setDescription(merch.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Edit Merch</h4>
              <button 
                type="button" 
                className="close" 
                data-dismiss="modal"
                onClick={() => setDescription(merch.description)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input 
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-warning" 
                data-dismiss="modal"
                onClick={e => updateDescription(e)}
              >
                Edit
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                data-dismiss="modal"
                onClick={() => setDescription(merch.description)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditMerch;
