import instance from "../api-instance";
const handleAPIPost = async(path,payload) =>{
    try {
        const response = await instance.post(path, payload);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response.data.msg);
    }
}

const handleAPIGet = async(path) =>{
    try {
        const response = await instance.get(path);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error.response.data.msg);
    }
}

export {handleAPIPost, handleAPIGet};