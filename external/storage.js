/* import moralis */
const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = "https://6o0uhc1tjdof.usemoralis.com:2053/server";
const appId = "JObzTHomTcKQBDDM0Q7rtbntwrSivRWdmBFxrz7x";
const masterKey = "2NjDAEvcpHULzNp8UoysDx55cAW96p9DHbkZWaSK";

await Moralis.start({ serverUrl, appId, masterKey });

login = async () => {
    Moralis.authenticate().then(function(user) {
        console.log(user.get('ethAddress'))
    })
}

uploadImage = async () => {
    // Save file input to IPFS
    const data = fileInput.files[0];
    const file = new Moralis.File(data.name, data);
    await file.saveIPFS();
    console.log(file.ipfs(), file.hash())
    return file.ipfs()
}
//upload metadata

uploadMetadata = async(imageUrl) => {
const name = "name";
const description = "description";

const metadata = {
    "name": name,
    "description": description,
    "image": imageUrl
}

const file2 = new Moralis.File("file.json", { base64: btoa(JSON.stringify(metadata)) });
file.saveIPFS();

console.log(file.ipfs());
}

gogogo = async () => {
    const image = await uploadImage();
    await uploadMetadata(image)
}