import { TbClipboardHeart } from "react-icons/tb";
import DashBordManger from "./DashBordManger";


const FavoritePage = (
    { API_FAF, favorite, isSearche, isLeading, fetchError, showSearchPage, addToFavor, deleteFavor , clickedItems,setClickedItems, moreInfo, setMoreInfo, setMoreInfoDisplay}
) => {

  
  return (
    <main>
      <h1 className='searchName'>Favorite Articules <TbClipboardHeart /></h1>
      <DashBordManger 
        API_URL={API_FAF}
        isSearche={isSearche}
        isLeading={isLeading}
        fetchError={fetchError}
        articules={favorite}
        showSearchPage={showSearchPage}
        addToFavor={addToFavor}
        deleteFavor={deleteFavor}
        clickedItems={clickedItems}
        setClickedItems={setClickedItems}
        moreInfo={moreInfo}
        setMoreInfo={setMoreInfo}
        setMoreInfoDisplay={setMoreInfoDisplay}
       />  
     
    </main>
  )
}

export default FavoritePage
