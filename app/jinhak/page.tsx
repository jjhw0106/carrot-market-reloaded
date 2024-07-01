import style from "../../styles/profile.module.css";

export default function Jinhak() {
  return (
    <div className={style.wrapper}>
      <div className="header">

        <div className={`${style.container} ${style.bg_light}`}>
          <div className="contents">

            <link rel="stylesheet" href="/JinhakCommonSolution/Jinhak.Common.Web/Inc/Css/sort_search.css" type="text/css"/>
              <div className={style.sort_box}>
                <h4 className={style.sort_val}><b>‘화이트라벨’</b> 검색값 <b>26</b>건</h4>
                <div className={style.r}>
                  <div className={`${style.check} ${style.auto_save}`} id="auto-save">
                    <input type="checkbox" id="ck_sort" name="ck_sort"/>
                      <label /* for="ck_sort" */><span></span>분석자료만 보기</label>
                  </div>

                  <div className="sort_type">
                    <a className="selected"><span>출간순</span></a>
                    <a ><span>인기순</span></a>
                  </div>

                  <fieldset className="sch_keyword">
                    <legend>키워드 검색</legend>
                    <input type="text" placeholder="도서명을 입력해주세요."/>
                      <button type="button" className="btn">검색</button>
                  </fieldset>

                  <select className="" name="" id="">
                    <option value="">대학선택</option>
                  </select>

                  <div className="write_btn"><a href="#self" className="btn_com10 bg2">글쓰기</a></div>
                </div>
              </div>

              <div className="sort_box select">
                <h4 className="sort_val">전체</h4>

                <div className="r">
                  <select className="" name="" id="">
                    <option value="">학년</option>
                  </select>
                  <select className="" name="" id="">
                    <option value="">학년도</option>
                  </select>
                  <select className="" name="" id="">
                    <option value="">시행월</option>
                  </select>
                  <select className="" name="" id="">
                    <option value="">영역</option>
                  </select>
                </div>
              </div>

              {/* <script type="text/javascript">
			//!<[CDATA[
			$(document).ready(function(){
				$(".sort_box").addclassName("select"); //select 활성화
			});
			//]]>
			</script>
			<!-- // sort_search --> */}

          </div>
        </div>
      </div>
    </div>
  )
}
