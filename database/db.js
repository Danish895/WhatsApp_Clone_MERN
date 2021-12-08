import mongoose from 'mongoose';


const connection = async(username, password) => {
    const URL = `mongodb+srv://${username}:${password}@chatapp.gy1ui.mongodb.net/WHATSAPPCLONE?retryWrites=true&w=majority`;
    try{

    await mongoose.connect(URL, {useUnifiedTopology :true, useNewUrlParser : true});
    console.log('Database connected sucessfully');

    }
    catch(error){
        console.log('Error while connecting database', error);
    }
}

export default connection;