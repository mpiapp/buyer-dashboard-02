import { 
    Box,
    Link
} from '@mui/material';

const Footer = () => {
    return (
        <div className="container-footer">
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: '#e8f0f5'
                }} 
            >
                <div className="global-container">
                    <div className="copyright-text"> 
                        <Link color="inherit" href="/">
                            PT Manajemen Pemesanan Indonesia
                        </Link>{' '}
                        <p> Copyright © {new Date().getFullYear()}</p>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default Footer
