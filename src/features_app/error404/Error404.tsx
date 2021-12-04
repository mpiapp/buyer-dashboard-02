import {
    Container,
    CssBaseline,
    Stack,
    Button
} from '@mui/material';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import notfound from '../../assets/img/notfound.svg'

const Error404 = () => {

    return (
    <>
      <Navbar/>

      <div className="container-height">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
            <Stack sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="img-notfound">
                  <img alt="notfound" src={notfound} />
                </div>
                <div className="text-notfound">
                  <h1>Page Not Found </h1>
                  <Button 
                    variant="contained"
                    href="/"
                    size="small"
                  >Back to home</Button>
                </div>
                
            </Stack>
        </Container>
      </div>
      <Footer/>
    </>
    )
}

export default Error404;
