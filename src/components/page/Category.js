import { FaHamburger , FaPizzaSlice} from 'react-icons/fa';
import { GiNoodles , GiBowlOfRice } from 'react-icons/gi';
import {Container,Row } from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import './Category.css'

function Category(){
return(
    <div className='categoryGroup'>
    <Container className="text-center">
     <h1 style={{color:"#ff6347"}} className="moodTitle"> What are you in the mood for?</h1>   
     <Row xs={1} md={2} lg={6} className="justify-content-center">
         <div className="getFood">
            <NavLink to={'/cuisine/american'} style={{color:"white" , textDecoration:"none"}}>
                <FaHamburger/>
                <h4>American</h4>    
            </NavLink>                            
         </div>     

           <div className="getFood"> 
         <NavLink to={'/cuisine/italian'}  style={{color:"white" , textDecoration:"none"}}>
            <FaPizzaSlice/>
            <h4>Italian</h4>
            </NavLink>       
       </div>
               
 <div className="getFood">
          <NavLink to={'/cuisine/korean'}  style={{color:"white" , textDecoration:"none"}}>
            <GiBowlOfRice/>
            <h4>Korean</h4>
            </NavLink>       
       </div>

     <div className="getFood">
         <NavLink to={'/cuisine/thai'}  style={{color:"white" , textDecoration:"none"}}>
            <GiNoodles/>
            <h4>Thai</h4>    
        </NavLink> 
        </div>   
    </Row>
    </Container>
    <hr
        style={{
          background: 'darkgrey',
          color: 'darkgrey',
          borderColor: 'darkgrey',
          height: '3px',
        }}
      />
    </div>
)
}

export default Category;