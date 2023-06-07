import bg1 from "~/assets/bg-1.jpg";
export interface ScreenProps {}

function Screen({}: ScreenProps) {
  return (
    <div className="w-full h-full">
      <img
        className="w-full h-full block"
        src={bg1}
        style={{
          objectFit: "cover",
        }}
        alt=""
      />
      <span className="sr-only">
        <a href="https://www.freepik.com/free-vector/geometric-shapes-neon-lights-background_6929474.htm#query=night%20disco%20room&position=38&from_view=search&track=country_rows_v1">
          Image by pikisuperstar
        </a>{" "}
        on Freepik
      </span>
    </div>
  );
}

export { Screen };
