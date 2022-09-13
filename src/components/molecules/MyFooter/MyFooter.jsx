import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "store/authContext";
import * as S from "./MyFooter.styles";

/**
 * My page의 하단 부분입니다.
 * Logout 버튼을 누르면 로그아웃이 되고, 메인 페이지로 이동합니다.
 *
 * @returns
 */
export const MyFooter = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("dr-tokens");

    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <S.ButtonContainer>
      <S.Button onClick={logout}>Logout</S.Button>
    </S.ButtonContainer>
  );
};
