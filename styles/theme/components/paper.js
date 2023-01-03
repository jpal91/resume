import colors from "../base/colors"
import boxShadows from '../base/boxShadows'

const { lightBlue, background } = colors

const paper = {
    variants: [
        {
            props: { variant: 'downButton' },
            style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',
                width: '100px',
                backgroundColor: background.default,
                borderRadius: '100%',
                borderColor: lightBlue[200],
                borderStyle: 'solid',
                borderWidth: '5px',
                boxShadow: boxShadows.lg
            }
        }
    ]
}

export default paper