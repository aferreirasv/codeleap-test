import {
  IconButton,
  Card,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TimeHelper from "../../actions/utils/TimeHelper";
import "./Post.css";

const Post = ({ post, user }) => {
  return (
    <Card
      sx={{
        width: "90vw",
        maxWidth: "1080px",
        border: "1px solid",
        borderColor: "#cacaca",
        borderRadius: "clamp(5px, 15px, 20px);",
      }}
    >
      <CardHeader
        action={
          post.author === user ? (
            <>
              <IconButton>
                <DeleteForeverIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton>
                <EditNoteIcon sx={{ color: "white" }} />
              </IconButton>
            </>
          ) : null
        }
        title={post.title}
        titleTypographyProps={{
          color: "white",
          fontWeight: 700,
          fontSize: "1.2rem",
          align: "left",
        }}
        color="primary"
        sx={{ backgroundColor: "#7696ed" }}
      />
      <CardContent>
        <div className="PostInfo">
          <Typography>{"@" + post.author}</Typography>
          <Typography>{TimeHelper(post.timestamp)}</Typography>
        </div>
        <div>
          <Typography align="left">{post.content}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;
