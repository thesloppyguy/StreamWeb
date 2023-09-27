import { FC } from "react";
import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { INotification } from "../interfaces/Notification";

export const Notification: FC<
  INotification & {
    setOpen: (args: INotification) => void;
  }
> = ({ message, open, type = "info", setOpen }) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen({ open: false, message, type });
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        <div dangerouslySetInnerHTML={{ __html: message }} />
      </Alert>
    </Snackbar>
  );
};
