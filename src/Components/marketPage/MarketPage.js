import React, { Component } from 'react';
import { Row } from 'antd';
import PlayerCard from '../playerCard/PlayerCard'

export default class MarketPage extends Component {
    render() {

    let playerData = {
        name:'NEYMAR JR.' ,
        rating:80,
        position:'ST',
        headShot:'https://fifa17.content.easports.com/fifa/fltOnlineAssets/B1BA185F-AD7C-4128-8A64-746DE4EC5A82/2018/fut/items/images/players/html5/134x134/190871.png',
        clubLogo:'https://fifa17.content.easports.com/fifa/fltOnlineAssets/B1BA185F-AD7C-4128-8A64-746DE4EC5A82/2018/fut/items/images/clubbadges/html5/dark/27x27/l73.png',
        nationFlag:'https://fifa17.content.easports.com/fifa/fltOnlineAssets/B1BA185F-AD7C-4128-8A64-746DE4EC5A82/2018/fut/items/images/flags/html5/24x14/54.png',
    };

    return (
        <Row  type="flex" justify="center" >
            <PlayerCard  playerInfo={playerData} />
        </Row>
    )
  }
}
