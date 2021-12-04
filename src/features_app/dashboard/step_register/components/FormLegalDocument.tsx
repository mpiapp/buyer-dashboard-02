import React, { useState, useEffect } from 'react'
import {
    Button,
    Grid,
    Box,
    TextField,
    Backdrop,
    CircularProgress 
} from '@mui/material';
import { useDispatch } from 'react-redux'
import { changeStep } from '../stepRegisterSlice';

const legal_document = [
    {
        id: "sdfa",
        title: "Nomor Pokok Wajib Pajak",
        short_title : "NPWP",
    },
    {
        id: "asqwr",
        title: "Surat Ijin Usaha Perusahaan",
        short_title : "SIUP",
    }
]

const FormLegalDocument : React.FC<any> = ({
    profile
}) => {

      
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);

    const [legalDocState, setLegalDocState] = useState<any>([]);

    const onChangeValue = (event : any) => {
        let { name, value }  = event.target
        let copyState = [...legalDocState]
        if(copyState.find(element => element.short_title === name)) {
            copyState.find(el => el.short_title === name).value = value
            setLegalDocState(copyState)
        }
    }

    const onClickNext = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            localStorage.setItem('legal_document', JSON.stringify(legalDocState))
            dispatch(changeStep(2))
        }, 2000);
    }

    const proceedState = (value : any) => {
        let state = []
        for(const element of value) {
            state.push({
                id: element.id,
                title: element.title,
                short_title : element.short_title,
                value : "",
                url : "",
                error : false
            })
        }
        setLegalDocState(state)
    }

    useEffect(() => {
        const local_data = localStorage.getItem('legal_document')
        const checkLocalData = () => {
            const data : any = local_data === null ? null : JSON.parse(local_data)
            setLegalDocState(data)
        }
        if(local_data === null) {
            proceedState(legal_document)
        } else {
            checkLocalData()
        }
        // eslint-disable-next-line
    }, []);


    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            { profile ? null :
            <Box mt={2} pl={2} pb={2}>
                <h2>Legal Document Company </h2>
            </Box> }
           <div className="section-form-company-detail">
                <Box pl={2}>
                    {legalDocState?.map((val : any, i :any) => (
                        <Box key={i}>
                            <Grid container >
                                <Grid item xl={3} lg={4} xs={12}>
                                    <Box pt={2}><h4>{val.title}</h4></Box>
                                </Grid>
                                <Grid item xl={9} lg={8} xs={12}>
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        label={`Number ${val.title}`}
                                        name={val.short_title}
                                        size="small"
                                        onChange={onChangeValue}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid item xl={3} lg={4} xs={12}>
                                    <Box pt={2}><h4>Upload {val.short_title}</h4></Box>
                                </Grid>
                                <Grid item xl={9} lg={8} xs={12}>
                                    <TextField
                                        margin="dense"
                                        fullWidth
                                        type="file"
                                        name={val.short_title}
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                    
                    { profile ? 
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4, pb: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button 
                            variant="contained"
                        >
                            Save Change
                        </Button>
                    </Box> : 
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4, pb: 2 }}>
                        <Button
                            variant="contained"
                            color="inherit"
                            onClick={() => dispatch(changeStep(0))}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button 
                            variant="contained"
                            type="submit"
                            onClick={() => onClickNext()}
                        >
                            Next
                        </Button>
                    </Box> }
                </Box>
           </div>
        </div>
    )
}

export default FormLegalDocument
