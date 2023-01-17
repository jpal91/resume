import axios from "axios"

const handler = async (req, res) => {
    if (req.method != 'POST') {
        return res.status(400).send('Bad request')
    }
    
    const response = await axios.patch('https://api.justinthecloud.dev/add_visitors', { headers: { 'X-API-Key': process.env.API_KEY } })

    return res.status(200).send(response.data)
}

export default handler