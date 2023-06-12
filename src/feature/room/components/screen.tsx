export interface ScreenProps {}

function Screen({}: ScreenProps) {
  return (
    <div id="stage-wrapper" className="w-full h-full bg-green-200 z-0">
      <span className="sr-only">
        Image by{" "}
        <a href="https://www.freepik.com/free-vector/abstract-neon-lights-background_9840044.htm#page=5&query=perspective%20galaxy&position=0&from_view=search&track=ais">
          Freepik
        </a>
      </span>
    </div>
  );
}

export { Screen };
