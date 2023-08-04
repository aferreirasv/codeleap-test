import "./MainPage.css";
import {
  Typography,
  Paper,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  patchPost,
  deletePost,
  listPosts,
  loadPage,
  createPost,
} from "../../actions/api/api";
import { useSelector, useDispatch } from "react-redux";
import { update as updateUsername } from "../../redux/username";
import { update as updateEditPost } from "../../redux/editPost";
import { Navigate } from "react-router-dom";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import EditModal from "../../components/EditModal/EditModal";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import Post from "../../components/Post/Post";
import PostForm from "../../components/PostForm/PostForm";
import TextButton from "../../components/TextButton/TextButton";

const MainPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username.value);
  const editedPost = useSelector((state) => state.editPost.value);
  const [posts, setPosts] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [focusPost, setFocusPost] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(false);
  const smoothScroll = (y) => {
    if (y > 0) {
      return setTimeout(() => {
        window.scrollTo(0, y);
        smoothScroll(y - scrollPosition / 10);
      }, 10);
    }
    window.scrollTo(0, 0);
  };
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };
  const handleScrollButton = () => {
    const smoothThreshold = 10000;
    setScrollPosition(0);
    if (scrollPosition > smoothThreshold) {
      return window.scrollTo(0, 0);
    }
    smoothScroll(scrollPosition);
  };
  const handleNewPostChange = (e) => {
    setNewPost((prev) => {
      let post = Object.assign({}, prev);
      post[e.target.name] = e.target.value;
      return post;
    });
  };
  const handleNewPostSubmit = async (e) => {
    try {
      let data = newPost;
      data.username = username;
      await createPost(data);
      fetchPosts();
      setNewPost({ title: "", content: "" });
      setSnackbarMessage("Your post has been created!");
    } catch (e) {
      console.error(e);
      setSnackbarMessage("There was an error trying to create your post.");
      setError(true);
    }
  };
  const handleLogout = () => {
    dispatch(updateUsername(""));
    localStorage.clear();
    navigate("/signup");
  };
  const fetchPosts = async () => {
    try {
      let response = await listPosts();
      setPosts(response.data.results);
      setNextPage(response.data.next);
    } catch (e) {
      console.error(e);
      setSnackbarMessage("There was an error communicating with the server.");
      setError(true);
    }
  };
  const loadNextPage = async (page) => {
    try {
      let response = await loadPage(page);
      setPosts([...posts, ...response.data.results]);
      setNextPage(response.data.next);
    } catch (e) {
      console.error(e);
      setSnackbarMessage("There was an error communicating with the server.");
      setError(true);
    }
  };
  const handleDeleteClose = () => {
    setFocusPost(null);
    setDeleteOpen(false);
  };
  const handleDeleteOpen = (e, post) => {
    setFocusPost(post);
    setDeleteOpen(true);
  };
  const handleDelete = async (e) => {
    try {
      await deletePost(focusPost.id);
      fetchPosts();
      handleDeleteClose();
      setSnackbarMessage("Your post has been deleted.");
    } catch (e) {
      console.error(e);
      setSnackbarMessage("There was an error communicating with the server.");
      setError(true);
    }
  };
  const handleEditClose = (e) => {
    dispatch(updateEditPost({ title: "", content: "" }));
    setFocusPost(null);
    setEditOpen(false);
  };
  const handleEditOpen = (e, post) => {
    dispatch(updateEditPost({ title: post.title, content: post.content }));
    setFocusPost(post);
    setEditOpen(true);
  };
  const handleEdit = async (e) => {
    try {
      await patchPost(focusPost.id, editedPost);
      fetchPosts();
      handleEditClose();
      setSnackbarMessage("Your post has been edited.");
    } catch (e) {
      console.error(e);
      setSnackbarMessage("There was an error communicating with the server.");
      setError(true);
    }
  };
  const handleSnackbarClose = (e) => {
    setSnackbarMessage("");
    setError(false);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {username === "" ? <Navigate to="/signup" /> : null}
      <div className="ModalParent">
        <EditModal
          open={editOpen}
          handleClose={handleEditClose}
          handleEdit={handleEdit}
          post={focusPost}
        />
        <DeleteModal
          open={deleteOpen}
          handleClose={handleDeleteClose}
          handleDelete={handleDelete}
        />
      </div>
      <div className="MainPageRoot">
        {scrollPosition > 300 ? (
          <div className="ScrollUpButtonContainer">
            <Button
              variant="contained"
              startIcon={<ArrowUpwardIcon sx={{ color: "white" }} />}
              onClick={handleScrollButton}
            >
              <Typography
                variant="body"
                color={"white"}
                sx={{ fontWeight: "600" }}
              >
                Back to start
              </Typography>
            </Button>
          </div>
        ) : null}
        <header className="MainPageHeader">
          <Typography
            variant="body1"
            align="left"
            sx={{ fontWeight: "600" }}
            color="white"
          >
            CodeLeap Network
          </Typography>
          <div className="HeaderButtons">
            <IconButton aria-label="logout" onClick={handleLogout}>
              <LogoutIcon sx={{ color: "white" }} />
            </IconButton>
          </div>
        </header>
        <div className="MainPageContent">
          <Snackbar
            open={snackbarMessage !== ""}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={error ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <div className="MainPageNewPostContainer">
            <Paper
              sx={{
                width: "90vw",
                maxWidth: "1080px",
                border: "1px solid",
                borderColor: "#cacaca",
              }}
            >
              <div className="MainPageNewPostForm">
                <Typography
                  variant="body1"
                  align="left"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  What's on your mind?
                </Typography>
                <PostForm
                  onContentChange={handleNewPostChange}
                  onTitleChange={handleNewPostChange}
                  titleValue={newPost.title}
                  contentValue={newPost.content}
                />
                <div className="MainPageCreateButtonContainer">
                  <div />
                  <TextButton
                    disabled={!(newPost.title && newPost.content)}
                    text="Create"
                    color="primary"
                    onClick={handleNewPostSubmit}
                  />
                </div>
              </div>
            </Paper>
          </div>
          <div>
            <InfiniteScroll
              dataLength={posts.length}
              next={() => loadNextPage(nextPage)}
              hasMore={true}
              loader={<LoadingIcon />}
              endMessage={<Typography>We're out of posts 😞</Typography>}
            >
              {posts.map((post) => {
                return (
                  <div className="MainPagePostList">
                    <Post
                      key={post.id}
                      post={post}
                      user={username}
                      handleEditOpen={(e) => handleEditOpen(e, post)}
                      handleDeleteOpen={(e) => handleDeleteOpen(e, post)}
                    />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
