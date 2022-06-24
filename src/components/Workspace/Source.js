import styled from 'styled-components'
import { colors } from '../../Theme'
import { useState, useEffect } from 'react'
import YoutubeLogoImage from '../../assets/youtube.png'


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

export default function Source(){

  const [source, setSource] = useState("youtube") //youtube || soundcloud
  const [loading, setLoading] = useState(false)

  return (
    <SourceContainer>
      {source === "youtube"? <YoutubeLogo src={YoutubeLogoImage}/> : null}
    </SourceContainer>
  )
}
