import Toggle from '../../components/Toggle';
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "../../atoms";
import styled from "styled-components";

const OnOffText = styled.div<{ isDark: boolean }>`
  color: ${props => props.isDark ? 'white' : 'black'}
`;

function Components() {
    const isDark = useRecoilValue(isDarkAtom);
    console.log('isDark', isDark)
    return (
        <Toggle onToggle={on => {
            console.log(on)
        }}>
            <Toggle.On>
                <OnOffText isDark={isDark}>The button is on</OnOffText>
            </Toggle.On>
            <Toggle.Off>
                <OnOffText isDark={isDark}>The button is off</OnOffText>
            </Toggle.Off>
            <Toggle.Button />
        </Toggle>
    )
}

export default Components;
