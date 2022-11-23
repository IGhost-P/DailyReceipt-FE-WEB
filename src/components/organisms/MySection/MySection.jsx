import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReceiptPaper } from "components";
import * as S from "./MySection.styles";
import { useReceiptClient } from "controllers/receiptController";
import { useEffect } from "react";
import { formatReceiptDate } from "helper/formatter";

/**
 * MySection
 *
 * My page의 중간 부분입니다.
 * 영수증을 작성할 수 있는 버튼과, 영수증을 보여주는 컴포넌트가 있습니다.
 *
 * */
export const MySection = () => {
  const navigate = useNavigate();

  const { getPinnedReceipts } = useReceiptClient();
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getPinnedReceipts();
      setReceipts(data);
    })();
  });

  const renderReceipts = (receipts) => {
    const pinnedReceipts = receipts.map((receipt) => {
      return (
        <S.PaperContainer key={receipt.id}>
          <S.CreatedDate>{receipt.date && formatReceiptDate(receipt.date)}</S.CreatedDate>
          <ReceiptPaper
            onClick={() => {
              navigate(`/receipt`, { state: { todos: receipt.todos, pinned: receipt.pinned } });
            }}
            todos={Array.from(receipt.todos)}
            key={receipt.id}
          />
        </S.PaperContainer>
      );
    });

    return pinnedReceipts;
  };

  const renderBlankPage = () => {
    return (
      <S.BlankContainer>
        <S.BlankTitle>Pinned Receipts</S.BlankTitle>
        <S.BlankText>
          <p>보관한 영수증이 없어요.</p>
          <p>보관해서 모아보고 싶은 하루가 있다면</p>
          <p>
            영수증을 만든 후에 <span>PIN</span>버튼을 눌러보세요!
          </p>
        </S.BlankText>
      </S.BlankContainer>
    );
  };

  return (
    <S.Container>
      <S.ScrollMenu>
        {receipts.length > 0 ? renderReceipts(receipts) : renderBlankPage()}
      </S.ScrollMenu>
    </S.Container>
  );
};
