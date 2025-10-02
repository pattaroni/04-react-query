import css from "./Loader.module.css";
import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <>
      <div className={css.loaderBox}>
        <p className={css.text}>Loading movies, please wait...</p>
        <ClipLoader color="#000000ff" size={40} />
      </div>
    </>
  );
}
