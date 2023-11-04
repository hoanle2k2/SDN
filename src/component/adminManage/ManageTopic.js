import { Box, Container, Typography } from "@mui/material";
import TopicTable from "./TopicTable";

const ManageTopic = () => {
  const rows = [
    { topicname: "Công Nghệ", status: true },
    { topicname: "Kinh Tế", status: true },
  ];
  return (
    <Container
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        marginTop: 10,
        marginLeft: 35,
      }}
    >
      <Box>
        <Typography variant="h4">Topics</Typography>
        <Typography variant="h6" sx={{ color: "#918282" }}>
          Home/Topics
        </Typography>
      </Box>
      <Box sx={{ marginTop: "50px" }}>
        <TopicTable rows={rows} />
      </Box>
    </Container>
  );
};

export default ManageTopic;
