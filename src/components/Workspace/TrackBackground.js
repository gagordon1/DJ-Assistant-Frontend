
import styled from 'styled-components'

export const TrackBackground = styled.img`
  display : ${props => props.display};
  width : inherit;
  height : inherit;
  ${TrackContainer}:hover &{
    filter : brightness(50%);
  }
`
