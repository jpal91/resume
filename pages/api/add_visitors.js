import axios from "axios"

const handler = async (req, res) => {
    if (req.method != 'POST') {
        return res.status(400).send('Bad request')
    }

    const response = await axios.patch(`${process.env.API_URL}/add_visitors`)

    return res.status(200).send(response.data)
}

export default handler