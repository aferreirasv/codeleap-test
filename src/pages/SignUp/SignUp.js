import "./SignUp.css";
import { useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleUsername = (e) => {
    setInputValue(e.currentTarget.value);
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    navigate("/");
  };
  return (
    <>
      {false ? <Navigate to="/" /> : null /* Check if user is logged in*/}
      <div className="SignUp">
        <Paper sx={{ width: "90vw", maxWidth: "500px" }}>
          <div className="SignUpCard">
            <div className="SignUpHeader">
              <Typography
                variant="body1"
                align="start"
                sx={{ fontWeight: "800" }}
              >
                Welcome to CodeLeap network!
              </Typography>
            </div>
            <div>
              <Typography align="start">Please enter your username</Typography>
              <TextField
                placeholder="John Doe"
                value={inputValue}
                onChange={handleUsername}
                fullWidth
                size="small"
              />
            </div>
            <div className="SignUpButtonContainer">
              <div />
              <Button
                variant="contained"
                disabled={!inputValue}
                sx={{ right: "0px", width: "25%" }}
                size="small"
                onClick={handleSubmit}
              >
                <Typography
                  variant="body"
                  color={"white"}
                  sx={{ fontWeight: "600" }}
                >
                  Enter
                </Typography>
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default SignUp;
