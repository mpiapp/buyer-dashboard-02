import { Button, CircularProgress } from '@mui/material'

function ButtonLoading({loading, name, type} : any) {
    return (
        <div>
            <Button 
                color="success" 
                variant="contained" 
                type={type}
                fullWidth
            >
                { loading ? 
                <div className="loading-button"> 
                    <p>Loading</p>  
                    <CircularProgress size={20} />
                </div> : name
                }
            </Button>
        </div>
    )
}

export default ButtonLoading
