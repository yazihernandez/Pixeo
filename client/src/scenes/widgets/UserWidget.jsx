import {
  ManageAccountsOutlined,
  EditOutlined,
  bioOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Modal, Button } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MyPostWidget from "scenes/widgets/MyPostWidget";



const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    Name,
    bio,
  } = user;

  

  return (
    <WidgetWrapper>

  {/* Home */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <bioOnOutlined fontSize="large" sx={{ color: main }} />
        </Box>
        <Box display="flex" alignItems="center" gap="1rem"
        sx={{
          "&:hover": {
            background: palette.primary.white,
            cursor: "pointer",
            borderRadius: "10px",
          },
        }}
        >
          <HomeIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Home</Typography>
        </Box>
      </Box>

      <Divider />

      {/* search */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <bioOnOutlined fontSize="large" sx={{ color: main }} />
        </Box>
        <Box display="flex" alignItems="center" gap="1rem"
         sx={{
          "&:hover": {
            background: palette.primary.white,
            cursor: "pointer",
            borderRadius: "10px",
          },
        }}>
          <SearchIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Search</Typography>
        </Box>
      </Box>

      <Divider />



      {/* Explore */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <bioOnOutlined fontSize="large" sx={{ color: main }} />
        </Box>
        <Box display="flex" alignItems="center" gap="1rem"
         sx={{
          "&:hover": {
            background: palette.primary.white,
            cursor: "pointer",
            borderRadius: "10px",
          },
        }}>
          <ExploreIcon fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Explore</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Create */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <bioOnOutlined fontSize="large" sx={{ color: main }} />
        </Box>
        <Box display="flex" alignItems="center" gap="1rem"
         sx={{
          "&:hover": {
            background: palette.primary.white,
            cursor: "pointer",
            borderRadius: "10px",
          },
        }}>
          <AddBoxIcon
            fontSize="large"
            sx={{ color: main, cursor: 'pointer' }}
            onClick={toggleModal}
          />
          <Typography color={medium}>Create</Typography>
        </Box>
      </Box>

      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '2rem',
            boxShadow: 24,
            borderRadius: '8px',
          }}
        >
          <Typography variant="h5">Create Post</Typography>
          <MyPostWidget picturePath={picturePath} />
          <Button onClick={toggleModal}>Close</Button>
        </Box>
      </Modal>


      <Divider />

      {/* Profile */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem"
        p={"20px 0 0 0"}>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              {Name}
            </Typography>
            <Typography color={medium}>{bio}</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

    </WidgetWrapper>
  );
};

export default UserWidget;
