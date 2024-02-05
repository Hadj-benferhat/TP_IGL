import React from 'react'
import Loading from './Loading';
import Table from './Table';

const DashBordManger = (
  {      API_URL, isLeading, fetchError, articules, isSearche, showSearchPage, addToFavor, deleteFavor,clickedItems, setClickedItems, moreInfo, setMoreInfo, setMoreInfoDisplay
  }) => {
  return (
    <main>
      {isLeading  && <Loading />}
        {fetchError && <p className='casParticulier'>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLeading && isSearche &&
        <Table 
        API_URL={API_URL}
        articules={articules}
        showSearchPage={showSearchPage}
        addToFavor={addToFavor}
        deleteFavor={deleteFavor}
        clickedItems={clickedItems}
        setClickedItems={setClickedItems}
        moreInfo={moreInfo}
        setMoreInfo={setMoreInfo}
        setMoreInfoDisplay={setMoreInfoDisplay}
        />}
    </main>
  )
}

export default DashBordManger
