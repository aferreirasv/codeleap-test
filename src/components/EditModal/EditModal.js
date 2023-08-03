import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
} from "@mui/material";
import TextButton from "../TextButton/TextButton";
import "./EditModal.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTitle, updateContent } from "../../redux/editPost";

const EditModal = ({ open, handleClose, handleEdit, post }) => {
  const editPost = useSelector((state) => state.editPost.value);
  const dispatch = useDispatch();

  const handleEditTitleChange = (e) => {
    dispatch(updateTitle(e.target.value));
  };
  const handleEditContentChange = (e) => {
    dispatch(updateContent(e.target.value));
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit item</DialogTitle>
      <DialogContent>
        <div className="EditModalInputContainer">
          <Typography align="left" variant="body2">
            Title
          </Typography>
          <TextField
            name="title"
            placeholder="Hello World"
            fullWidth
            size="small"
            value={editPost.title}
            onChange={handleEditTitleChange}
          />
        </div>
        <div className="EditModalInputContainer">
          <Typography align="left" variant="body2">
            Content
          </Typography>
          <TextField
            name="content"
            placeholder="Content Here"
            value={editPost.content}
            onChange={handleEditContentChange}
            fullWidth
            rows={3}
            multiline
          />
        </div>
      </DialogContent>
      <DialogActions>
        <div className="EditModalActions">
          <div />
          <TextButton disabled={false} text="Cancel" onClick={handleClose} />
          <TextButton
            onClick={handleEdit}
            disabled={false}
            text="Save"
            color="green"
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
