import { useRef, useEffect, useState } from "react";
import Typed from "react-typed";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";

import { controller } from "../../actions";



const MLCommand = (props) => {
	const { contState, fWidth, contType, controller, values, stage, matches } = props;
    const [complete, setComplete] = useState(false)
	const tRef = useRef([]);
    const [stringMap, setStringMap] = useState()

    useEffect(() => {
        if (contState != stage) return

        tRef.current.forEach((e) => {
            setTimeout(() => e.start(), 3000);
        })

    }, [contState])

    useEffect(() => {
        setStringMap(values.split('\n'))
    }, [])

    useEffect(() => {
        if (!complete) return

        const timeout = setTimeout(() => {
            controller(contType, stage + 1)
            setComplete(false)
        },100)

        return () => {
            clearTimeout(timeout)
        }

    }, [complete])

	return (
        <>
            {stringMap && stringMap.map((e, i) => {

            return (
                <Typography
                key={`ml-line-${i}`}
                variant="h1"
                sx={{
                    display: contState < stage ? "none" : "",
                    // fontSize: matches || !fWidth ? "16px" : "32px",
                    fontSize: '16px',
                    my: 0,
                    whiteSpace: 'pre-wrap',
                    color: 'lightBlue.200'
                }}
                >
                <Typed
                    key={`ml-line-${i}`}
                    typedRef={(typed) => tRef.current[i] = typed}
                    strings={[e]}
                    typeSpeed={25}
                    backSpeed={50}
                    backDelay={20}
                    stopped
                    smartBackspace
                    onComplete={() => {
                        tRef.current[i].cursor.hidden = true;
                        setTimeout(() => {
                            // controller(contType, contState + 1);
                            setComplete(true)
                            
                        }, 2000);
                    }}
			    />
                </Typography>
            )
        })}
        </>
	);
};

export default connect(null, { controller })(MLCommand);