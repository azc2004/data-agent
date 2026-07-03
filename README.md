# DX E-Commerce Metrics Dashboard

이 프로젝트는 이커머스 운영을 위한 주요 비즈니스 메트릭(GMV, AOV, 주문 건수, 가입자 수 등)과 실시간 시스템 헬스 상태를 모니터링할 수 있는 대시보드 애플리케이션입니다.

기존의 Vanilla HTML/JS/CSS 대시보드를 Streamlit 환경에서 쉽게 연동하여 확인하고, Streamlit Cloud에 호스팅할 수 있도록 래핑된 프로젝트입니다.

## 주요 기능
- **오버뷰 (Overview)**: GMV, 주문수, CVR, DAU 등 핵심 지표 요약 및 주요 마이크로서비스 헬스체크 현황 제공
- **도메인별 분석**: 상품 관리(Product), 주문/매출(Order), 검색 엔진(Search), 개인화 추천(Rec), 전시/기획전(Exh), 구좌별 CTR 분석(Map), 회원/활성(Member) 세부 지표 모니터링
- **시뮬레이터**: 데이터 실시간 갱신, 실시간 주문 폭주, 트래픽 스파이크 발생 등의 가상 이벤트 트리거링 시뮬레이션
- **지표 검색 & Glossary**: 대시보드 내 정의된 지표명 간편 검색 기능

## 로컬 실행 방법

1. 가상환경 구축 및 의존성 설치:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. Streamlit 실행:
   ```bash
   streamlit run app.py
   ```

## Streamlit Cloud 배포 안내
본 리포지토리를 GitHub에 연동 후, [Streamlit Community Cloud](https://share.streamlit.io/)에서 `app.py`를 메인 파일로 지정하여 배포할 수 있습니다.
