import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Spinner = (props: CircularProgressProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress {...props} />
    </Box>
  );
};

export default Spinner;
