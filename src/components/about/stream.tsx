import { FC, useCallback, useMemo } from "react";
import { StreamTitles } from "./constants";
import { SpotifyIcon, AudiomackIcon, YoutubeMusicIcon } from "@/icons";

export default function Stream() {
  const streamTitles = useMemo(() => Object.values(StreamTitles), []);

  return (
    <div>
      <h6>Awards/Association</h6>
      <div>
        {streamTitles.map((title, i) => (
          <li key={i}>
            <Component title={title} /> {title}
          </li>
        ))}
      </div>
    </div>
  );
}

export const Component = (props: { title: StreamTitles }) =>
  ({
    [StreamTitles.Audiomack]: <AudiomackIcon />,
    [StreamTitles.Spotify]: <SpotifyIcon />,
    [StreamTitles.YoutubeMusic]: <YoutubeMusicIcon />,
  }[props.title] || null);
