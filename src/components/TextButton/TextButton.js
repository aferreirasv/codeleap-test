import { Button, Typography } from "@mui/material";

const TextButton = ({ disabled, color, onClick, text }) => {
  return (
    <Button
      variant={color ? "contained" : "outlined"}
      disabled={disabled}
      sx={{ width: "clamp(60px, 25%, 150px)" }}
      size="small"
      onClick={onClick}
      color={color ? color : "black"}
    >
      <Typography
        variant="body"
        color={disabled ? "light-gray" : color ? "white" : "black"}
        sx={{ fontWeight: "600" }}
      >
        {text}
      </Typography>
    </Button>
  );
};

export default TextButton;
