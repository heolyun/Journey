from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume" / "heo-ryun-resume.pdf"
W, H = A4
M = 18 * mm
CW = W - 2 * M

INK = colors.HexColor("#172033")
TEXT = colors.HexColor("#344054")
MUTED = colors.HexColor("#72809A")
BLUE = colors.HexColor("#376FF6")
BLUE_DARK = colors.HexColor("#2459D6")
PALE_BLUE = colors.HexColor("#F3F6FF")
PALE = colors.HexColor("#F7F9FC")
LINE = colors.HexColor("#DCE2EC")
WHITE = colors.white

pdfmetrics.registerFont(TTFont("Malgun", r"C:\Windows\Fonts\malgun.ttf"))
pdfmetrics.registerFont(TTFont("MalgunBold", r"C:\Windows\Fonts\malgunbd.ttf"))


def width(text, font="Malgun", size=9):
    return pdfmetrics.stringWidth(text, font, size)


def wrap(text, max_width, font="Malgun", size=9):
    lines, current = [], ""
    for word in text.split():
        candidate = word if not current else f"{current} {word}"
        if width(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_text(c, text, x, y, max_width, size=9, leading=14, font="Malgun", color=TEXT):
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrap(text, max_width, font, size):
        c.drawString(x, y, line)
        y -= leading
    return y


def section(c, title, y):
    c.setFillColor(BLUE)
    c.roundRect(M, y - 3, 4, 18, 2, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("MalgunBold", 14)
    c.drawString(M + 12, y, title)
    return y - 25


def pill(c, label, x, y, fill=PALE, color=TEXT, font_size=7.5):
    w = width(label, "MalgunBold", font_size) + 17
    c.setFillColor(fill)
    c.roundRect(x, y - 4, w, 20, 10, fill=1, stroke=0)
    c.setFillColor(color)
    c.setFont("MalgunBold", font_size)
    c.drawString(x + 8.5, y + 2, label)
    return x + w + 6


def bullet(c, text, x, y, max_width, size=8.5, leading=13):
    c.setFillColor(BLUE)
    c.circle(x + 2.5, y + 3, 1.6, fill=1, stroke=0)
    return draw_text(c, text, x + 11, y, max_width - 11, size, leading)


def footer(c, page):
    c.setStrokeColor(LINE)
    c.line(M, 14 * mm, W - M, 14 * mm)
    c.setFillColor(MUTED)
    c.setFont("Malgun", 7)
    c.drawString(M, 9.5 * mm, "Heo Ryun · 클라우드 인프라 / DevOps")
    c.drawRightString(W - M, 9.5 * mm, str(page))


def skill_row(c, y, label, items):
    c.setFillColor(PALE_BLUE)
    c.roundRect(M, y - 28, CW, 28, 9, fill=1, stroke=0)
    c.setFillColor(BLUE_DARK)
    c.setFont("MalgunBold", 8.2)
    c.drawString(M + 13, y - 18, label)
    x = M + 88
    for item in items:
        x = pill(c, item, x, y - 19, fill=WHITE, color=TEXT, font_size=6.8)
    return y - 35


def project_card(c, y, title, role, summary, bullets, tags, height):
    c.setFillColor(WHITE)
    c.setStrokeColor(LINE)
    c.roundRect(M, y - height, CW, height, 10, fill=1, stroke=1)
    c.setFillColor(BLUE)
    c.roundRect(M, y - height, 5, height, 3, fill=1, stroke=0)
    x, ty = M + 17, y - 22
    c.setFillColor(INK)
    c.setFont("MalgunBold", 11.5)
    c.drawString(x, ty, title)
    rw = width(role, "MalgunBold", 7.4) + 16
    c.setFillColor(PALE_BLUE)
    c.roundRect(M + CW - rw - 13, ty - 5, rw, 18, 9, fill=1, stroke=0)
    c.setFillColor(BLUE_DARK)
    c.setFont("MalgunBold", 7.4)
    c.drawString(M + CW - rw - 5, ty + 1, role)
    ty = draw_text(c, summary, x, ty - 19, CW - 34, 8.5, 13, color=MUTED) - 3
    for item in bullets:
        ty = bullet(c, item, x, ty, CW - 34) - 2
    px = x
    for tag in tags:
        px = pill(c, tag, px, y - height + 16, font_size=7)
    return y - height - 10


def curriculum_card(c, y, title, items, height):
    c.setFillColor(PALE)
    c.setStrokeColor(LINE)
    c.roundRect(M, y - height, CW, height, 10, fill=1, stroke=1)
    c.setFillColor(BLUE_DARK)
    c.setFont("MalgunBold", 10)
    c.drawString(M + 16, y - 22, title)
    ty = y - 45
    for label, desc in items:
        c.setFillColor(INK)
        c.setFont("MalgunBold", 8.3)
        c.drawString(M + 16, ty, label)
        ty = draw_text(c, desc, M + 92, ty, CW - 108, 8.1, 12, color=TEXT) - 5
    return y - height - 10


def small_project(c, x, y, w, title, desc, tags):
    h = 92
    c.setFillColor(PALE)
    c.setStrokeColor(LINE)
    c.roundRect(x, y - h, w, h, 10, fill=1, stroke=1)
    c.setFillColor(INK)
    c.setFont("MalgunBold", 10)
    c.drawString(x + 14, y - 21, title)
    draw_text(c, desc, x + 14, y - 40, w - 28, 7.8, 11.5, color=MUTED)
    px = x + 14
    for tag in tags:
        px = pill(c, tag, px, y - h + 14, fill=WHITE, color=MUTED, font_size=6.6)


def page_one(c):
    y = H - 22 * mm
    c.setFillColor(INK)
    c.setFont("MalgunBold", 26)
    c.drawString(M, y, "Heo Ryun")
    pill(c, "신입", M + 126, y + 1, fill=PALE_BLUE, color=BLUE_DARK, font_size=8)
    c.setFillColor(BLUE)
    c.setFont("MalgunBold", 12.5)
    c.drawString(M, y - 25, "클라우드 인프라 · DevOps 엔지니어")
    c.setFillColor(MUTED)
    c.setFont("Malgun", 8.5)
    c.drawString(M, y - 52, "010-4288-8707  ·  hl620@naver.com  ·  충남 천안시 서북구")
    c.drawRightString(W - M, y - 52, "github.com/heolyun")
    c.linkURL("https://github.com/heolyun", (W - M - 85, y - 56, W - M, y - 42), relative=0)

    y -= 76
    c.setFillColor(PALE_BLUE)
    c.roundRect(M, y - 83, CW, 83, 12, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.setFont("MalgunBold", 8)
    c.drawString(M + 18, y - 20, "소개")
    c.setFillColor(INK)
    c.setFont("MalgunBold", 12)
    c.drawString(M + 18, y - 41, "웹 서비스 개발에서 시작해 Azure와 Kubernetes 운영까지 확장했습니다.")
    draw_text(c, "배포 자동화, 컨테이너 연결, AI 모델 저장 방식과 운영 비용까지 서비스의 전체 생명주기를 책임지는 엔지니어를 목표로 합니다.", M + 18, y - 61, CW - 36, 8.6, 13)
    y -= 107

    y = section(c, "프로젝트에 적용한 핵심 역량", y)
    y = skill_row(c, y, "인프라·운영", ["Azure", "AKS", "Kubernetes", "Docker", "GitHub Actions", "Linux"])
    y = skill_row(c, y, "웹 개발", ["Java", "Spring", "Spring Security", "React", "JavaScript", "REST API"])
    y = skill_row(c, y, "데이터·AI", ["Oracle", "PostgreSQL", "MyBatis", "Python", "AI API"])
    y -= 7

    y = section(c, "주요 프로젝트", y)
    y = project_card(c, y, "Burinake", "클라우드 · DevOps · AI 인프라", "화재 감지와 신고 자동화 AI 서비스를 Azure에서 컨테이너 기반으로 배포·운영했습니다.", ["GitHub Actions에서 이미지를 빌드해 ACR로 배포하고, AKS가 이미지를 가져오도록 CI/CD를 분리했습니다.", "YOLO 모델을 Blob Storage와 initContainer로 분리해 이미지 비대화와 VM 디스크 부족 문제를 개선했습니다.", "프론트엔드·백엔드·PostgreSQL·YOLO·VLM을 AKS에 연결하고 Secret, ConfigMap, Ingress, HPA를 구성했습니다."], ["Azure", "AKS", "Docker", "CI/CD", "YOLO / VLM"], 158)
    project_card(c, y, "CSAS", "프론트엔드", "AI 기반 건강 근육 분석 서비스의 모바일 촬영·업로드와 분석 결과 화면을 구현했습니다.", ["업로드 전 이미지 압축과 오류 안내로 고해상도 모바일 사진의 413 오류를 줄였습니다.", "근육 좌표·유형 필터, 원본/분석 비교와 원본 상세 모달을 개선했습니다."], ["React", "Vite", "Axios", "AI API"], 123)
    footer(c, 1)


def page_two(c):
    y = H - 21 * mm
    y = section(c, "교육 이수 내역", y)
    c.setFillColor(INK)
    c.setFont("MalgunBold", 10.5)
    c.drawString(M, y, "휴먼교육센터 · AI 데이터 분석 및 서비스 개발 과정")
    c.setFillColor(MUTED)
    c.setFont("Malgun", 8)
    c.drawRightString(W - M, y, "2026.05.11 - 2026.07.13")
    y -= 18
    y = curriculum_card(c, y, "데이터 분석·인공지능", [("Python", "Pandas·NumPy 기반 데이터 전처리 및 분석"), ("머신러닝", "scikit-learn 기반 RandomForest 등 모델 학습과 예측"), ("딥러닝", "TensorFlow 기반 신경망 모델 학습"), ("빅데이터", "Apache Spark 분산 처리 개념 학습"), ("프로젝트", "1차 CSAS · 2차 Burinake")], 139)
    y -= 8
    c.setFillColor(INK)
    c.setFont("MalgunBold", 10.5)
    c.drawString(M, y, "휴먼교육센터 · Java 기반 데이터 플랫폼 풀스택 개발 과정")
    c.setFillColor(MUTED)
    c.setFont("Malgun", 8)
    c.drawRightString(W - M, y, "2025.10.15 - 2026.04.08")
    y -= 18
    y = curriculum_card(c, y, "백엔드 개발", [("Java", "객체지향 프로그래밍 기초·심화와 컬렉션 프레임워크 활용"), ("Spring", "MVC 기반 웹 서비스 구조 설계 및 REST API 구현"), ("보안", "Spring Security의 세션·JWT 인증/인가와 사용자 권한 제어"), ("DB 연동", "MyBatis XML SQL 매핑을 통한 DB 연동과 로직 분리")], 126)
    y = curriculum_card(c, y, "프론트엔드 개발", [("JavaScript", "ES6+ 비동기 처리(Async/Await, Promise)와 DOM 조작"), ("React", "컴포넌트 설계, Props·State 상태 관리와 화면 렌더링"), ("Redux", "Redux Toolkit 전역 상태 관리와 일관된 데이터 흐름"), ("HTML·CSS", "시맨틱 마크업과 반응형 웹 디자인 구현")], 126)
    y = curriculum_card(c, y, "데이터베이스·개발 도구", [("Oracle SQL", "ERD 설계, 관계 정의, Join·Subquery 기반 데이터 추출"), ("데이터 활용", "공공 데이터 API 연동과 데이터 가공·분석 로직 구현"), ("SQL", "데이터 모델링과 실행 계획을 활용한 쿼리 최적화 기초"), ("협업·환경", "Git·GitHub 형상 관리, VS Code·Eclipse 디버깅, Docker 기본 실습"), ("프로젝트", "1차 DoctorLink · 2차 #Trip · 3차 오늘Farm")], 144)
    footer(c, 2)


def page_three(c):
    y = H - 21 * mm
    y = section(c, "프로젝트 경험", y)
    gap = 8
    third = (CW - gap * 2) / 3
    small_project(c, M, y, third, "DoctorLink", "사용자 인증 상태와 건강 기록 흐름을 연결한 React 서비스", ["React", "Context"])
    small_project(c, M + third + gap, y, third, "#Trip", "OAuth2와 SMTP 계정 복구를 포함한 여행 서비스 백엔드", ["Spring", "OAuth2"])
    small_project(c, M + (third + gap) * 2, y, third, "오늘Farm", "시세·상품·AI 식단을 통합하고 배포까지 수행한 서비스", ["Spring", "AI API"])
    y -= 112
    small_project(c, M, y, (CW - gap) / 2, "TeamRullet", "조건 검증과 점수 편차를 반영한 팀 밸런싱 서비스", ["TypeScript", "Netlify"])
    small_project(c, M + (CW - gap) / 2 + gap, y, (CW - gap) / 2, "CHAMBTI", "응답 가중치를 바탕으로 게임 캐릭터를 추천하는 서비스", ["React", "Netlify"])
    y -= 118

    y = section(c, "학력 및 자격 준비", y)
    c.setFillColor(PALE)
    c.roundRect(M, y - 108, CW, 108, 10, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("MalgunBold", 9.5)
    c.drawString(M + 16, y - 21, "충남도립대학교 · 호텔조리학과")
    c.setFont("MalgunBold", 9)
    c.drawString(M + 16, y - 47, "리눅스마스터 2급")
    c.setFillColor(MUTED)
    c.setFont("Malgun", 8)
    c.drawString(M + 110, y - 47, "2026.08.01 시험 예정")
    c.setFillColor(INK)
    c.setFont("MalgunBold", 9)
    c.drawString(M + 16, y - 67, "정보처리기능사")
    c.setFillColor(MUTED)
    c.setFont("Malgun", 8)
    c.drawString(M + 110, y - 67, "필기 합격")
    c.setFillColor(INK)
    c.setFont("MalgunBold", 9)
    c.drawString(M + 16, y - 87, "정보처리산업기사")
    c.setFillColor(MUTED)
    c.setFont("Malgun", 8)
    c.drawString(M + 110, y - 87, "시험 준비 중")
    c.setFillColor(INK)
    c.setFont("MalgunBold", 9)
    c.drawString(M + 260, y - 87, "AWS SAA")
    c.setFillColor(MUTED)
    c.setFont("Malgun", 8)
    c.drawString(M + 325, y - 87, "자격증 준비 중")
    y -= 132

    y = section(c, "경험과 강점", y)
    c.setFillColor(INK)
    c.setFont("MalgunBold", 10.5)
    c.drawString(M, y, "경험을 기술 역량으로 전환하는 사람")
    y = draw_text(c, "프로게이머 활동을 통해 제한된 시간 안에 상황을 분석하고 반복 훈련과 피드백으로 성과를 높이는 방식을 익혔습니다. 요식업 현장에서는 마감과 시간을 지키는 책임감, 동료와 순서를 맞추는 협업, 돌발 상황 대응력을 길렀습니다.", M, y - 19, CW, 8.7, 13.5) - 12
    strengths = [("원인 추적", "문제를 빌드·저장소·네트워크·환경 설정 순서로 나눠 확인합니다."), ("끝까지 마무리", "구현부터 배포, 운영 증빙, 백업과 비용 정리까지 마칩니다."), ("협업과 기록", "진행 상황과 원인을 공유하고 재현 가능한 문서와 명령을 남깁니다.")]
    card_w = (CW - 16) / 3
    for i, (title, desc) in enumerate(strengths):
        x = M + i * (card_w + 8)
        c.setFillColor(PALE_BLUE)
        c.roundRect(x, y - 74, card_w, 74, 9, fill=1, stroke=0)
        c.setFillColor(BLUE_DARK)
        c.setFont("MalgunBold", 9)
        c.drawString(x + 12, y - 20, title)
        draw_text(c, desc, x + 12, y - 39, card_w - 24, 7.7, 11.5)
    footer(c, 3)


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4)
    c.setTitle("Heo Ryun 이력서")
    c.setAuthor("Heo Ryun")
    for index, page in enumerate((page_one, page_two, page_three)):
        page(c)
        if index < 2:
            c.showPage()
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
