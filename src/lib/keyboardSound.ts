// const keyStrokeSounds = [
//   new Audio("/sound/keystroke1.mp3"),
//   new Audio("/sound/keystroke2.mp3"),
//   new Audio("/sound/keystroke3.mp3"),
//   new Audio("/sound/keystroke4.mp3"),
// ];

function useKeyboardSound() {
  const playRandomKeyStrokeSound = () => {
    // const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];
   
    const randomNum = Math.floor(Math.random() * 4) + 1;
    const audio = new Audio(`/sound/keystroke${randomNum}.mp3`);

    // randomSound.currentTime = 0; // this is for a better UX, def add this
    audio.play().catch((error) => console.log("Audio play failed:", error));
  };

  return { playRandomKeyStrokeSound };
}

export default useKeyboardSound;