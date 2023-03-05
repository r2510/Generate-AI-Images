const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) =>{
    const {prompt, size, number} = req.body;//postman request
    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        const response = await openai.createImage({
            // prompt : 'Polar bear on ice skates',//message to request hardcoded
            prompt,
            n:parseInt(number),//no of images hardcoded
            // size:'512x512'//size of image hardcoded
            size : imageSize
    });
    const image_url = response.data.data[0].url;

    // res.status(200).json({
    //     success:true,
    //     data:image_url
    // });
    res.status(200).json(response.data);

    } catch (error) {

        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        res.status(400).json({
            success:false,
            error:'Unable to load data'
        });
    }
}

module.exports = { generateImage};