import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';
import Card from './Card';

const Container = styled.section`
  padding: 0 0 30px 0;
  width: 100%;
  background-color: #101010;
  min-height: 100%;
  .results-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 30px; 
    };
  ul {
    margin-top: 70px;
    justify-content: center;
    button {
    color: #ccc;
    };
  };

  @media (min-width: 780px) {
    padding: 70px 0 70px;
  };
`;

const ResultsNav = styled.div`
  height: 60px;
  background-color: #101010;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  @media (min-width: 780px) {
    position: fixed;
    top: 0;
    z-index: 2;
    width: 95%;
    background-color: #000;
  };
`;

const Results = ({ api_key }) => {

  const { searchInput } = useParams();
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => { 
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&page=${page}&include_adult=false&query=${searchInput}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.results);
        setTotalPages(data.total_pages);
      });
  }, [page]);

  const handleClick = e => {
    let toPage = Number(e.target.textContent);
    setPage(toPage);
  };

 //falta resolver el onClick de las flechas de paginacion

  // Material Ui es muy estricto con la manera de usar sus componentes
//  Tu funcion deberia ser asi:
//  const handleChange = (event, value) => {
//   setPage(value);
// };
// Y tu componente asi:
// <Pagination count={totalPages} page={page} color='primary' onChange={handleChange} />

  return (
    <Container>
      <ResultsNav>
        <p>Results for: {searchInput}</p>
      </ResultsNav>
      <div className='results-container'>
        {results.map(item => <Card info={item} key={item.id} />)}
      </div>
      <div className='pagination'>
        <Pagination count={totalPages} page={page} color='primary' onClick={handleClick} />
      </div>
    </Container>
  );
};

export default Results;
