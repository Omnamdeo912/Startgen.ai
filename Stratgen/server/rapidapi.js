const axios = require('axios');

async function rapidres() {
    const options = {
        method: 'POST',
        url: 'https://llm19.p.rapidapi.com/chat',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '209c7976d8msh4d249626b9de515p1486b4jsn4a1acf0131ad',
            'X-RapidAPI-Host': 'llm19.p.rapidapi.com'
        },
        data: {
            chatid: '',
            role: 'You are a Helpful Assistant.',
            message: 'Hello! How are you?'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

rapidres();
