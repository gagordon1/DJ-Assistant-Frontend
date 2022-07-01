import styled from 'styled-components'
import { colors } from '../../Theme'
import YoutubeLogoImage from '../../assets/youtube.png'


const SourceContainer = styled.div`
  display : flex;
  align-items : center;
  width : 200px;
  height : 80%;
  background : ${colors.dataRowColor};
  margin-left : 10px;
  margin-right : 10px;
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
  font-size : inherit;
  width : 150px;
  padding:0 10px 0 10px !important;
  -webkit-padding-end: 10px !important;
  -webkit-padding-start: 10px !important;

`
const SelectContainer = styled.div`
  margin-right : 40px;
`

export default function Source(props){

  const handleChange = (e) =>{
    let [id, ] = e.target.value.split("|")
    props.handleSet(props.index, "sourceId", id)
  }


  return (
    <SourceContainer>
      <YoutubeLogo src={YoutubeLogoImage}/>
      <SelectContainer>
        <SelectBoxStyled onChange={(e) => handleChange(e)}>
          {props.searchResults.map(obj => {return(<option key={obj.id}
            value={obj.id + "|" + obj.thumbnail}> {obj.title} </option>)})}
        </SelectBoxStyled>
      </SelectContainer>
    </SourceContainer>
  )
}
