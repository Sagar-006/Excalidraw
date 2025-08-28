'use client'

interface InputProps {
    type:'text'|'password'|'email';
    placeholder:string;
    className?:string;
    onChange?:(event :React.ChangeEvent<HTMLInputElement>) => void ;
    width?:string;


}

export const Input = ({type,placeholder,className,onChange}:InputProps) =>{
       return (
         <input
           onChange={onChange}
           type={type}
           placeholder={placeholder}
           className={`${className}  text-black border-1 rounded p-1`}
         ></input>
       );
        
    
}