import {
  Typography,
  Paper,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./MainPage.css";
import TextButton from "../../components/TextButton/TextButton";
import Post from "../../components/Post/Post";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { listPosts, loadPage } from "../../actions/api/list";
import { createPost } from "../../actions/api/create";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../redux/username";
import { Navigate } from "react-router-dom";

const MainPage = (props) => {
  const username = useSelector((state) => state.username.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
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
    } catch (e) {
      console.error(e);
    }
  };
  const handleLogout = () => {
    dispatch(update(""));
    navigate("/signup");
  };
  const fetchPosts = async () => {
    try {
      let response = await listPosts();
      setPosts(response.data.results);
      setNextPage(response.data.next);
    } catch (e) {
      console.error(e);
    }
  };

  const loadNextPage = async (page) => {
    try {
      let response = await loadPage(page);
      setPosts([...posts, ...response.data.results]);
      setNextPage(response.data.next);
    } catch (e) {
      console.error(e);
    }
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
                <div className="MainPageInputContainer">
                  <Typography align="left" variant="body2">
                    Title
                  </Typography>
                  <TextField
                    name="title"
                    placeholder="Hello World"
                    fullWidth
                    size="small"
                    value={newPost.title}
                    onChange={handleNewPostChange}
                  />
                </div>
                <div className="MainPageInputContainer">
                  <Typography align="left" variant="body2">
                    Content
                  </Typography>
                  <TextField
                    name="content"
                    placeholder="Content Here"
                    value={newPost.content}
                    onChange={handleNewPostChange}
                    fullWidth
                    rows={3}
                    multiline
                  />
                </div>
                <div className="MainPageCreateButtonContainer">
                  <div />
                  <TextButton
                    disabled={false}
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
              dataLength={posts.length} //This is important field to render the next data
              next={() => loadNextPage(nextPage)}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {posts.map((post) => {
                return (
                  <div className="MainPagePostList">
                    <Post post={post} user={"Alan"} />
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
