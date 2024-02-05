
const apiRequest = async(url='', optionObj=null, errMes=null) => {
    try{        
        const response = await fetch(url,optionObj);
        console.log('i am in apiRequest')

        if(!response.ok) throw Error ('Please reload the App')
    }catch(err){
        errMes=err.message;
    }finally{
        return errMes;
    }
  
}

export default apiRequest;
