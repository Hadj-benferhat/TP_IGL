import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { IoHeartDislike } from "react-icons/io5";


const RowTable = (
  { 
    champs = [], item , index, showSearchPage, addToFavor, deleteFavor, articleInfo, setArticleInfo, articleShow, setArticleShow, favorChooses, clickedItems, setClickedItems,setMoreInfoDisplay
  }
  ) => {
    const orangeColorStyle = {
      color: '#F15B2A'
  };
    const handleClick = (itemId) => {
      setClickedItems(prevState => ({
          ...prevState,
          [itemId]: true
      }));
      };
      

    
   
    return (
        <tr>
          <td>{index}</td>
          {champs.map((champ, index) => (
            <React.Fragment key={index}>
              {champ !== 'id' && champ !== 'pdfUrl' && (
                <td key={index}>
                  {item[champ]}
                </td>
              )}
              {champ === 'pdfUrl' && (
                <td className='actions'>
                  {
                    showSearchPage ?
                    <FaHeart className='heards' 
                    onClick={(e)=>{
                      addToFavor(item)
                      favorChooses.push(item.id)
                      console.log(favorChooses)
                      handleClick(item.id)
                      }}
                      style={clickedItems[item.id] ? orangeColorStyle : null} // Appliquer le style orange si l'élément est cliqué

                      />
                      :
                      <IoHeartDislike className='heards' onClick={()=>{
                        console.log(item)
                        deleteFavor(item)
                        }}/>
                  }
                  
                  <a href={item.pdfUrl} target='_blank'><FaFilePdf className='pdf'/></a>
                  <IoIosInformationCircle className='moreInfo'
                  onClick={()=>{
                    articleShow=item;
                    setArticleShow(articleShow);
                    articleInfo=true;
                    setArticleInfo(articleInfo);
                    }}/>
                  
                </td>
                
              )}
              

            </React.Fragment>
          ))}
        </tr>
      );
      
};

export default RowTable;
