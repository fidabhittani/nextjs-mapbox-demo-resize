import {Component} from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), {ssr: false});
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    font-size: 1em;
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

class App extends Component {
    render() {
        return (
            <Container>
                <div>Your Component for the Listings</div>
                <div>
                    <Map />
                </div>
            </Container>
        );
    }
}

export default App;
