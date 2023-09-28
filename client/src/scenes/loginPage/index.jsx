import { Box, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import './index.css';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const imgStyle = {
    display: isNonMobileScreens ? 'block' : 'none',
  };
  return (
      <Box className="loginPage">
        
      <Box 
      className="leftBox"
      >
      <img src={process.env.PUBLIC_URL + "/preview.png"} 
      alt="Preview"
      style={imgStyle}
       />
      </Box>
      <Box
        width={isNonMobileScreens ? "27%" : "60%"}
        height={isNonMobileScreens ? "83%" : "110%"}
        fontSize={isNonMobileScreens ? "20px" : "25px"}
        backgroundColor={theme.palette.background.alt}
        className="rightBox"
      >
        <h1>@PIXEO</h1>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
