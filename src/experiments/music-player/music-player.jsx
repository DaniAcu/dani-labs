import { useRef, useEffect } from 'react';
import './music-player.css'

import Player from './player/player';
import { renderIn } from './sphere/sphere.render';
import { bassExtractor } from './sphere/bass-extractor';


export default function MusicPlayer() {

    const app = useRef();

    useEffect(() => {
        const { cleanup } = renderIn(app.current);


        return cleanup;
    }, [app]);


    async function analyze (file) {
        await bassExtractor.loadAudio(file);
    }


    return (
        <>
            <div ref={app} />
            <Player onUpload={analyze}/>
        </>
    )
}