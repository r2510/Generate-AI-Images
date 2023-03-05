function onSubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    //initialized both parameters
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;
    const number = document.querySelector('#number').value;

    if(prompt === ''){
        alert('Please add some text');
        return;
    }
    

    generateImageRequest(prompt, size, number);
    
}
async function generateImageRequest(prompt, size, number){
    try {
        showSpinner();

        //calling backend which is setup using express.
        const response = await fetch('/openai/generateimage',{
            method : 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({prompt, size, number})
        });

        if(!response.ok){
            removeSpinner();
            throw new Error('This image could not be generated');
        }

        // const generatedUrl = await response.json();
        // console.log(generatedUrl);
        // const imageUrl = generatedUrl.data;
        // document.querySelector('#image').src = imageUrl;

       

        const generatedUrls = await response.json();
        console.log('generatedUrls', generatedUrls);
        const imageList = document.querySelector('#image-list');
        imageList.innerHTML = ''; // Clear the previous images
    
        for (const imageUrl of generatedUrls.data) {
          const img = document.createElement('img');
          img.src = imageUrl.url;
          imageList.appendChild(img);
        }

        removeSpinner();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }

}
function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}
function removeSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);