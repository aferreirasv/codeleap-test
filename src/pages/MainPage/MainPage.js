import { Typography, Paper, TextField, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import "./MainPage.css";
import TextButton from "../../components/TextButton/TextButton";
import Post from "../../components/Post/Post";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const MainPage = (props) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      title: "Lorem Ipsum 0",
      author: "Alan",
      timestamp: new Date("2023-07-31T20:04:00"),
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit risus sed tempor porta. Mauris volutpat diam mauris, sit amet malesuada leo congue eget.",
    },
    {
      title: "Lorem Ipsum 1",
      author: "Renan",
      timestamp: new Date("2023-07-31T17:44:00"),
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit risus sed tempor porta. Mauris volutpat diam mauris, sit amet malesuada leo congue eget.",
    },
    {
      title: "Lorem Ipsum 2",
      author: "Renan",
      timestamp: new Date("2023-07-31T15:44:00"),
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit risus sed tempor porta. Mauris volutpat diam mauris, sit amet malesuada leo congue eget.",
    },
  ]);

  return (
    <>
      <div className="MainPageRoot">
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
            <IconButton
              aria-label="logout"
              onClick={() => {
                navigate("/signup");
              }}
            >
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
                  <TextField placeholder="Hello World" fullWidth size="small" />
                </div>
                <div className="MainPageInputContainer">
                  <Typography align="left" variant="body2">
                    Content
                  </Typography>
                  <TextField
                    placeholder="Content Here"
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
                    onClick={null}
                  />
                </div>
              </div>
            </Paper>
          </div>
          <div>
            <InfiniteScroll
              dataLength={posts.length} //This is important field to render the next data
              next={() => {}}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              // below props only if you need pull down functionality
              refreshFunction={() => {}}
              pullDownToRefresh
              pullDownToRefreshThreshold={50}
              pullDownToRefreshContent={
                <h3 style={{ textAlign: "center" }}>
                  &#8595; Pull down to refresh
                </h3>
              }
              releaseToRefreshContent={
                <h3 style={{ textAlign: "center" }}>
                  &#8593; Release to refresh
                </h3>
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
