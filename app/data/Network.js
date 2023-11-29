

export const loginUser = async(email,pwd) => {
    try{
        const data = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, pwd }),
        });

        const result = await data.json();
        return result;
    }
    catch(error){
        return {
            status: false,
            data: null,
            msg: "Error"+error.msg
        };
    }
};

export const registerUser = async(name,email,pwd,role) => {

}