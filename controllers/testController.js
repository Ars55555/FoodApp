const testUserController = (req,res) =>{
    try{
        res.status(200).send("<h1>Test user data</h1>")
    }catch(err){
        console.log(err)
    }
}

module.exports = {testUserController}; 