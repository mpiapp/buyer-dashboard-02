import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { IStatistic } from './cardStatisticTypes'

const CardStatistic : React.FC<IStatistic> = ({
    label, value, currency, background, status
}) => {
    return (
        <div>
            <Paper elevation={3} sx={{ backgroundColor: background ? background : '#fff' }}>
                { status ?
                <Box pl={2} pr={2} className="card-statistic-status">
                    <div><h3>{label}</h3></div>
                    <div><h1>{value}</h1></div>
                </Box>
                :
                <Box p={3} className="card-statistic">
                    <h3>{label}</h3>
                    {!currency ? 
                    <h2>{value}</h2> :
                    <h2>Rp. {value.toLocaleString()}</h2>
                    }
                </Box>
                }
            </Paper>
        </div>
    )
}

export default CardStatistic
