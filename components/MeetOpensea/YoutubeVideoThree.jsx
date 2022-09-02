import React from "react";
import YouTube from "react-youtube";

export default class YoutubeVideo
extends React.Component {
render() {

    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
          autoplay: 0,
        },
      };

	return (
        <>
          <div className="relative h-[300px] mx-auto px-[1em] max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] lg:h-[400px]">
		          <YouTube videoId="gfGuPd1CELo" opts={opts} onReady={this._onReady} />
	        </div>
        </>
	
	);
}

_onReady(event) {
	event.target.pauseVideo();
}
}
