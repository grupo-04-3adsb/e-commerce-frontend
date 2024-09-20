import style from "./Loading.module.css";
import { useSelector } from "react-redux";

const Loading = () => {
  const { isLoading } = useSelector((state) => state.loading);

  return (
    isLoading && (
      <div className={style.container}>
        <div className={style.loader}></div>
        <span className={style.carregando}>Carregando...</span>
      </div>
    )
  );
};

export default Loading;
