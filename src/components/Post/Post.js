import {
  IconButton,
  Card,
  Typography,
  CardHeader,
  CardContent,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import timeHelper from "../../actions/utils/timeHelper";
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
          post.username === user ? (
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
          <Typography>{"@" + post.username}</Typography>
          <Typography>{timeHelper(new Date(post.created_datetime))}</Typography>
        </div>
        <div>
          <Typography align="left" sx={{ wordBreak: "break-all" }}>
            {post.content}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;
