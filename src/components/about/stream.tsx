import { FC, useCallback, useMemo } from "react";
import { StreamTitles } from "./constants";
import { SpotifyIcon, AudiomackIcon, YoutubeMusicIcon } from "@/icons";

export default function Stream() {
  const streamTitles = useMemo(() => Object.keys(StreamTitles), []) as Array<
    keyof StreamTitles
  >;

  return (
    <div>
      <h6>Awards/Association</h6>
      <div>
        {streamTitles.map((title, i) => (
          <li key={i}>
            {Component(title)} {title}
          </li>
        ))}
      </div>
    </div>
  );
}

export const Component = (title: StreamTitles) =>
  ({
    [StreamTitles.Audiomack]: AudiomackIcon,
    [StreamTitles.Spotify]: SpotifyIcon,
    [StreamTitles.YoutubeMusic]: YoutubeMusicIcon,
  }[title] || null);
