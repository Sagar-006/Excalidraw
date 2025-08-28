import axios from "axios"

export async function buildRoom ({token,slug}:{token:any,slug:string}){
    if(!token || !slug){
        return
    }

    try{
        const res = await axios.post(`http://localhost:4000/room`,{slug},
            {
                headers:{
                    Authorization:token,
                }
            }
        );
        console.log(res)
        return res
    }catch(e){
        console.log(e)
    }

}