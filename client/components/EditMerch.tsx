import React, { Fragment, useState } from "react";
import { getErrorMessage } from "@/utils/utilFunctions";
import CustomModal from "@/components/Modal";

const EditMerch = ({ merch }: any) => {
  const [description, setDescription] = useState<string>(merch.description);

  // Edit description function
  const updateDescription = async () => {
    try {
      const body = { description };
      await fetch(`http://localhost:3001/admin/admin-merch/${merch.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Optionally, you can update state or perform other actions here

      // Close the modal
      handleCloseModal();
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
    // Optionally, you can reset state or perform other actions here
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

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={updateDescription}
      >
        <div className="modal-header">
          <h4 className="modal-title">Edit Merch</h4>
        </div>

        <div className="modal-body">
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-warning"
            onClick={updateDescription}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </CustomModal>
    </Fragment>
  );
};

export default EditMerch;