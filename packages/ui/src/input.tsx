'use client'

interface InputProps {
    type:'text'|'password'|'email';
    placeholder:string;


}

export const Input = ({type,placeholder}:InputProps) =>{
       return <input type={type} placeholder={placeholder} className="w-20 border-black text-black">

       </input>
        
    
}