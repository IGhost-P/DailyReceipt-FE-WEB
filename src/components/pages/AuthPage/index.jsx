import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "react-loading";
import AtuhContext from "store/auth-context";
import { ReactComponent as KakaoIcon } from "assets/kakao/KakaoTalk_logo.svg";
import * as S from "./style";
import { getKakaoToken } from "controllers/userController";

export function AuthPage() {
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get("code");

  const authCtx = useContext(AtuhContext);

  const getToken = async (code) => {
    const token = await getKakaoToken(code);
    const { id, email, nickname } = token;
    const expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000);
    authCtx.login({ id, nickname }, expirationTime);
    navigate("/");
  };
  useEffect(() => {
    if (code) {
      getToken(code);
    }
  }, []);

  return (
    <S.Container>
      <S.ImageContainer>
        <KakaoIcon />
      </S.ImageContainer>
      <Loading type="spin" color="#fae100" height={144} width={144} />
    </S.Container>
  );
}
