import { MouseEventHandler, useState } from "react";

// define button interface
interface PrimaryButtonProps{
    buttonText:string;
    bgColor:string;
    hoverColor?:string;
    clickColor?:string;
    textColor?:string;
    width?:string;
    onClick?:MouseEventHandler<HTMLButtonElement>
}

/**
 * color palate 1
 <PrimaryButton
  buttonText="Explore Books"
  bgColor="#154D7E"
  hoverColor="#1E5D99"
  clickColor="#103B61"
  textColor="#FFFFFF"
/>
color palate 2
<PrimaryButton
  buttonText="Register Now"
  bgColor="#2E7D32"
  hoverColor="#388E3C"
  clickColor="#1B5E20"
  textColor="#FFFFFF"
/>
 * @returns 
 */
const PrimaryButton:React.FC<PrimaryButtonProps> =({
    buttonText, bgColor,hoverColor,clickColor,textColor,width,onClick
})=> {
    const [isHovered, setIsHovered] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    // determine background color
    const getBackgroundColor = ()=>{
        if(isClicked && clickColor) return clickColor;
        if(isHovered && hoverColor) return hoverColor;
        return bgColor;
    }
    // determine box shadow
    const getBoxShadow =()=>{
        if(isHovered || isClicked){
       return "0.5px 5px 5px 0.5px rgba(0, 0, 0, 0.50)";
        }
    return "0.5px 3px 5px 0.5px rgba(0, 0, 0, 0.20)";
    }

  return (
    <button onClick={onClick} onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>{
        setIsClicked(false);
        setIsHovered(false)
    }}
    onMouseDown={()=>setIsClicked(true)}
    onMouseUp={()=>setIsClicked(false)}
    className="rounded-[5px] h-[50px]"
    style={{
        width,backgroundColor:getBackgroundColor(), color:textColor,
        boxShadow:getBoxShadow(),
        transition:"background-color 0.2 ease, box-shadow 0.2s ease"
    }}
    >
{buttonText}
    </button>
  );
}
export default PrimaryButton