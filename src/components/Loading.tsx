import { Box } from "@chakra-ui/react";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function Loading() {
  return (
    <Box
      height="100vh"
      bg="#FFF"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <PropagateLoader color={"#011F78"} size={'14px'} />
    </Box>
  );
}
