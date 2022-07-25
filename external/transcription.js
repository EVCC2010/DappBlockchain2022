const axios = require("axios");
  
const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: "4f70ca09ebcf4350b5a4800bbb525caf",
        "content-type": "application/json",
    },
});
assembly
    .post("/transcript", {
        audio_url: "https://bit.ly/3yxKEIY"
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
    
assembly
    .get(`/transcript/${YOUR-TRANSCRIPT-ID-HERE}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
