
export const setSplash = (int) => {
    return { type: 'SET_SPLASH', payload: int }
}

export const controller = (type, int) => {

    switch (type) {
        case 'splash':  
            return { type: 'SET_SPLASH', payload: int }
        case 'skills':
            
            return { type: 'SET_SKILLS', payload: int }
    }
}