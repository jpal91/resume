import axios from "axios"

const handler = async (req, res) => {
    if (req.method != 'GET') {
        return res.status(400).send('Bad request')
    }

    const count = await axios.get(`${process.env.API_URL}/get_visitors`)

    return res.status(200).send(count.data)
}

export default handler