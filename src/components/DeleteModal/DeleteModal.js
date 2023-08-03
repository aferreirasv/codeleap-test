import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import TextButton from "../TextButton/TextButton";
import "./DeleteModal.css";

const DeleteModal = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-dialog-title"
    >
      <DialogTitle id="delete-dialog-title">
        Are you sure you want to delete this item?
      </DialogTitle>
      <DialogActions>
        <div className="DeleteModalActions">
          <div />
          <TextButton
            disabled={false}
            text="Cancel"
            onClick={handleClose}
            autoFocus
          />
          <TextButton
            onClick={handleDelete}
            disabled={false}
            text="Delete"
            color="red"
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
