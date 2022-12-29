import { useRef, useEffect } from 'react'
import Typed from 'react-typed'
import Typography from "@mui/material/Typography";

const Bash = (props) => {
    const { strings, setState, tState, output, order } = props
    const tRef = useRef()

    useEffect(() => {
        console.log(tState)
        if (order != tState) {
            return
        }
        console.log(tRef.current)
        tRef.current.cursorBlinking = true
		setTimeout(() => tRef.current.start(), 1000)
    }, [tState])

    return (
        <>
        <Typography variant='h1' sx={{ display: tState < order ? 'none' : ''}}>
            <span>$ </span>
            <Typed 
                typedRef={(typed) => tRef.current = typed}
                strings={strings}
                typeSpeed={50}
                stopped
                onStringTyped={ () => {
                    setTimeout(() => {
                        setState(tState + 1)
                        tRef.current.cursor.hidden = true
                    }, 2000)
                }}
            />
        </Typography>
        <Typography variant='h1' sx={{ display: tState <= order ? 'none' : ''}}>{output}</Typography>
        </>
    )
}

export default Bash