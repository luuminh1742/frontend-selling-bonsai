
const GetBase64Image = (e) => {
    let result = {
        FileName: '',
        Base64: ''
    }
    let file = null;
    file = e.target.files[0];


    return new Promise((resolve,reject) => {
        if (file === null) reject('No Image');
        result.FileName = file.name;

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            result.Base64 = e.target.result;
            resolve(result);
        }
    });

}

export default GetBase64Image