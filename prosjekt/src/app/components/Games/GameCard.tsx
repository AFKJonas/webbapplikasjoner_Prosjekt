'use client'


export type GameCardProps = {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url?: string; //sier at img_icon_url er en valgfri prop. Kan endres etterhvert.
} // Lagd en type for GameCardProps som definerer de ulike propsene som GameCard tar





export function GameCard (props: GameCardProps) { //Henter props fra GameCardProps
    return ( // returnerer oppsettet som GameCard skal ha
        <a className="game-card" href="/">
            <h2>{props.name}</h2>
            <p>Playtime forever: {Math.round(props.playtime_forever / 60)} hours</p>
            {props.img_icon_url && <img className="img_icon_url" src={`https://media.steampowered.com/steamcommunity/public/images/apps/${props.appid}/${props.img_icon_url}.jpg`} alt={props.name} />}
        </a>
    )
}