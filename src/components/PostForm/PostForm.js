import { Typography, TextField } from "@mui/material";
import "./PostForm.css";

const PostForm = ({
  onContentChange,
  onTitleChange,
  titleValue,
  contentValue,
}) => {
  return (
    <>
      <div className="PostFormInputContainer">
        <Typography align="left" variant="body2">
          Title
        </Typography>
        <TextField
          name="title"
          placeholder="Hello World"
          fullWidth
          size="small"
          value={titleValue}
          onChange={onTitleChange}
        />
      </div>
      <div className="PostFormInputContainer">
        <Typography align="left" variant="body2">
          Content
        </Typography>
        <TextField
          name="content"
          placeholder="Content Here"
          value={contentValue}
          onChange={onContentChange}
          fullWidth
          rows={3}
          multiline
        />
      </div>
    </>
  );
};

export default PostForm;
