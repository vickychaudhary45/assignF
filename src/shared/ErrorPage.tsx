import { Typography } from "@mui/material";
import { images } from '../config/images';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';

const Error404 = () => {
   return (
      <div>
         <Box className="error_box"> </Box>
         <div className="wrapper">
            <div className="error_image">
               <img src={images.error_404} height={300} width={300}></img>
            </div>
            <div className="content_error">
               <Typography className="error_msg_404" fontSize={30}><b>404 Not Found</b></Typography>
               <Typography>Sorry, We can't find the page you are looking for. It might have been removed or it is temporarily unavailable.</Typography><br />
               <button onClick={() => { window.location.href = `/login` }} className="btn-error">
                  <ArrowBackIcon className="back_icon"></ArrowBackIcon>&nbsp;
                  <Typography className="typo_error">Back to Home</Typography></button>
            </div>
         </div>
      </div>
   )
}
export default Error404;