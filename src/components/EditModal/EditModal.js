import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import TextButton from "../TextButton/TextButton";
import "./EditModal.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTitle, updateContent } from "../../redux/editPost";
import PostForm from "../PostForm/PostForm";

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
        <PostForm
          onContentChange={handleEditContentChange}
          onTitleChange={handleEditTitleChange}
          titleValue={editPost.title}
          contentValue={editPost.content}
        />
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
