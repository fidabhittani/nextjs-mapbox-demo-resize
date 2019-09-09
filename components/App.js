import {Component} from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), {ssr: false});
import {locationsList2 as locationsList} from '../utils';
class App extends Component {
    state = {
        visible: {
            active: true,
            inactive: true
        }
    };

    componentDidMount = () => {
        window.addEventListener('resize', () => {
            this.setState({visible: {active: false, inactive: false}});
        });
    };

    setVisible = (which = 'active', visibility = true) => {
        const {visible} = this.state;
        this.setState({
            visible: {
                ...visible,
                [which]: visibility
            }
        });
    };

    render() {
        const {visible} = this.state;

        return (
            <div className="app">
                <div className="map-view">
                    <Map />
                </div>
                <div className="side-bar">
                    <div className="item active">
                        <div
                            className="header"
                            title="Click to toggle"
                            onClick={() => this.setVisible('active', !visible.active)}
                        >
                            <header>
                                <img src={'/static/marker-blue.png'} />
                                &nbsp; Avaible Now
                            </header>
                            <div className="actions">
                                <div className="action">{visible.active ? '-' : '+'}</div>
                            </div>
                        </div>
                        {visible.active && (
                            <div className="list">
                                {locationsList &&
                                    locationsList
                                        .filter((loc) => loc.status === 'active')
                                        .map((loc) => <div className="sub-item">{loc.name}</div>)}
                            </div>
                        )}
                    </div>
                    <div className="item inactive">
                        <div
                            className="header"
                            title="Click to toggle"
                            onClick={() => this.setVisible('inactive', !visible.inactive)}
                        >
                            <header>
                                <img src={'/static/marker-grey.png'} />
                                &nbsp; Comming Soon
                            </header>
                            <div className="actions">
                                <div className="action">{visible.inactive ? '-' : '+'}</div>
                            </div>
                        </div>
                        {visible.inactive && (
                            <div className="list">
                                {locationsList &&
                                    locationsList
                                        .filter((loc) => loc.status !== 'active')
                                        .map((loc) => <div className="sub-item">{loc.name}</div>)}
                            </div>
                        )}
                    </div>
                </div>

                <style jsx>{`
                    .app {
                        display: flex;
                        font-size: 1em;
                        height: 100%;
                        width: 100%;
                        overflow: hidden;
                        flex: 1;
                        font-family: 'Open Sans', sans-serif;
                    }

                    .app > .map-view {
                        margin: 10px;
                        overflow: hidden;
                        flex: 7;
                    }
                    .app > .side-bar {
                        overflow: auto;
                        flex: 2;
                        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
                        transition: 0.3s;
                        margin: 10px;
                        padding: 30px 0px;
                    }

                    .app > .side-bar > .item {
                        padding: 10px 30px;
                        display: flex;
                        flex-direction: column;
                    }
                    .app > .side-bar > .item > .header {
                        display: flex;
                        width: 100%;
                        justify-content: space-between;
                        cursor: pointer;
                    }
                    .app > .side-bar > .item > .header > header {
                        font-size: 24px;
                        font-weight: bold;
                        color: #898989;
                        padding: 10px 0px;
                        display: flex;
                        align-items: center;
                    }
                    .app > .side-bar > .item > .header > .actions {
                        display: none;
                    }

                    .app > .side-bar > .active > .header > header {
                        color: #00ace9;
                    }

                    .app > .side-bar > .item > .list {
                        padding-left: 45px;
                        font-size: 18px;
                    }

                    @media screen and (max-width: 1000px) {
                        .app {
                            flex-direction: column-reverse;
                        }
                        .app > .side-bar {
                            padding: 0;
                            box-shadow: none;
                            margin: 0;
                            flex: 3;
                        }
                        .app > .side-bar > .item > .header {
                            padding: 5px;
                            border-radius: 10px;
                            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
                        }

                        .app > .side-bar > .item > .header > .actions {
                            display: flex;
                        }
                        .app > .side-bar > .item > .header > .actions > .action {
                            font-size: 50px;
                            padding-right: 10px;
                            color: #878787;
                        }
                        .app > .side-bar > .item > .header > .actions > .action:hover {
                            cursor: pointer;
                        }
                    }
                `}</style>
            </div>
        );
    }
}

export default App;
