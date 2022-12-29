import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import Bash from './Bash'

const Terminal = (props) => {
    const [typeState, setTypeState] = useState(0)
    
    useEffect(() => {
		setTypeState(1)
	}, [])
    
    return (
        <Card 
            raised={true}
            sx={{ 
                width: { xs: '100%', xl: '75%'}, 
                display: 'flex', 
                flexDirection: 'column',
                backgroundColor: 'primary.dgrey',
                minHeight: { xs: '200px', xl: '260px' },
                mt: 2,
                borderRadius: '8px'
            }}
        >
            <CardHeader sx={{ backgroundColor: 'primary.lgrey' }}></CardHeader>
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