import { Button } from "@mui/material";

const ButtonComponent = ({
  title,
  background = "#000",
  color = "#fff",
  onClick,
  width = "150px",
}: {
  title: string;
  background?: string;
  color?: string;
  onClick?: () => void;
  width?: string;
}) => {
  return (
    <Button
      onClick={onClick}
      type="submit"
      sx={{
        padding: "10px 20px",
        background: background,
        color: color,
        width: width,
        "&:hover": {
          background: background,
          color: color,
        },
      }}
    >
      {title}
    </Button>
  );
};

export default ButtonComponent;
