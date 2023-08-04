import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
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
      <DialogTitle>
        <Typography
          variant="body1"
          align="left"
          sx={{
            fontWeight: "700",
          }}
        >
          Edit item
        </Typography>
      </DialogTitle>
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
          <div className="EditModalButtonContainer">
            <div className="EditModalButton">
              <TextButton
                disabled={false}
                text="Cancel"
                onClick={handleClose}
              />
            </div>
            <div className="EditModalButton">
              <TextButton
                onClick={handleEdit}
                disabled={!(editPost.title && editPost.content)}
                text="Save"
                color="green"
              />
            </div>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
