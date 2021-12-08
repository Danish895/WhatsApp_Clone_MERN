

import user from "../model/user.js";


export const addUser = async (request, response) => {
    try {
        let exist = await user.findOne({ googleId : request.body.googleId});

            if(exist){
                response.status(200).json('user already exist');
                return;
            }

        const newUser = new user(request.body);
        await newUser.save();
        console.log('new user is added successfully');
    } catch (error) {
        console.log('error while adding new user', error); 
    }
} 

export const getUsers = async (request, response) => {
    try{
         const users = await user.find({});
         response.status(200).json(users);


    }catch(error){
        response.status(500).json(error)
    }


}