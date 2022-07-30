import React from 'react';
import { AiFillGithub , AiFillLinkedin , AiOutlineCopyright} from 'react-icons/ai';
import './Footer.css';


function Footer(){
    return(
        <div>
         <div className='footer'>
         <div>2022 <AiOutlineCopyright/> Jeongmin Choi</div>
         <div>
         <a href="https://github.com/JmJenna"><AiFillGithub className='icon'/></a>
         <a href="https://www.linkedin.com/in/jenna-jeongmin-choi-84716419a"><AiFillLinkedin className='icon'/> </a>
         </div>
         </div>
        </div>
    )
}

export default Footer;