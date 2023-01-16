import axios from "axios"

const handler = async (req, res) => {
    if (req.method != 'GET') {
        return res.status(400).send('Bad request')
    }

    const count = await axios.get('https://api.justinthecloud.dev/get_visitors', { headers: { 'X-API-Key': process.env.API_KEY } })

    return res.status(200).send(count.data)
}

export default handler