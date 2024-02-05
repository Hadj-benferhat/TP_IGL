import React from 'react'
import InputSearch from './InputSearch';

const BarSearch = (
    {
        API_URL, setArticules, API_FAF, setFavorite, name, setName, keyWord, setKeyWord, auteur, setAuteur, institution,  setInstitution, dStart,  setDStart, dEnd, setDEnd, searchArticle, setIsSearche,setClickedItems
    }
) => {
  return (
    <form className='searchForm' onSubmit={(e)=>{
        e.preventDefault();
        searchArticle(API_URL,setArticules,setIsSearche);
        setClickedItems({})
        // searchArticle(API_FAF,setFavorite);
    }}>
        <div className="searchBar">
            
                <InputSearch 
                 type='text'
                placeholder='Name of article'
                id='name'
                value={name}
                setValue={setName}
            />
                <button
                type='submit'
                className='searchButton'>
                    Search
                </button>
        </div>

        <div className="suppInfo">
        <h2>Filter the search:</h2>
        <div className="filters">
        <div className="noDate">
            <InputSearch 
            type='text'
            placeholder='Key word'
            id='keyWord'
            value={keyWord}
            setValue={setKeyWord}
        />

        <InputSearch 
            type='text'
            placeholder='Autors & Institutions'
            id='auteur'
            value={auteur}
            setValue={setAuteur}
        />

        <InputSearch 
            type='text'
            placeholder='category'
            id='institution'
            value={institution}
            setValue={setInstitution}
        />
                </div>
        
       <div className="dates">
        <h4>&lt; Date Interval &gt;</h4>
       <InputSearch 
        type='date'
        placeholder='Date of publication'
        id='date1'
         value={dStart}
         setValue={setDStart}
       />
       <InputSearch 
        type='date'
        placeholder='Date of publication'
        id='date2'
         value={dEnd}
         setValue={setDEnd}
       />
       </div>
       
        </div>
    </div>
            
       
    </form>
  )
}

export default BarSearch
