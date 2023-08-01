import "./SignUp.css";
import { useState } from "react";
import { Paper, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import TextButton from "../../components/TextButton/TextButton";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../redux/username";

const SignUp = (props) => {
  const [inputValue, setInputValue] = useState("");
  const username = useSelector((state) => state.username.value);
  const dispatch = useDispatch();

  const handleUsername = (e) => {
    setInputValue(e.currentTarget.value);
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    dispatch(update(inputValue));
    navigate("/");
  };
  return (
    <>
      {
        username !== "" ? (
          <Navigate to="/" />
        ) : null /* Check if user is logged in*/
      }
      <div className="SignUp">
        <Paper sx={{ width: "90vw", maxWidth: "500px" }}>
          <div className="SignUpCard">
            <div className="SignUpHeader">
              <Typography
                variant="body1"
                align="start"
                sx={{
                  fontWeight: "800",
                }}
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
              <TextButton
                disabled={!inputValue}
                text="Enter"
                onClick={handleSubmit}
                color="primary"
              />
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default SignUp;
