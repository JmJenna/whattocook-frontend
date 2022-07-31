import React, { useState } from "react";
import "./SearchForm.css";
import { FaSearch } from 'react-icons/fa';
import { Container , InputGroup , Button  ,Form} from 'react-bootstrap';
import backGroundImg from '../../image/homeBackground.png';
import {useHistory} from 'react-router-dom';
/** Search widget.
 *
 */

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    setSearchTerm(searchTerm.trim());
    history.push(`/search/${searchTerm}`)
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
      <div style={{
        backgroundImage:`url(${backGroundImg})`,
       height: "450px",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'}} 
      className="search-img" alt="Responsive image"> 

      <Container className="SearchContain text-center">      
      <h1 className="searchTitle col-sm-12">Ready to cook? </h1>       
      <form onSubmit={handleSubmit}>  
      <InputGroup size="lg" className="mb-3 SearchForm">       
        <Form.Control
          placeholder="Find a Recipe"
          aria-label="searchTerm"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleChange}
        />
        <Button style={{color:"white" ,backgroundColor:"#ff6347",border:"#ff6347"}} 
                id="button-addon2" type="submit">
          <FaSearch />
        </Button >
      </InputGroup>        
      </form>
      </Container> 
      </div>
  );
}


export default SearchForm;