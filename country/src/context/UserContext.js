import React, {createContext} from 'react'

function UserContext() {

    useEffect(() => {
     
    
        const buscarCotizacion = async() => {
          
            const url = `https://back2.tinpad.com.pe/public/api/project/1`;

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

            }
    
    
            const rtdo = await axios.get(url, {headers})
   
            console.log(rtdo);
    
    
        }
    
        buscarCotizacion()
        
      
      }, []);

      
    return (
        <div>
            
        </div>
    )
}

export default UserContext
