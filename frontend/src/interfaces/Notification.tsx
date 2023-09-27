import { AlertColor } from "@mui/material";

export interface INotification {
  message: string;
  open: boolean;
  type: AlertColor;
}
