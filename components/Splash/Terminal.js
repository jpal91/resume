import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import Bash from './Bash'
import boxShadows from '../../styles/theme/base/boxShadows'

const Terminal = () => {
    const [typeState, setTypeState] = useState(0)
    
    useEffect(() => {
		setTypeState(1)
	}, [])
    
    return (
        <Card 
            raised={true}
            sx={{ 
                width: { xs: '100%', sm: "75%", md: '75%', lg: '75%', xl: '75%'}, 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: 'grey.800',
                minHeight: { xs: '200px', sm: '200px', md: '260px', lg: '260px', xl: '260px' },
                mt: 2,
                borderRadius: '8px',
                border: `${1 / 16}rem solid rgba(0, 0, 0, 0.125)`,
                // boxShadow: boxShadows.md
            }}
        >
            <CardHeader sx={{ backgroundColor: 'grey.400' }}></CardHeader>
            <CardContent>
                <Bash 
                    strings={[' cat names.txt | grep $MY_NAME | echo']}
                    setState={setTypeState}
                    tState={typeState}
                    output={'Hello, my name is Justin'}
                    order={1}
                />
                <Bash 
                    strings={['echo $MY_GREETING']}
                    setState={setTypeState}
                    tState={typeState}
                    output={'Welcome to my Resume'}
                    order={2}
                />
            </CardContent>
		</Card>
    )
}

export default Terminal