import styled from 'styled-components'
import { colors } from '../../Theme'
import { useState, useEffect } from 'react'
import YoutubeLogoImage from '../../assets/youtube.png'
import SelectBox from '../SelectBox'


const SourceContainer = styled.div`
  display : flex;
  align-items : center;
  width : 200px;
  height : 80%;
  background : ${colors.dataRowColor};
  margin-left : 20px;
  margin-right : 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
`

const YoutubeLogo = styled.img`
  width : 25px;
  height : 25px;
  margin-left : 7px;

`

const SelectBoxStyled = styled.select`
  background : ${colors.dataRowColor};
  border : none;
  color : ${colors.textColor};
  border : none;
  outline : none;
  font-family : inherit;

`
const SelectContainer = styled.div`
  width : 400px;
  overflow : hidden;
  margin-right : 40px;
`

export default function Source(props){

  const [source, setSource] = useState("youtube") //youtube || soundcloud
  const [loading, setLoading] = useState(false)

  return (
    <SourceContainer>
      {source === "youtube"? <YoutubeLogo src={YoutubeLogoImage}/> : null}
      <SelectContainer>
        <SelectBoxStyled onChange={(e) => props.setId(e.target.value)}>
          {props.searchResults.map(obj => {return(<option key={obj.id} value={obj.id}> {obj.title} </option>)})}
        </SelectBoxStyled>
      </SelectContainer>
    </SourceContainer>
  )
}
