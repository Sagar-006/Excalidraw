'use client'

interface InputProps {
    type:'text'|'password'|'email';
    placeholder:string;
    className?:string;
    onChange?:(event :React.ChangeEvent<HTMLInputElement>) => void ;


}

export const Input = ({type,placeholder,className,onChange}:InputProps) =>{
       return (
         <input
         onChange={onChange}
           type={type}
           placeholder={placeholder}
           className="w-full  text-black border-1 rounded p-1"
         ></input>
       );
        
    
}