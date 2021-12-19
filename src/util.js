export const playAudio = (songPlaying, audioRef) => {
  if (songPlaying) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then((audio) => {
        audioRef.current.play();
      });
    }
  }
};


export function changeBGColor(firstColor, secondColor) {
  const css = window.document.styleSheets[0];

  css.insertRule(
    `
@keyframes colorChange {
0% {
  background: ${firstColor};
}
100% {
  background: ${secondColor};
}
}`,
    css.cssRules.length
  );

  document.body.style.animation =
    "colorChange 2s linear infinite alternate both";
}