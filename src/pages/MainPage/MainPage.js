import { Typography, Paper, TextField, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import "./MainPage.css";
import TextButton from "../../components/TextButton/TextButton";
import { useNavigate } from "react-router-dom";

const MainPage = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="MainPageRoot">
        <header className="MainPageHeader">
          <Typography
            variant="body1"
            align="start"
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
                  align="start"
                  sx={{
                    fontWeight: "700",
                  }}
                >
                  What's on your mind?
                </Typography>
                <div className="MainPageInputContainer">
                  <Typography align="start" variant="body2">
                    Title
                  </Typography>
                  <TextField placeholder="Hello World" fullWidth size="small" />
                </div>
                <div className="MainPageInputContainer">
                  <Typography align="start" variant="body2">
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
          <div className="MainPagePostList">
            <Paper sx={{ width: "90vw", maxWidth: "500px" }}>
              TODO:list will be here
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
