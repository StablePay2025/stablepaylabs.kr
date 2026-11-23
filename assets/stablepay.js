const siteRoot = new URL(document.documentElement.dataset.siteRoot, document.baseURI);

// ===== 스크롤 네비게이션 =====
var nav = document.getElementById("navbar");
window.addEventListener("scroll", function() {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

// ===== 스크롤 애니메이션 =====
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
    }
  });
}, {threshold: 0.1});
document.querySelectorAll(".feature-card,.step,.plan,.patent-card,.country-tag,.app-img-wrap,.app-text,.qr-paradigm-figure,.qr-paradigm-sub,.qr-paradigm-core,.payment-architecture-figure,.payment-architecture-sub,.payment-architecture-core,.payment-architecture-step-card,.misdeposit-comparison-figure,.misdeposit-comparison-sub,.misdeposit-comparison-core").forEach(function(el) {
  el.style.opacity = "0";
  el.style.transform = "translateY(28px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  obs.observe(el);
});

// ===== 모달 =====
function openModal(type) {
  document.getElementById("modal-" + type).classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeModal(type) {
  document.getElementById("modal-" + type).classList.remove("active");
  document.body.style.overflow = "";
}
function closeModalOutside(e, id) {
  if (e.target.id === id) closeModal(id.replace("modal-",""));
}
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") { closeModal("privacy"); closeModal("terms"); }
});

// Language menu. Korean and English are directly linkable pages.
const languageToggle = document.getElementById('lang-selected-btn');
const languageMenu = document.getElementById('lang-menu');

function setLanguageMenuOpen(open) {
  languageMenu.classList.toggle('open', open);
  languageToggle.classList.toggle('open', open);
  languageToggle.setAttribute('aria-expanded', String(open));
}

languageToggle.addEventListener('click', function () {
  setLanguageMenuOpen(!languageMenu.classList.contains('open'));
});

languageMenu.addEventListener('click', function (event) {
  const option = event.target.closest('button[data-lang]');
  if (!option) return;
  document.getElementById('lang-flag').textContent = option.dataset.flag;
  document.getElementById('lang-code').textContent = option.dataset.name;
  languageMenu.querySelector('.active').classList.remove('active');
  option.classList.add('active');
  setLanguageMenuOpen(false);
  languageToggle.focus();
  setLang(option.dataset.lang);
});

document.addEventListener('click', function (event) {
  if (!document.getElementById('lang-dropdown').contains(event.target)) {
    setLanguageMenuOpen(false);
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && languageMenu.classList.contains('open')) {
    setLanguageMenuOpen(false);
    languageToggle.focus();
  }
});

// Opening the extracted package locally uses explicit filenames.
if (window.location.protocol === 'file:') {
  languageMenu.querySelectorAll('a[hreflang]').forEach(function (link) {
    link.href += 'index.html';
  });
}

function updateCafeCaption(lang) {
  var el = document.getElementById('cafe-caption');
  if (!el) return;
  var cafeTexts = {
    ko: "카페에서도, 해외에서도 — 환전 없이 바로 결제",
    en: "At a cafe or abroad — pay instantly without currency exchange",
    ja: "カフェでも海外でも — 両替なしですぐ決済",
    zh: "无论在咖啡馆还是海外——无需换汇即可支付",
    "zh-hk": "咖啡店或海外都可以 — 無需換匯即時付款",
    th: "ทั้งในคาเฟ่และต่างประเทศ — จ่ายได้ทันทีโดยไม่ต้องแลกเงิน",
    vi: "Ở quán cà phê hay ở nước ngoài — thanh toán ngay mà không cần đổi tiền",
    fil: "Sa cafe man o abroad — bayad agad nang walang palitan ng pera",
    ar: "في المقهى أو في الخارج — ادفع فورًا دون تحويل عملة",
    de: "Im Café oder im Ausland — sofort bezahlen, ohne Geldwechsel",
    fr: "Au café ou à l’étranger — payez instantanément sans change",
    pt: "No café ou no exterior — pague na hora sem câmbio",
    es: "En un café o en el extranjero — paga al instante sin cambiar divisas",
    hi: "कैफे में हों या विदेश में — मुद्रा बदले बिना तुरंत भुगतान करें",
    ru: "В кафе или за границей — платите сразу без обмена валют"
  };
  el.innerHTML = cafeTexts[lang] || cafeTexts.en;
}

// ===== 언어 전환 (ID 기반 - 가장 안정적인 방식) =====
var TEXTS = {
  ko: {
    "hero-network": "Polygon 네트워크에서 USDC·USDT 결제를 지원합니다.",
    "hero-fee-note": "Android · 결제 시 네트워크 수수료가 발생할 수 있습니다.",
    "btn-payment-demo": "결제 영상 보기",
    "app-demo-caption": "USDC QR 결제 시연 · 한국어",
    "sub-countries": "Google Play 출시 국가·지역에서 Android 앱을 다운로드할 수 있습니다.",
    "page-title": "StablePay Labs | USDC·USDT QR·OTP 결제",
    "nav-features": "기능", "nav-app": "앱 화면", "nav-how": "사용 방법",
    "nav-pricing": "요금제", "nav-currencies": "지원 화폐", "nav-patent": "특허",
    "nav-download": "앱 다운로드",
    "cafe-caption": "카페에서도, 해외에서도 — 환전 없이 바로 결제",
    "hero-badge-text": "Web3 스테이블코인 결제",
    "hero-h1": "스마트폰으로<br><span>USDC·USDT</span><br>QR·OTP 결제",
    "hero-p": "판매자는 별도 단말기 없이 QR·OTP 결제 요청을 만들고, 구매자는 금액과 받는 지갑을 확인한 뒤 자신의 지갑에서 직접 승인합니다.",
    
    "fx-invisible-label": "스테이블코인 결제 구조",
    "fx-invisible-title": "원화 스테이블코인 시대: 환율 계산은 사라지는 것이 아니라 '보이지 않게' 됩니다",
    "fx-invisible-sub": "스테이블코인은 환율(FX)을 제거하는 기술이 아닙니다. 정산 자산을 디지털화하는 기술입니다. 상품 가격·구매자 자산·판매자 정산 자산이라는 3개 기준이 일치하지 않는 한, 실시간 가치 환산은 반드시 발생합니다.",
    "fx-invisible-core": "스테이블코인의 미래는 환율을 없애는 것이 아닙니다. 사용자가 환율을 의식하지 않고 결제하게 만드는 것 — 환산과 정산을 보이지 않게 만드는 기술이 바로 StablePay입니다.",
    "fx-invisible-caption": "가치 환산은 사라지지 않는 필수 레이어입니다. StablePay는 이 환산을 사용자에게 보이지 않게 처리하는 결제 구조를 특허로 보호받고 있습니다.",
    "fx-invisible-mobile": "모바일에서는 이미지를 누르면 크게 볼 수 있습니다.",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조.jpg",
    "btn-download": "Google Play 다운로드", "btn-contact": "📩 문의하기",
    "stat-currencies": "가격 표시 통화", "stat-languages": "지원 언어",
    "stat-patents": "등록 특허",
    "lbl-features": "핵심 기능", "ttl-features": "왜 StablePay인가요?",
    "sub-features": "판매자의 결제 요청부터 구매자의 승인까지 스마트폰으로 진행합니다.",
    "f1-h": "실시간 환율 자동 환산", "f1-p": "현지 통화로 가격을 표시하고 환율에 따라 결제에 필요한 USDC·USDT 금액을 환산합니다.",
    "f2-h": "QR 스캔 + OTP 코드", "f2-p": "근거리는 QR 코드, 원거리는 7자리 OTP 코드로 어디서나 간편하게 결제 요청과 승인이 가능합니다.",
    "f3-h": "지문 인증 보안", "f3-p": "앱 진입 및 결제 서명에 생체 인증 적용. 개인 키는 Android Keystore + AES-256으로 기기 내 보안 저장.",
    "f4-h": "잔돈 자동 적립", "f4-p": "0.01 USD 미만의 잔돈은 자동으로 포인트로 적립됩니다. 누적 통계가 실시간으로 반영됩니다.",
    "f5-h": "내장 지갑과 외부 지갑", "f5-p": "StablePay 내장 지갑을 사용하거나 MetaMask·OKX Wallet을 연결해 결제할 수 있습니다.",
    "f6-h": "15개국어 완벽 지원", "f6-p": "한국어, 영어, 아랍어, 중국어 등 15개 언어를 지원하며 화면 크기에 맞는 폰트를 자동 적용합니다.",
    "lbl-app": "실제 앱 화면", "ttl-app": "직접 확인해보세요",
    "sub-app": "복잡한 설정 없이 직관적인 UI로 누구나 쉽게 사용할 수 있습니다.",
    "app1-h": "21개 통화로 가격 표시·환산",
    "app1-p": "앱 설정 화면에서 결제 화폐, 스테이블코인, 지갑 주소를 단계별로 간편하게 등록합니다. 실시간 환율이 자동으로 표시되어 별도 계산이 필요 없습니다.",
    "app1-li1": "1. 가격 표시 통화", "app1-li2": "2단계 : 스테이블코인 선택 (USDT/USDC)",
    "app1-li3": "3단계 : 본인 지갑 주소 등록", "app1-li4": "4단계 : 코인 잔액 자동 확인",
    "app1-li5": "실시간 환율 자동 표시 (예: 1 USD = 1,441.97 KRW)",
    "app2-h": "QR로 결제를 요청하고 지갑에서 승인",
    "app2-p": "판매자가 금액을 입력해 QR을 만들면 구매자는 앱에서 QR을 스캔해 결제 요청을 확인합니다.",
    "app2-li1": "판매자 : 금액 입력 후 QR 코드 즉시 생성", "app2-li2": "판매자가 제시한 QR을 스캔하거나 전달받은 7자리 OTP를 입력해 요청을 확인합니다.",
    "app2-li3": "결제 금액과 받는 지갑을 확인한 뒤 선택한 지갑에서 직접 승인합니다.", "app2-li4": "QR 유효 시간 설정 (2분 / 5분)",
    "app2-li5": "결제 완료 후 잔돈 자동 적립",
    "lbl-how": "사용 방법", "ttl-how": "간단 4단계로 시작하세요",
    "sub-how": "앱에 로그인한 다음 결제에 사용할 지갑을 선택하세요.",
    "s1-h": "소셜 로그인으로 가입", "s1-p": "구글 · 카카오톡 · 페이스북 계정으로 가입합니다.",
    "s2-h": "통화와 결제 지갑 선택", "s2-p": "현지 통화와 결제 코인(USDC 또는 USDT)을 선택하세요. StablePay 내장 지갑을 사용하거나 MetaMask·OKX Wallet을 연결해 결제할 수 있습니다.",
    "s3-h": "QR·OTP 결제 요청 확인", "s3-p": "판매자가 제시한 QR을 스캔하거나 전달받은 7자리 OTP를 입력해 요청을 확인합니다.",
    "s4-h": "지갑에서 결제 승인", "s4-p": "결제 금액과 받는 지갑을 확인한 뒤 선택한 지갑에서 직접 승인합니다.",
    "lbl-pricing": "요금제", "ttl-pricing": "합리적인 가격으로 시작하세요",
    "sub-pricing": "결제 시 블록체인 네트워크 수수료가 발생할 수 있습니다.",
    "plan1-tag": "구매자", "plan1-h": "구독 없이 결제", "plan1-period": "앱 구독료",
    "plan1-desc": "구매자는 QR·OTP 결제를 횟수 제한 없이 이용할 수 있습니다.",
    "plan1-f1": "QR 스캔 결제 무제한", "plan1-f2": "OTP 코드 결제 무제한",
    "plan1-f3": "21개 통화로 가격 표시·환산", "plan1-f4": "잔돈 자동 적립", "plan1-f5": "15개국어 지원",
    "plan2-tag": "판매자 무료", "plan2-h": "기본 판매자", "plan2-period": "/ 하루 5회",
    "plan2-desc": "QR과 OTP 결제 요청을 합쳐 하루 최대 5회까지 무료로 만들 수 있습니다.",
    
    "plan2-f3": "실시간 환율 환산", "plan2-f4": "결제 내역 확인",
    "plan3-tag": "정회원", "plan3-h": "프리미엄", "plan3-period": "/ 6개월",
    "plan3-desc": "QR/OTP 결제 요청 무제한 생성. 연간 $75 옵션도 제공.",
    "plan3-f1": "QR/OTP 무제한 생성", 
    "plan3-f3": "우선 고객 지원", "plan3-f4": "누적 통계 대시보드", "plan3-f5": "연간 플랜 $75",
    "lbl-currencies": "가격 표시 통화", "ttl-currencies": "21개 통화로 가격 표시·환산",
    "sub-currencies": "현지 통화로 가격을 표시하고 환율에 따라 결제에 필요한 USDC·USDT 금액을 환산합니다.",
    "lbl-countries": "Google Play", "ttl-countries": "Android 앱 배포",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "기술력으로 증명합니다",
    "pat1-label": "PATENT 01",
    "pat1-h": "특허 1: 「QR 코드 기반 스테이블코인 결제 시스템 및 방법」",
    "pat1-filed": "출원일자: 2025.06.17 (출원번호: 10-2025-0079540)",
    "pat1-registered": "국내 특허 등록번호 10-2888374-0000 (2025.11.14.)",
    "pat1-pct": "PCT 국제출원번호 PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "특허 2: 「웹3 기반 다중 지갑을 이용한 결제 정산 및 세무 자동화 시스템」",
    "pat2-filed": "출원일자: 2025.12.31 (출원번호: 10-2025-0215773)",
    "pat2-registered": "국내 특허 등록번호 10-3001369-0000 (2026.08.03.)",
    "pat2-pct": "PCT 국제출원번호 PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "특허 3: 「KYC 연동 지갑 권한 위임 및 AI 에이전트를 이용한 블록체인 결제 및 정산 시스템」",
    "pat3-filed": "출원일자: 2026.03.31 (출원번호: 10-2026-0058433)",
    "pat3-status": "현재 우선심사 진행 중 (Patent Pending)",
    "footer-desc": "스마트폰으로 USDC·USDT QR·OTP 결제",
    "footer-h-service": "서비스", "footer-h-info": "정보",
    "footer-h-download": "다운로드", "footer-h-contact": "문의",
    "footer-features": "주요 기능", "footer-app": "앱 화면", "footer-how": "사용 방법",
    "footer-pricing": "요금제", "footer-currencies": "지원 화폐",
    "footer-patent": "등록 특허", "footer-contact": "문의하기",
    "footer-privacy": "개인정보처리방침", "footer-terms": "이용약관",
    "footer-privacy2": "개인정보처리방침", "footer-terms2": "이용약관",
    "modal-privacy-title": "🔐 개인정보처리방침", "modal-privacy-btn": "확인",
    "modal-terms-title": "📋 이용약관", "modal-terms-btn": "확인"
  },
  ja: {
    "hero-network": "Polygon ネットワークで USDC・USDT 決済に対応しています。",
    "hero-fee-note": "Android · 決済時にブロックチェーンのネットワーク手数料がかかる場合があります。",
    "btn-payment-demo": "決済デモを見る",
    "app-demo-caption": "USDCのQR決済デモ · 英語",
    "sub-countries": "Google Playで配信されている国・地域でAndroidアプリをダウンロードできます。",
    "page-title": "StablePay Labs | 特許取得のQRベース・ステーブルコイン決済",
    "nav-features": "機能", "nav-app": "アプリ画面", "nav-how": "使い方",
    "nav-pricing": "料金プラン", "nav-currencies": "対応通貨", "nav-patent": "特許",
    "nav-download": "アプリをダウンロード",
    "cafe-caption": "どこでも、両替なしで即時決済",
    "hero-badge-text": "Web3 ステーブルコイン決済",
    "hero-h1": "スマートフォンで<br><span>USDC・USDT</span><br>QR・OTP決済",
    "hero-p": "販売者は専用端末なしでQRまたはOTPの決済リクエストを作成できます。購入者は金額と受取ウォレットを確認し、自分で承認します。",
    
    "fx-invisible-label": "ステーブルコイン決済構造",
    "fx-invisible-title": "ウォンステーブルコイン時代：為替計算は消えるのではなく「見えなくなる」のです",
    "fx-invisible-sub": "ステーブルコインはFXを除去する技術ではありません。決済資産をデジタル化する技術です。商品価格・購入者資産・販売者決済資産の3基準が一致しない限り、リアルタイムの価値換算は必ず発生します。",
    "fx-invisible-core": "ステーブルコインの未来は為替をなくすことではありません。ユーザーが為替を意識せずに決済できるようにすること — 換算と決済を見えなくする技術がStablePayです。",
    "fx-invisible-caption": "価値換算は欠かせない必須レイヤーです。StablePayはこの換算をユーザーに見えない形で処理する決済構造を特許で保護しています。",
    "fx-invisible-mobile": "画像をタップすると拡大表示できます。",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
    "btn-download": "Google Playでダウンロード", "btn-contact": "📩 お問い合わせ",
    "stat-currencies": "価格表示通貨", "stat-languages": "対応言語",
    "stat-patents": "登録特許",
    "lbl-features": "主な機能", "ttl-features": "StablePayが選ばれる理由",
    "sub-features": "決済リクエストの作成から購入者による承認まで、スマートフォンで行えます。",
    "f1-h": "リアルタイム為替自動換算", "f1-p": "価格を現地通貨で表示し、為替レートに基づいて決済に必要なUSDCまたはUSDTに換算します。",
    "f2-h": "QRスキャン＋OTPコード", "f2-p": "近距離ではQRコード、遠距離では7桁のOTPコードで、支払いリクエストの確認と承認を簡単に行えます。",
    "f3-h": "指紋認証セキュリティ", "f3-p": "アプリ起動・決済署名に生体認証を適用。秘密鍵はAndroid Keystore+AES-256でデバイス内に安全保存。",
    "f4-h": "おつり自動積立", "f4-p": "0.01ドル未満のおつりは自動でポイントとして積み立てられます。累積統計もリアルタイムで反映。",
    "f5-h": "内蔵ウォレットと外部ウォレット", "f5-p": "StablePayの内蔵ウォレットを使うか、MetaMaskまたはOKX Walletを接続して決済できます。",
    "f6-h": "15言語に対応", "f6-p": "韓国語、英語、アラビア語、中国語など15言語に対応し、画面サイズに合わせてフォントを自動調整。",
    "lbl-app": "実際のアプリ画面", "ttl-app": "アプリ画面でチェック",
    "sub-app": "複雑な設定は不要。直感的なUIで、誰でもかんたんに使えます。",
    "app1-h": "21通貨で価格表示・換算",
    "app1-p": "アプリ設定画面で、決済通貨・ステーブルコイン・ウォレットアドレスをステップごとにかんたん登録。リアルタイムの為替レートも自動表示されます。",
    "app1-li1": "1. 価格表示通貨",
    "app1-li2": "ステップ2：ステーブルコインの選択（USDT/USDC）",
    "app1-li3": "ステップ3：ウォレットアドレスの登録",
    "app1-li4": "ステップ4：コイン残高の自動確認",
    "app1-li5": "リアルタイム為替レート自動表示（例：1 USD = 149.50 JPY）",
    "app2-h": "QRで決済をリクエストし、ウォレットで承認",
    "app2-p": "販売者が金額を入力してQRコードを作成し、購入者がアプリで読み取って決済リクエストを確認します。",
    "app2-li1": "販売者：金額入力後すぐにQRコード生成",
    "app2-li2": "販売者のQRコードを読み取るか、受け取った7桁のOTPを入力してリクエストを確認します。",
    "app2-li3": "金額と受取ウォレットを確認し、選択したウォレットで自分で承認します。",
    "app2-li4": "QR有効時間設定（2分 / 5分）",
    "app2-li5": "決済完了後におつり自動積立",
    "lbl-how": "使い方", "ttl-how": "4ステップでかんたん開始",
    "sub-how": "アプリにログインして、決済に使うウォレットを選択します。",
    "s1-h": "ソーシャルログインで登録", "s1-p": "Google・KakaoTalk・Facebookのアカウントで登録します。",
    "s2-h": "通貨とウォレットを選択", "s2-p": "現地通貨と決済に使う通貨（USDCまたはUSDT）を選択します。 StablePayの内蔵ウォレットを使うか、MetaMaskまたはOKX Walletを接続して決済できます。",
    "s3-h": "QR・OTPのリクエストを確認", "s3-p": "販売者のQRコードを読み取るか、受け取った7桁のOTPを入力してリクエストを確認します。",
    "s4-h": "ウォレットで決済を承認", "s4-p": "金額と受取ウォレットを確認し、選択したウォレットで自分で承認します。",
    "lbl-pricing": "料金プラン", "ttl-pricing": "始めやすい料金プラン",
    "sub-pricing": "決済時にブロックチェーンのネットワーク手数料がかかる場合があります。",
    "plan1-tag": "購入者", "plan1-h": "サブスクリプション不要", "plan1-period": "アプリの利用料",
    "plan1-desc": "購入者はQR・OTP決済を回数制限なしで利用できます。",
    "plan1-f1": "QRスキャン決済無制限", "plan1-f2": "OTPコード決済無制限",
    "plan1-f3": "21通貨で価格表示・換算", "plan1-f4": "おつり自動積立", "plan1-f5": "15言語対応",
    "plan2-tag": "販売者無料", "plan2-h": "ベーシック販売者", "plan2-period": "/ 1日5回",
    "plan2-desc": "QRとOTPの決済リクエストを合計で1日5回まで無料で作成できます。",
    
    "plan2-f3": "リアルタイム為替換算", "plan2-f4": "決済履歴確認",
    "plan3-tag": "正会員", "plan3-h": "プレミアム", "plan3-period": "/ 6か月",
    "plan3-desc": "QR/OTP決済リクエストを無制限に作成。年間75ドルのプランもご用意しています。",
    "plan3-f1": "QR/OTP無制限作成", 
    "plan3-f3": "優先サポート", "plan3-f4": "累積統計ダッシュボード", "plan3-f5": "年間プラン$75",
    "lbl-currencies": "価格表示通貨", "ttl-currencies": "21通貨で価格表示・換算",
    "sub-currencies": "価格を現地通貨で表示し、為替レートに基づいて決済に必要なUSDCまたはUSDTに換算します。",
    "lbl-countries": "Google Play", "ttl-countries": "Androidアプリの配信",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "技術力で証明します",
    "pat1-label": "PATENT 01",
    "pat1-h": "特許1：「QRベースのステーブルコイン決済システムおよび方法」",
    "pat1-filed": "出願日：2025.06.17（出願番号：10-2025-0079540）",
    "pat1-registered": "登録日：2025.11.14（登録番号：10-2888374-0000）",
    "pat1-pct": "PCT国際出願番号：PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "特許2：「Web3ベースのマルチウォレットを利用した決済精算および税務自動化システム」",
    "pat2-filed": "出願日：2025.12.31（出願番号：10-2025-0215773）",
    "pat2-registered": "登録日：2026.08.03（登録番号：10-3001369-0000）",
    "pat2-pct": "PCT国際出願番号：PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "特許3：「KYC連携ウォレット権限委任およびAIエージェントを利用したブロックチェーン決済・精算システム」",
    "pat3-filed": "出願日：2026.03.31（出願番号：10-2026-0058433）",
    "pat3-status": "現在、優先審査進行中（Patent Pending）",
    "footer-desc": "スマートフォンで USDC・USDT QR・OTP決済",
    "footer-h-service": "サービス", "footer-h-info": "情報",
    "footer-h-download": "ダウンロード", "footer-h-contact": "お問い合わせ",
    "footer-features": "主な機能", "footer-app": "アプリ画面", "footer-how": "使い方",
    "footer-pricing": "料金プラン", "footer-currencies": "対応通貨",
    "footer-patent": "登録特許", "footer-contact": "お問い合わせ",
    "footer-privacy": "プライバシーポリシー", "footer-terms": "利用規約",
    "footer-privacy2": "プライバシーポリシー", "footer-terms2": "利用規約",
    "modal-privacy-title": "🔐 プライバシーポリシー", "modal-privacy-btn": "閉じる",
    "modal-terms-title": "📋 利用規約", "modal-terms-btn": "閉じる"
  },
  zh: {
    "hero-network": "支持在 Polygon 网络上使用 USDC 或 USDT 付款。",
    "hero-fee-note": "Android · 付款时可能产生区块链网络手续费。",
    "btn-payment-demo": "观看付款演示",
    "app-demo-caption": "USDC 扫码付款演示 · 英语",
    "sub-countries": "可在已通过 Google Play 发布的国家或地区下载 Android 应用。",
    "page-title": "StablePay Labs | 基于专利的稳定币支付系统",
    "nav-features": "功能",
    "nav-app": "App 界面",
    "nav-how": "如何使用",
    "nav-pricing": "资费方案",
    "nav-currencies": "支持货币",
    "nav-patent": "专利",
    "nav-download": "下载 App",
    "cafe-caption": "无需换汇，扫码即付",
    "hero-badge-text": "Web3 稳定币支付",
    "hero-h1": "用手机以<br><span>USDC 或 USDT</span><br>通过 QR 码或 OTP 付款",
    "hero-p": "卖家无需专用终端即可创建 QR 码或 OTP 付款请求。买家核对金额和收款钱包后自行批准付款。",
    
    "fx-invisible-label": "稳定币支付结构",
    "fx-invisible-title": "韩元稳定币时代：汇率计算不会消失，而是变得'不可见'",
    "fx-invisible-sub": "稳定币不是消除外汇（FX）的技术，而是将结算资产数字化的技术。只要商品价格、买方资产和卖方结算资产三个基准不一致，实时价值换算就必然发生。",
    "fx-invisible-core": "稳定币的未来不是消除汇率，而是让用户在不意识到汇率的情况下完成支付——让换算与结算变得不可见，这正是StablePay的核心技术。",
    "fx-invisible-caption": "价值换算是不可或缺的必要层。StablePay通过专利保护这一让用户无感换算的支付结构。",
    "fx-invisible-mobile": "点击图片可放大查看。",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
    "btn-download": "Google Play 下载",
    "btn-contact": "📩 联系我们",
    "stat-currencies": "标价货币",
    "stat-languages": "支持语言",
    
    "stat-patents": "注册专利",
    "lbl-features": "核心功能",
    "ttl-features": "为什么选择 StablePay？",
    "sub-features": "从创建付款请求到买家批准，全程可使用手机完成。",
    "f1-h": "实时汇率自动换算",
    "f1-p": "以当地货币显示价格，并按汇率换算为付款所需的 USDC 或 USDT。",
    "f2-h": "QR 扫码 + OTP 代码",
    "f2-p": "近距离使用二维码，远距离使用 7 位 OTP 代码，轻松又安全地发起和确认付款。",
    "f3-h": "指纹安全验证",
    "f3-p": "应用进入与支付签名均支持生物识别。私钥采用 AES-256 加密并安全保存在设备内。",
    "f4-h": "零钱自动积存",
    "f4-p": "低于 0.01 美元的零钱将自动累计为积分，并实时更新统计数据。",
    "f5-h": "内置钱包和外部钱包",
    "f5-p": "您可以使用 StablePay 内置钱包，也可以连接 MetaMask 或 OKX Wallet 付款。",
    "f6-h": "完整支持 15 种语言",
    "f6-p": "支持韩语、英语、阿拉伯语、中文等 15 种语言，并根据屏幕尺寸自动调整字体。",
    "lbl-app": "真实 App 界面",
    "ttl-app": "亲自体验一下",
    "sub-app": "无需复杂设置，直观的 UI 让任何人都能轻松上手。",
    "app1-h": "支持 21 种货币标价及换算",
    "app1-p": "在应用设置页面中，可分步骤便捷注册支付货币、稳定币和钱包地址。实时汇率会自动显示，无需额外计算。",
    "app1-li1": "1. 标价货币",
    "app1-li2": "第2步：选择稳定币（USDT/USDC）",
    "app1-li3": "第3步：注册您的钱包地址",
    "app1-li4": "第4步：自动检查币种余额",
    "app1-li5": "实时汇率自动显示（例如：1 USD = 1,441.97 KRW）",
    "app2-h": "通过 QR 码发起请求，在钱包中批准",
    "app2-p": "卖家输入金额并生成 QR 码，买家在应用中扫码查看付款请求。",
    "app2-li1": "卖家：输入金额后立即生成二维码",
    "app2-li2": "扫描卖家的 QR 码，或输入收到的 7 位 OTP 查看请求。",
    "app2-li3": "核对金额和收款钱包，然后在所选钱包中自行批准付款。",
    "app2-li4": "设置二维码有效期（2 分钟 / 5 分钟）",
    "app2-li5": "支付完成后零钱自动积存",
    "lbl-how": "使用方式",
    "ttl-how": "4 个简单步骤即可开始",
    "sub-how": "登录应用，然后选择要使用的付款钱包。",
    "s1-h": "通过社交登录注册",
    "s1-p": "使用 Google、KakaoTalk 或 Facebook 账号注册。",
    "s2-h": "选择币种和钱包",
    "s2-p": "选择本地货币以及付款币种（USDC 或 USDT）。 您可以使用 StablePay 内置钱包，也可以连接 MetaMask 或 OKX Wallet 付款。",
    "s3-h": "查看 QR 或 OTP 付款请求",
    "s3-p": "扫描卖家的 QR 码，或输入收到的 7 位 OTP 查看请求。",
    "s4-h": "在钱包中批准付款",
    "s4-p": "核对金额和收款钱包，然后在所选钱包中自行批准付款。",
    "lbl-pricing": "价格方案",
    "ttl-pricing": "轻松上手的资费方案",
    "sub-pricing": "付款时可能产生区块链网络手续费。",
    "plan1-tag": "买家",
    "plan1-h": "无需订阅即可付款",
    "plan1-period": "应用订阅费",
    "plan1-desc": "买家使用 QR 码或 OTP 付款不受次数限制。",
    "plan1-f1": "无限次二维码扫码支付",
    "plan1-f2": "无限次 OTP 代码支付",
    "plan1-f3": "支持 21 种货币标价及换算",
    "plan1-f4": "零钱自动积存",
    "plan1-f5": "支持 15 种语言",
    "plan2-tag": "卖家免费",
    "plan2-h": "基础卖家",
    "plan2-period": "/ 每天 5 次",
    "plan2-desc": "QR 码和 OTP 付款请求合计每天最多可免费创建 5 次。",
    
    
    "plan2-f3": "实时汇率",
    "plan2-f4": "支付记录",
    "plan3-tag": "高级版",
    "plan3-h": "高级版",
    "plan3-period": "/ 6 个月",
    "plan3-desc": "无限创建 QR/OTP 支付请求。另有每年 75 美元的方案。",
    "plan3-f1": "无限生成 QR / OTP",
    
    "plan3-f3": "优先支持",
    "plan3-f4": "累计统计仪表板",
    "plan3-f5": "年付方案 75 美元",
    "lbl-currencies": "标价货币",
    "ttl-currencies": "支持 21 种货币标价及换算",
    "sub-currencies": "以当地货币显示价格，并按汇率换算为付款所需的 USDC 或 USDT。",
    "lbl-countries": "Google Play",
    "ttl-countries": "Android 应用发布地区",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "以技术实力证明",
    "pat1-label": "PATENT 01",
    "pat1-h": "专利1：《基于QR的稳定币支付系统及方法》",
    "pat1-filed": "申请日期：2025.06.17（申请号：10-2025-0079540）",
    "pat1-registered": "注册日期：2025.11.14（注册号：10-2888374-0000）",
    "pat1-pct": "PCT国际申请号：PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "专利2：《基于Web3多钱包的支付结算与税务自动化系统》",
    "pat2-filed": "申请日期：2025.12.31（申请号：10-2025-0215773）",
    "pat2-registered": "注册日期：2026.08.03（注册号：10-3001369-0000）",
    "pat2-pct": "PCT国际申请号：PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "专利3：《利用KYC联动钱包权限委托与AI智能体的区块链支付及结算系统》",
    "pat3-filed": "申请日期：2026.03.31（申请号：10-2026-0058433）",
    "pat3-status": "目前正在优先审查中（Patent Pending）",
    "footer-desc": "用手机以 USDC 或 USDT 通过 QR 码或 OTP 付款",
    "footer-h-service": "服务",
    "footer-h-info": "信息",
    "footer-h-download": "下载",
    "footer-h-contact": "联系",
    "footer-features": "功能",
    "footer-app": "应用界面",
    "footer-how": "使用方法",
    "footer-pricing": "价格方案",
    "footer-currencies": "支持货币",
    "footer-patent": "专利",
    "footer-contact": "联系我们",
    "footer-privacy": "隐私政策",
    "footer-terms": "使用条款",
    "footer-privacy2": "隐私政策",
    "footer-terms2": "使用条款",
    "modal-privacy-title": "🔐 隐私政策",
    "modal-privacy-btn": "关闭",
    "modal-terms-title": "📋 使用条款",
    "modal-terms-btn": "关闭"
  },
  "zh-hk": {
    "hero-network": "支援在 Polygon 網絡上使用 USDC 或 USDT 付款。",
    "hero-fee-note": "Android · 付款時可能會產生區塊鏈網絡手續費。",
    "btn-payment-demo": "觀看付款示範",
    "app-demo-caption": "USDC 掃碼付款示範 · 英語",
    "sub-countries": "可在已透過 Google Play 發佈的國家或地區下載 Android 應用程式。",
    "page-title": "StablePay Labs | 基於專利的穩定幣付款系統",
    "nav-features": "功能",
    "nav-app": "App 介面",
    "nav-how": "如何使用",
    "nav-pricing": "收費方案",
    "nav-currencies": "支援貨幣",
    "nav-patent": "專利",
    "nav-download": "下載 App",
    "cafe-caption": "咖啡店或海外都可以 — 無需換匯即時付款",
    "hero-badge-text": "Web3 穩定幣付款",
    "hero-h1": "用手機以<br><span>USDC 或 USDT</span><br>透過 QR 碼或 OTP 付款",
    "hero-p": "商戶毋須使用專用終端機即可建立 QR 碼或 OTP 付款請求。買家核對金額及收款錢包後自行批准付款。",
    
    "fx-invisible-label": "穩定幣支付結構",
    "fx-invisible-title": "韓元穩定幣時代：匯率計算不會消失，而是變得「看不見」",
    "fx-invisible-sub": "穩定幣不是消除外匯（FX）的技術，而是將結算資產數位化的技術。只要商品價格、買方資產和賣方結算資產三個基準不一致，即時價值換算就必然發生。",
    "fx-invisible-core": "穩定幣的未來不是消除匯率，而是讓用戶在不察覺匯率的情況下完成支付——讓換算與結算變得不可見，這正是StablePay的核心技術。",
    "fx-invisible-caption": "價值換算是不可或缺的必要層。StablePay通過專利保護這種讓用戶無感換算的支付結構。",
    "fx-invisible-mobile": "點擊圖片可放大查看。",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
    "btn-download": "Google Play 下載",
    "btn-contact": "📩 聯絡我們",
    "stat-currencies": "標價貨幣",
    "stat-languages": "支援語言",
    
    "stat-patents": "註冊專利",
    "lbl-features": "核心功能",
    "ttl-features": "為什麼選擇 StablePay？",
    "sub-features": "由建立付款請求至買家批准，全程可在手機上完成。",
    "f1-h": "即時匯率自動換算",
    "f1-p": "以本地貨幣顯示價格，並按匯率換算為付款所需的 USDC 或 USDT。",
    "f2-h": "QR 掃碼 + OTP 驗證碼",
    "f2-p": "近距離可使用 QR Code，遠距離可使用 7 位 OTP 驗證碼，安全又方便地發起及確認付款。",
    "f3-h": "指紋安全驗證",
    "f3-p": "應用進入與付款簽名均支援生物識別。私鑰採用 AES-256 加密並安全保存在裝置內。",
    "f4-h": "零錢自動積存",
    "f4-p": "低於 0.01 美元的零錢將自動累計為積分，並即時更新統計數據。",
    "f5-h": "內置錢包和外部錢包",
    "f5-p": "可使用 StablePay 內置錢包，或連接 MetaMask 或 OKX Wallet 付款。",
    "f6-h": "完整支援 15 種語言",
    "f6-p": "支援韓語、英語、阿拉伯語、中文等 15 種語言，並根據螢幕尺寸自動調整字體。",
    "lbl-app": "實際 App 介面",
    "ttl-app": "親身體驗",
    "sub-app": "介面直觀，毋須複雜設定，任何人都能輕鬆上手。",
    "app1-h": "支援 21 種貨幣標價及換算",
    "app1-p": "在 App 設定頁面中，可按步驟登記付款貨幣、穩定幣及錢包地址。即時匯率會自動顯示，毋須另外計算。",
    "app1-li1": "1. 標價貨幣",
    "app1-li2": "第2步：選擇穩定幣（USDT/USDC）",
    "app1-li3": "第3步：登記您的錢包地址",
    "app1-li4": "第4步：自動檢查幣種餘額",
    "app1-li5": "即時匯率自動顯示（例如：1 USD = 1,441.97 KRW）",
    "app2-h": "透過 QR 碼請求付款，在錢包批准",
    "app2-p": "商戶輸入金額並產生 QR 碼，買家在應用程式內掃碼查看付款請求。",
    "app2-li1": "商戶：輸入金額後立即產生 QR Code",
    "app2-li2": "掃描商戶的 QR 碼，或輸入收到的 7 位數字 OTP 查看請求。",
    "app2-li3": "核對金額與收款錢包後，在所選錢包自行批准付款。",
    "app2-li4": "設定 QR Code 有效期（2 分鐘 / 5 分鐘）",
    "app2-li5": "付款完成後零錢自動積存",
    "lbl-how": "使用方式",
    "ttl-how": "4 個簡單步驟即可開始",
    "sub-how": "登入應用程式，然後選擇付款用的錢包。",
    "s1-h": "透過社交登入註冊",
    "s1-p": "使用 Google、KakaoTalk 或 Facebook 帳號註冊。",
    "s2-h": "選擇貨幣和錢包",
    "s2-p": "選擇本地貨幣及付款幣種（USDC 或 USDT）。 可使用 StablePay 內置錢包，或連接 MetaMask 或 OKX Wallet 付款。",
    "s3-h": "查看 QR 或 OTP 付款請求",
    "s3-p": "掃描商戶的 QR 碼，或輸入收到的 7 位數字 OTP 查看請求。",
    "s4-h": "在錢包批准付款",
    "s4-p": "核對金額與收款錢包後，在所選錢包自行批准付款。",
    "lbl-pricing": "收費方案",
    "ttl-pricing": "以實惠方案輕鬆開始",
    "sub-pricing": "付款時可能會產生區塊鏈網絡手續費。",
    "plan1-tag": "買家",
    "plan1-h": "毋須訂閱即可付款",
    "plan1-period": "應用程式訂閱費",
    "plan1-desc": "買家透過 QR 碼或 OTP 付款不設次數限制。",
    "plan1-f1": "無限次 QR Code 掃碼付款",
    "plan1-f2": "無限次 OTP 驗證碼付款",
    "plan1-f3": "支援 21 種貨幣標價及換算",
    "plan1-f4": "零錢自動積存",
    "plan1-f5": "支援 15 種語言",
    "plan2-tag": "商戶（免費版）",
    "plan2-h": "基礎商戶",
    "plan2-period": "/ 每天 5 次",
    "plan2-desc": "QR 碼及 OTP 付款請求每日合計最多可免費建立 5 次。",
    
    
    "plan2-f3": "即時匯率",
    "plan2-f4": "付款記錄",
    "plan3-tag": "付費會員",
    "plan3-h": "付費會員方案",
    "plan3-period": "/ 6 個月",
    "plan3-desc": "無限建立 QR/OTP 付款請求。另有每年 75 美元的方案。",
    "plan3-f1": "無限產生 QR / OTP",
    
    "plan3-f3": "優先支援",
    "plan3-f4": "累計統計儀表板",
    "plan3-f5": "年付方案 75 美元",
    "lbl-currencies": "標價貨幣",
    "ttl-currencies": "支援 21 種貨幣標價及換算",
    "sub-currencies": "以本地貨幣顯示價格，並按匯率換算為付款所需的 USDC 或 USDT。",
    "lbl-countries": "Google Play",
    "ttl-countries": "Android 應用程式發佈地區",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "以技術實力證明",
    "pat1-label": "PATENT 01",
    "pat1-h": "專利1：《基於QR的穩定幣付款系統及方法》",
    "pat1-filed": "申請日期：2025.06.17（申請號：10-2025-0079540）",
    "pat1-registered": "註冊日期：2025.11.14（註冊號：10-2888374-0000）",
    "pat1-pct": "PCT國際申請號：PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "專利2：《基於Web3多錢包的付款結算與稅務自動化系統》",
    "pat2-filed": "申請日期：2025.12.31（申請號：10-2025-0215773）",
    "pat2-registered": "註冊日期：2026.08.03（註冊號：10-3001369-0000）",
    "pat2-pct": "PCT國際申請號：PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "專利3：《利用KYC聯動錢包權限委託與AI代理的區塊鏈付款及結算系統》",
    "pat3-filed": "申請日期：2026.03.31（申請號：10-2026-0058433）",
    "pat3-status": "目前正在優先審查中（Patent Pending）",
    "footer-desc": "用手機以 USDC 或 USDT 透過 QR 碼或 OTP 付款",
    "footer-h-service": "服務",
    "footer-h-info": "資訊",
    "footer-h-download": "下載",
    "footer-h-contact": "聯絡",
    "footer-features": "功能",
    "footer-app": "App 介面",
    "footer-how": "如何使用",
    "footer-pricing": "收費方案",
    "footer-currencies": "支援貨幣",
    "footer-patent": "專利",
    "footer-contact": "聯絡我們",
    "footer-privacy": "私隱政策",
    "footer-terms": "使用條款",
    "footer-privacy2": "私隱政策",
    "footer-terms2": "使用條款",
    "modal-privacy-title": "🔐 私隱政策",
    "modal-privacy-btn": "關閉",
    "modal-terms-title": "📋 使用條款",
    "modal-terms-btn": "關閉"
  },
  vi: {
    "hero-network": "Hỗ trợ thanh toán bằng USDC hoặc USDT trên mạng Polygon.",
    "hero-fee-note": "Android · Thanh toán có thể phát sinh phí mạng blockchain.",
    "btn-payment-demo": "Xem video thanh toán",
    "app-demo-caption": "Video thanh toán USDC bằng QR · Tiếng Anh",
    "sub-countries": "Tải ứng dụng Android ở các quốc gia hoặc khu vực có ứng dụng trên Google Play.",
    "page-title": "StablePay Labs | Hệ thống thanh toán stablecoin bằng QR",
    "nav-features": "Tính năng",
    "nav-app": "Ứng dụng",
    "nav-how": "Cách sử dụng",
    "nav-pricing": "Gói giá",
    "nav-currencies": "Tiền tệ",
    "nav-patent": "Bằng sáng chế",
    "nav-download": "Tải ứng dụng",
    "cafe-caption": "Thanh toán ngay, không cần đổi tiền",
    "hero-badge-text": "Thanh toán stablecoin Web3",
    "hero-h1": "Thanh toán bằng điện thoại với<br><span>USDC hoặc USDT</span><br>qua QR hoặc OTP",
    "hero-p": "Người bán tạo yêu cầu thanh toán QR hoặc OTP mà không cần thiết bị riêng. Người mua kiểm tra số tiền và ví nhận trước khi tự phê duyệt.",
    
    "fx-invisible-label": "Cấu trúc thanh toán Stablecoin",
    "fx-invisible-title": "Kỷ nguyên Stablecoin KRW: Tính toán tỷ giá không biến mất mà trở nên 'vô hình'",
    "fx-invisible-sub": "Stablecoin không phải là công nghệ loại bỏ FX, mà là công nghệ số hóa tài sản thanh toán. Miễn là giá sản phẩm, tài sản người mua và tài sản thanh toán người bán không khớp nhau, việc quy đổi giá trị thời gian thực vẫn phải xảy ra.",
    "fx-invisible-core": "Tương lai của stablecoin không phải là xóa bỏ tỷ giá, mà là giúp người dùng thanh toán mà không cần ý thức về tỷ giá — công nghệ làm cho việc quy đổi và thanh toán trở nên vô hình chính là StablePay.",
    "fx-invisible-caption": "Quy đổi giá trị là lớp thiết yếu không thể bỏ qua. StablePay bảo hộ bằng sáng chế cấu trúc thanh toán xử lý quy đổi một cách vô hình với người dùng.",
    "fx-invisible-mobile": "Nhấn vào ảnh để xem phóng to.",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
    "btn-download": "Tải trên Google Play",
    "btn-contact": "📩 Liên hệ",
    "stat-currencies": "Tiền tệ niêm yết giá",
    "stat-languages": "Ngôn ngữ",
    
    "stat-patents": "Bằng sáng chế",
    "lbl-features": "TÍNH NĂNG CHÍNH",
    "ttl-features": "Vì sao chọn StablePay?",
    "sub-features": "Dùng điện thoại để tạo, kiểm tra và phê duyệt yêu cầu thanh toán.",
    "f1-h": "Tỷ giá thời gian thực",
    "f1-p": "Hiển thị giá bằng nội tệ và dùng tỷ giá để quy đổi sang số USDC hoặc USDT cần thanh toán.",
    "f2-h": "Quét QR + mã OTP",
    "f2-p": "QR cho giao dịch gần, mã OTP 7 chữ số cho giao dịch từ xa — dễ dàng và an toàn.",
    "f3-h": "Bảo mật vân tay",
    "f3-p": "Xác thực sinh trắc học khi vào ứng dụng và ký thanh toán. Khóa riêng được lưu bằng mã hóa AES-256.",
    "f4-h": "Tự động tích lũy tiền lẻ",
    "f4-p": "Khoản dưới 0,01 USD sẽ tự động được lưu thành điểm cùng thống kê thời gian thực.",
    "f5-h": "Ví tích hợp và ví bên ngoài",
    "f5-p": "Thanh toán bằng ví tích hợp của StablePay hoặc kết nối MetaMask hay OKX Wallet.",
    "f6-h": "Hỗ trợ 15 ngôn ngữ",
    "f6-p": "Hỗ trợ 15 ngôn ngữ gồm tiếng Hàn, tiếng Anh, tiếng Ả Rập, tiếng Trung và tự động điều chỉnh cỡ chữ.",
    "lbl-app": "Màn hình ứng dụng",
    "ttl-app": "Xem trải nghiệm thực tế",
    "sub-app": "Giao diện trực quan, ai cũng có thể sử dụng mà không cần thiết lập phức tạp.",
    "app1-h": "Hiển thị và quy đổi giá theo 21 loại tiền tệ",
    "app1-p": "Đăng ký tiền thanh toán, stablecoin và địa chỉ ví theo từng bước. Tỷ giá thời gian thực được hiển thị tự động nên không cần tự tính.",
    "app1-li1": "1. Tiền tệ niêm yết giá",
    "app1-li2": "Bước 2 : Chọn stablecoin (USDT/USDC)",
    "app1-li3": "Bước 3 : Đăng ký địa chỉ ví của bạn",
    "app1-li4": "Bước 4 : Tự động kiểm tra số dư coin",
    "app1-li5": "Tự động hiển thị tỷ giá thời gian thực (ví dụ: 1 USD = 1.441,97 KRW)",
    "app2-h": "Tạo yêu cầu bằng QR và phê duyệt trong ví",
    "app2-p": "Người bán nhập số tiền và tạo mã QR. Người mua quét mã trong ứng dụng để kiểm tra yêu cầu thanh toán.",
    "app2-li1": "Người bán : Nhập số tiền và tạo QR ngay",
    "app2-li2": "Quét mã QR của người bán hoặc nhập mã OTP 7 chữ số đã nhận để xem yêu cầu.",
    "app2-li3": "Kiểm tra số tiền và ví nhận rồi tự phê duyệt trong ví đã chọn.",
    "app2-li4": "Thiết lập thời hạn QR (2 phút / 5 phút)",
    "app2-li5": "Tiền lẻ được tự động tích lũy sau khi thanh toán",
    "lbl-how": "Cách dùng",
    "ttl-how": "Bắt đầu chỉ với 4 bước",
    "sub-how": "Đăng nhập vào ứng dụng rồi chọn ví để thanh toán.",
    "s1-h": "Đăng ký bằng đăng nhập mạng xã hội",
    "s1-p": "Đăng ký bằng tài khoản Google, KakaoTalk hoặc Facebook.",
    "s2-h": "Chọn tiền tệ và ví",
    "s2-p": "Chọn tiền tệ địa phương và tài sản dùng để thanh toán (USDC hoặc USDT). Thanh toán bằng ví tích hợp của StablePay hoặc kết nối MetaMask hay OKX Wallet.",
    "s3-h": "Kiểm tra yêu cầu QR hoặc OTP",
    "s3-p": "Quét mã QR của người bán hoặc nhập mã OTP 7 chữ số đã nhận để xem yêu cầu.",
    "s4-h": "Phê duyệt thanh toán trong ví",
    "s4-p": "Kiểm tra số tiền và ví nhận rồi tự phê duyệt trong ví đã chọn.",
    "lbl-pricing": "Gói giá",
    "ttl-pricing": "Bắt đầu với mức phí hợp lý",
    "sub-pricing": "Thanh toán có thể phát sinh phí mạng blockchain.",
    "plan1-tag": "Người mua",
    "plan1-h": "Thanh toán không cần đăng ký gói",
    "plan1-period": "phí đăng ký ứng dụng",
    "plan1-desc": "Người mua có thể thanh toán qua QR hoặc OTP không giới hạn số lần.",
    "plan1-f1": "Thanh toán quét QR không giới hạn",
    "plan1-f2": "Thanh toán bằng mã OTP không giới hạn",
    "plan1-f3": "Hiển thị và quy đổi giá theo 21 loại tiền tệ",
    "plan1-f4": "Tự động tích lũy tiền lẻ",
    "plan1-f5": "Hỗ trợ 15 ngôn ngữ",
    "plan2-tag": "Người bán miễn phí",
    "plan2-h": "Người bán cơ bản",
    "plan2-period": "/ 5 lần mỗi ngày",
    "plan2-desc": "Tạo miễn phí tối đa 5 yêu cầu thanh toán QR hoặc OTP mỗi ngày, tính gộp cả hai loại.",
    
    
    "plan2-f3": "Tỷ giá thời gian thực",
    "plan2-f4": "Lịch sử thanh toán",
    "plan3-tag": "Premium",
    "plan3-h": "Premium",
    "plan3-period": "/ 6 tháng",
    "plan3-desc": "Tạo yêu cầu thanh toán QR/OTP không giới hạn. Có cả gói năm 75 USD.",
    "plan3-f1": "Tạo QR/OTP không giới hạn",
    
    "plan3-f3": "Hỗ trợ ưu tiên",
    "plan3-f4": "Bảng điều khiển thống kê tích lũy",
    "plan3-f5": "Gói năm 75 USD",
    "lbl-currencies": "Tiền tệ niêm yết giá",
    "ttl-currencies": "Hiển thị và quy đổi giá theo 21 loại tiền tệ",
    "sub-currencies": "Hiển thị giá bằng nội tệ và dùng tỷ giá để quy đổi sang số USDC hoặc USDT cần thanh toán.",
    "lbl-countries": "Google Play",
    "ttl-countries": "Phát hành ứng dụng Android",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "Được chứng minh bằng công nghệ",
    "pat1-label": "PATENT 01",
    "pat1-h": "Bằng sáng chế 1: “Hệ thống và phương pháp thanh toán stablecoin dựa trên QR”",
    "pat1-filed": "Ngày nộp đơn: 2025.06.17 (Số đơn: 10-2025-0079540)",
    "pat1-registered": "Ngày đăng ký: 2025.11.14 (Số đăng ký: 10-2888374-0000)",
    "pat1-pct": "Số đơn PCT quốc tế: PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "Bằng sáng chế 2: “Hệ thống tự động đối soát thanh toán và thuế dựa trên Web3 sử dụng nhiều ví”",
    "pat2-filed": "Ngày nộp đơn: 2025.12.31 (Số đơn: 10-2025-0215773)",
    "pat2-registered": "Ngày đăng ký: 2026.08.03 (Số đăng ký: 10-3001369-0000)",
    "pat2-pct": "Số đơn PCT quốc tế: PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "Bằng sáng chế 3: “Hệ thống thanh toán và đối soát blockchain sử dụng ủy quyền ví liên kết KYC và AI Agent”",
    "pat3-filed": "Ngày nộp đơn: 2026.03.31 (Số đơn: 10-2026-0058433)",
    "pat3-status": "Hiện đang được thẩm định ưu tiên (Patent Pending)",
    "footer-desc": "Thanh toán bằng điện thoại với USDC hoặc USDT qua QR hoặc OTP",
    "footer-h-service": "Dịch vụ",
    "footer-h-info": "Thông tin",
    "footer-h-download": "Tải xuống",
    "footer-h-contact": "Liên hệ",
    "footer-features": "Tính năng",
    "footer-app": "Màn hình ứng dụng",
    "footer-how": "Cách dùng",
    "footer-pricing": "Gói giá",
    "footer-currencies": "Tiền tệ",
    "footer-patent": "Bằng sáng chế",
    "footer-contact": "Liên hệ",
    "footer-privacy": "Chính sách bảo mật",
    "footer-terms": "Điều khoản sử dụng",
    "footer-privacy2": "Chính sách bảo mật",
    "footer-terms2": "Điều khoản sử dụng",
    "modal-privacy-title": "🔐 Chính sách bảo mật",
    "modal-privacy-btn": "Đóng",
    "modal-terms-title": "📋 Điều khoản sử dụng",
    "modal-terms-btn": "Đóng"
  },
  th: {
    "hero-network": "รองรับการชำระเงินด้วย USDC หรือ USDT บนเครือข่าย Polygon",
    "hero-fee-note": "Android · การชำระเงินอาจมีค่าธรรมเนียมเครือข่ายบล็อกเชน",
    "btn-payment-demo": "ดูวิดีโอสาธิตการชำระเงิน",
    "app-demo-caption": "วิดีโอสาธิตการจ่าย USDC ผ่าน QR · ภาษาอังกฤษ",
    "sub-countries": "ดาวน์โหลดแอป Android ได้ในประเทศหรือภูมิภาคที่มีแอปนี้ใน Google Play",
    "page-title": "StablePay Labs | ระบบชำระเงินสเตเบิลคอยน์ด้วย QR",
    "nav-features": "ฟีเจอร์",
    "nav-app": "แอป",
    "nav-how": "วิธีใช้งาน",
    "nav-pricing": "ราคา",
    "nav-currencies": "สกุลเงิน",
    "nav-patent": "สิทธิบัตร",
    "nav-download": "ดาวน์โหลด",
    "cafe-caption": "ชำระเงินทันที ไม่ต้องแลกเปลี่ยน",
    "hero-badge-text": "การชำระเงินด้วยสเตเบิลคอยน์ Web3",
    "hero-h1": "จ่ายผ่านมือถือด้วย<br><span>USDC หรือ USDT</span><br>ผ่าน QR หรือ OTP",
    "hero-p": "ผู้ขายสร้างคำขอชำระเงินด้วย QR หรือ OTP ได้โดยไม่ต้องมีเครื่องรับชำระแยก ผู้ซื้อตรวจสอบยอดเงินและกระเป๋าผู้รับก่อนอนุมัติ",
    
    "fx-invisible-label": "โครงสร้างการชำระเงิน Stablecoin",
    "fx-invisible-title": "ยุค KRW Stablecoin: การคำนวณอัตราแลกเปลี่ยนไม่ได้หายไป แต่ 'มองไม่เห็น'",
    "fx-invisible-sub": "Stablecoin ไม่ใช่เทคโนโลยีที่ขจัด FX แต่เป็นเทคโนโลยีที่ทำให้สินทรัพย์การชำระเงินเป็นดิจิทัล ตราบใดที่ราคาสินค้า สินทรัพย์ผู้ซื้อ และสินทรัพย์การชำระเงินของผู้ขายไม่ตรงกัน การแปลงมูลค่าแบบเรียลไทม์จะต้องเกิดขึ้น",
    "fx-invisible-core": "อนาคตของ Stablecoin ไม่ใช่การลบอัตราแลกเปลี่ยน แต่คือการทำให้ผู้ใช้ชำระเงินโดยไม่รู้ตัวถึงอัตราแลกเปลี่ยน — เทคโนโลยีที่ทำให้การแปลงและชำระเงินมองไม่เห็นคือ StablePay",
    "fx-invisible-caption": "การแปลงมูลค่าเป็นเลเยอร์จำเป็นที่ขาดไม่ได้ StablePay ปกป้องโครงสร้างการชำระเงินที่ซ่อนการแปลงจากผู้ใช้ด้วยสิทธิบัตร",
    "fx-invisible-mobile": "แตะที่ภาพเพื่อขยาย",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
    "btn-download": "ดาวน์โหลด Google Play",
    "btn-contact": "📩 ติดต่อเรา",
    "stat-currencies": "สกุลเงินที่ใช้แสดงราคา",
    "stat-languages": "ภาษา",
    
    "stat-patents": "สิทธิบัตร",
    "lbl-features": "ฟีเจอร์หลัก",
    "ttl-features": "ทำไมต้อง StablePay?",
    "sub-features": "ใช้สมาร์ตโฟนตั้งแต่สร้างคำขอจนถึงอนุมัติการชำระเงิน",
    "f1-h": "อัตราแลกเปลี่ยนแบบเรียลไทม์",
    "f1-p": "แสดงราคาในสกุลเงินท้องถิ่นและแปลงเป็นยอด USDC หรือ USDT ตามอัตราแลกเปลี่ยน",
    "f2-h": "สแกน QR + รหัส OTP",
    "f2-p": "ใกล้ใช้ QR ไกลใช้รหัส OTP 7 หลัก ชำระเงินได้ง่ายและปลอดภัย",
    "f3-h": "ความปลอดภัยด้วยลายนิ้วมือ",
    "f3-p": "ยืนยันตัวตนด้วยไบโอเมตริกสำหรับเข้าแอปและลงนามการชำระเงิน โดยเก็บ private key ด้วยการเข้ารหัส AES-256",
    "f4-h": "เก็บเศษเงินอัตโนมัติ",
    "f4-p": "ยอดต่ำกว่า 0.01 ดอลลาร์สหรัฐจะถูกเก็บเป็นพอยต์อัตโนมัติ พร้อมสถิติแบบเรียลไทม์",
    "f5-h": "กระเป๋าในแอปและกระเป๋าภายนอก",
    "f5-p": "ชำระเงินด้วยกระเป๋าในแอป StablePay หรือเชื่อมต่อ MetaMask หรือ OKX Wallet",
    "f6-h": "รองรับ 15 ภาษา",
    "f6-p": "รองรับ 15 ภาษา รวมถึงเกาหลี อังกฤษ อาหรับ และจีน พร้อมปรับฟอนต์อัตโนมัติตามหน้าจอ",
    "lbl-app": "ภาพหน้าจอแอป",
    "ttl-app": "ดูการใช้งานจริง",
    "sub-app": "UI ใช้งานง่าย ใครก็ใช้ได้โดยไม่ต้องตั้งค่าซับซ้อน",
    "app1-h": "แสดงราคาและแปลงได้ 21 สกุลเงิน",
    "app1-p": "ลงทะเบียนสกุลเงิน สเตเบิลคอยน์ และที่อยู่กระเป๋าเงินทีละขั้นตอน พร้อมแสดงอัตราแลกเปลี่ยนสดอัตโนมัติ",
    "app1-li1": "1. สกุลเงินที่ใช้แสดงราคา",
    "app1-li2": "ขั้นตอนที่ 2 : เลือกสเตเบิลคอยน์ (USDT/USDC)",
    "app1-li3": "ขั้นตอนที่ 3 : ลงทะเบียนที่อยู่กระเป๋าเงิน",
    "app1-li4": "ขั้นตอนที่ 4 : ตรวจสอบยอดคงเหลืออัตโนมัติ",
    "app1-li5": "แสดงอัตราแลกเปลี่ยนแบบเรียลไทม์ (เช่น 1 USD = 1,441.97 KRW)",
    "app2-h": "ขอชำระผ่าน QR แล้วอนุมัติในกระเป๋า",
    "app2-p": "ผู้ขายกรอกยอดเงินและสร้าง QR ผู้ซื้อสแกนในแอปเพื่อตรวจสอบคำขอชำระเงิน",
    "app2-li1": "ผู้ขาย : กรอกยอดและสร้าง QR ได้ทันที",
    "app2-li2": "สแกน QR ของผู้ขายหรือกรอกรหัส OTP 7 หลักที่ได้รับเพื่อตรวจสอบคำขอ",
    "app2-li3": "ตรวจสอบยอดเงินและกระเป๋าผู้รับ แล้วอนุมัติการชำระเงินในกระเป๋าที่เลือก",
    "app2-li4": "ตั้งเวลา QR หมดอายุได้ (2 นาที / 5 นาที)",
    "app2-li5": "เศษเงินถูกเก็บอัตโนมัติหลังชำระเงิน",
    "lbl-how": "วิธีใช้งาน",
    "ttl-how": "เริ่มต้นง่ายใน 4 ขั้นตอน",
    "sub-how": "ลงชื่อเข้าใช้แอปแล้วเลือกกระเป๋าที่จะใช้ชำระเงิน",
    "s1-h": "สมัครด้วยโซเชียลล็อกอิน",
    "s1-p": "สมัครด้วยบัญชี Google, KakaoTalk หรือ Facebook",
    "s2-h": "เลือกสกุลเงินและกระเป๋า",
    "s2-p": "เลือกสกุลเงินท้องถิ่นและสินทรัพย์ที่ใช้ชำระ (USDC หรือ USDT) ชำระเงินด้วยกระเป๋าในแอป StablePay หรือเชื่อมต่อ MetaMask หรือ OKX Wallet",
    "s3-h": "ตรวจสอบคำขอ QR หรือ OTP",
    "s3-p": "สแกน QR ของผู้ขายหรือกรอกรหัส OTP 7 หลักที่ได้รับเพื่อตรวจสอบคำขอ",
    "s4-h": "อนุมัติในกระเป๋า",
    "s4-p": "ตรวจสอบยอดเงินและกระเป๋าผู้รับ แล้วอนุมัติการชำระเงินในกระเป๋าที่เลือก",
    "lbl-pricing": "ราคา",
    "ttl-pricing": "เริ่มต้นได้ในราคาคุ้มค่า",
    "sub-pricing": "การชำระเงินอาจมีค่าธรรมเนียมเครือข่ายบล็อกเชน",
    "plan1-tag": "ผู้ซื้อ",
    "plan1-h": "จ่ายได้โดยไม่ต้องสมัครแพ็กเกจ",
    "plan1-period": "ค่าสมัครแพ็กเกจแอป",
    "plan1-desc": "ผู้ซื้อชำระเงินด้วย QR หรือ OTP ได้ไม่จำกัดจำนวนครั้ง",
    "plan1-f1": "ชำระเงินผ่านการสแกน QR ไม่จำกัด",
    "plan1-f2": "ชำระเงินด้วยรหัส OTP ไม่จำกัด",
    "plan1-f3": "แสดงราคาและแปลงได้ 21 สกุลเงิน",
    "plan1-f4": "เก็บเศษเงินอัตโนมัติ",
    "plan1-f5": "รองรับ 15 ภาษา",
    "plan2-tag": "ผู้ขายฟรี",
    "plan2-h": "ผู้ขายพื้นฐาน",
    "plan2-period": "/ 5 ครั้งต่อวัน",
    "plan2-desc": "สร้างคำขอชำระเงินแบบ QR และ OTP รวมกันได้ฟรีสูงสุด 5 ครั้งต่อวัน",
    
    
    "plan2-f3": "อัตราแลกเปลี่ยนแบบเรียลไทม์",
    "plan2-f4": "ประวัติการชำระเงิน",
    "plan3-tag": "พรีเมียม",
    "plan3-h": "พรีเมียม",
    "plan3-period": "/ 6 เดือน",
    "plan3-desc": "สร้างคำขอชำระเงิน QR/OTP ได้ไม่จำกัด มีแพ็กเกจรายปี $75 ด้วย",
    "plan3-f1": "สร้าง QR/OTP ไม่จำกัด",
    
    "plan3-f3": "ซัพพอร์ตแบบเร่งด่วน",
    "plan3-f4": "แดชบอร์ดสถิติสะสม",
    "plan3-f5": "แพ็กเกจรายปี $75",
    "lbl-currencies": "สกุลเงินที่ใช้แสดงราคา",
    "ttl-currencies": "แสดงราคาและแปลงได้ 21 สกุลเงิน",
    "sub-currencies": "แสดงราคาในสกุลเงินท้องถิ่นและแปลงเป็นยอด USDC หรือ USDT ตามอัตราแลกเปลี่ยน",
    "lbl-countries": "Google Play",
    "ttl-countries": "การเผยแพร่แอป Android",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "พิสูจน์ด้วยเทคโนโลยี",
    "pat1-label": "PATENT 01",
    "pat1-h": "สิทธิบัตร 1: “ระบบและวิธีการชำระเงินด้วยสเตเบิลคอยน์ผ่าน QR”",
    "pat1-filed": "วันที่ยื่นคำขอ: 2025.06.17 (เลขที่คำขอ: 10-2025-0079540)",
    "pat1-registered": "วันที่จดทะเบียน: 2025.11.14 (เลขทะเบียน: 10-2888374-0000)",
    "pat1-pct": "เลขที่คำขอ PCT ระหว่างประเทศ: PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "สิทธิบัตร 2: “ระบบ Web3 สำหรับการชำระบัญชีการชำระเงินและระบบภาษีอัตโนมัติด้วยหลายกระเป๋าเงิน”",
    "pat2-filed": "วันที่ยื่นคำขอ: 2025.12.31 (เลขที่คำขอ: 10-2025-0215773)",
    "pat2-registered": "วันที่จดทะเบียน: 2026.08.03 (เลขทะเบียน: 10-3001369-0000)",
    "pat2-pct": "เลขที่คำขอ PCT ระหว่างประเทศ: PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "สิทธิบัตร 3: “ระบบการชำระเงินและการชำระบัญชีบนบล็อกเชนโดยใช้การมอบสิทธิ์กระเป๋าเงินที่เชื่อมโยง KYC และ AI Agent”",
    "pat3-filed": "วันที่ยื่นคำขอ: 2026.03.31 (เลขที่คำขอ: 10-2026-0058433)",
    "pat3-status": "อยู่ระหว่างการตรวจสอบแบบเร่งรัด (Patent Pending)",
    "footer-desc": "จ่ายผ่านมือถือด้วย USDC หรือ USDT ผ่าน QR หรือ OTP",
    "footer-h-service": "บริการ",
    "footer-h-info": "ข้อมูล",
    "footer-h-download": "ดาวน์โหลด",
    "footer-h-contact": "ติดต่อ",
    "footer-features": "ฟีเจอร์",
    "footer-app": "หน้าจอแอป",
    "footer-how": "วิธีใช้งาน",
    "footer-pricing": "ราคา",
    "footer-currencies": "สกุลเงิน",
    "footer-patent": "สิทธิบัตร",
    "footer-contact": "ติดต่อเรา",
    "footer-privacy": "นโยบายความเป็นส่วนตัว",
    "footer-terms": "ข้อกำหนดการใช้บริการ",
    "footer-privacy2": "นโยบายความเป็นส่วนตัว",
    "footer-terms2": "ข้อกำหนดการใช้บริการ",
    "modal-privacy-title": "🔐 นโยบายความเป็นส่วนตัว",
    "modal-privacy-btn": "ปิด",
    "modal-terms-title": "📋 ข้อกำหนดการใช้บริการ",
    "modal-terms-btn": "ปิด"
  },
  fil: {
    "hero-network": "Magbayad gamit ang USDC o USDT sa Polygon network.",
    "hero-fee-note": "Android · Maaaring may blockchain network fee sa pagbabayad.",
    "btn-payment-demo": "Panoorin ang demo ng pagbabayad",
    "app-demo-caption": "Demo ng bayad sa USDC gamit ang QR · Ingles",
    "sub-countries": "I-download ang Android app sa mga bansa o rehiyong may access dito sa Google Play.",
    "page-title": "StablePay Labs | Patentadong Stablecoin Payment System na Batay sa QR",
    "nav-features": "Mga Tampok",
    "nav-app": "Mga Screen ng App",
    "nav-how": "Paano Gamitin",
    "nav-pricing": "Presyo",
    "nav-currencies": "Mga Suportadong Currency",
    "nav-patent": "Patent",
    "nav-download": "I-download ang App",
    "cafe-caption": "Sa cafe man o abroad — bayad agad nang walang palitan ng pera",
    "hero-badge-text": "Web3 Stablecoin Payment",
    "hero-h1": "Magbayad sa cellphone gamit ang<br><span>USDC o USDT</span><br>sa pamamagitan ng QR o OTP",
    "hero-p": "Makakagawa ang seller ng QR o OTP payment request kahit walang hiwalay na terminal. Susuriin ng buyer ang halaga at receiving wallet bago niya aprubahan ang bayad.",
    
    "fx-invisible-label": "Istraktura ng Stablecoin na Pagbabayad",
    "fx-invisible-title": "Panahon ng KRW Stablecoin: Hindi nawawala ang pagkalkula ng palitan — nagiging 'hindi nakikita'",
    "fx-invisible-sub": "Ang Stablecoin ay hindi teknolohiya para alisin ang FX, kundi para i-digitize ang settlement asset. Habang hindi nagtatugma ang presyo ng produkto, asset ng bumibili, at settlement asset ng nagbebenta, ang real-time na value conversion ay hindi maiiwasan.",
    "fx-invisible-core": "Ang kinabukasan ng stablecoin ay hindi pag-aalis ng palitan, kundi ang pagbabayad nang hindi namamalayan ang palitan — ang teknolohiyang nagtatago ng conversion at settlement ay StablePay.",
    "fx-invisible-caption": "Ang value conversion ay isang mahalagang layer na hindi maaaring laktawan. Pinoprotektahan ng StablePay ang istrakturang ito sa pamamagitan ng patent.",
    "fx-invisible-mobile": "I-tap ang larawan para palakihin.",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
    "btn-download": "I-download sa Google Play",
    "btn-contact": "📩 Makipag-ugnayan",
    "stat-currencies": "Mga currency para sa presyo",
    "stat-languages": "Suportadong Wika",
    
    "stat-patents": "Rehistradong Patent",
    "lbl-features": "Pangunahing Tampok",
    "ttl-features": "Bakit StablePay?",
    "sub-features": "Gamitin ang smartphone sa paggawa, pagsuri, at pag-apruba ng mga payment request.",
    "f1-h": "Awtomatikong conversion ng real-time exchange rate",
    "f1-p": "Ipakita ang presyo sa lokal na currency at i-convert ito sa USDC o USDT gamit ang exchange rate.",
    "f2-h": "QR Scan + OTP Code",
    "f2-p": "Para sa malapitan, QR code; para sa malayuan, 7-digit na OTP code para sa madali at ligtas na payment request at approval.",
    "f3-h": "Seguridad gamit ang fingerprint",
    "f3-p": "May biometric authentication sa pagpasok sa app at pagpirma ng bayad. Ang private key ay ligtas na nakaimbak sa device gamit ang Android Keystore + AES-256.",
    "f4-h": "Awtomatikong ipon ng sukli",
    "f4-p": "Ang sukling mas mababa sa 0.01 USD ay awtomatikong naiipon bilang points. Real-time ding naa-update ang pinagsamang istatistika.",
    "f5-h": "Built-in at external na wallet",
    "f5-p": "Magbayad gamit ang built-in wallet ng StablePay, o ikonekta ang MetaMask o OKX Wallet.",
    "f6-h": "Kumpletong suporta sa 15 wika",
    "f6-p": "Suporta sa 15 wika kabilang ang Korean, English, Arabic at Chinese, at awtomatikong inaangkop ang font sa laki ng screen.",
    "lbl-app": "Aktuwal na screen ng app",
    "ttl-app": "Tingnan mismo",
    "sub-app": "Madaling gamitin ng kahit sino sa pamamagitan ng intuitive na UI nang walang komplikadong setup.",
    "app1-h": "Ipakita at i-convert ang presyo sa 21 currency",
    "app1-p": "Sa settings ng app, madaling irehistro ang payment currency, stablecoin at wallet address nang paisa-isang hakbang. Awtomatikong ipinapakita ang real-time exchange rate kaya hindi na kailangang magkalkula nang hiwalay.",
    "app1-li1": "1. Mga currency para sa presyo",
    "app1-li2": "Hakbang 2: Piliin ang stablecoin (USDT/USDC)",
    "app1-li3": "Hakbang 3: Irehistro ang sarili mong wallet address",
    "app1-li4": "Hakbang 4: Awtomatikong suriin ang balanse ng coin",
    "app1-li5": "Awtomatikong ipinapakita ang real-time exchange rate (hal. 1 USD = 1,441.97 KRW)",
    "app2-h": "Humiling ng bayad sa QR at aprubahan sa wallet",
    "app2-p": "Inilalagay ng seller ang halaga at gumagawa ng QR code. Ini-scan ito ng buyer sa app para suriin ang payment request.",
    "app2-li1": "Seller: Gumawa agad ng QR code pagkatapos ilagay ang halaga",
    "app2-li2": "I-scan ang QR ng seller o ilagay ang 7-digit OTP na natanggap para suriin ang request.",
    "app2-li3": "Suriin ang halaga at receiving wallet, saka aprubahan ang bayad sa piniling wallet.",
    "app2-li4": "Itakda ang bisa ng QR code (2 min / 5 min)",
    "app2-li5": "Awtomatikong naiipon ang sukli pagkatapos ng bayad",
    "lbl-how": "Paano Gamitin",
    "ttl-how": "Magsimula sa 4 na simpleng hakbang",
    "sub-how": "Mag-sign in sa app at piliin ang wallet na gagamitin sa pagbabayad.",
    "s1-h": "Mag-sign up gamit ang social login",
    "s1-p": "Mag-sign up gamit ang iyong Google, KakaoTalk, o Facebook account.",
    "s2-h": "Pumili ng currency at wallet",
    "s2-p": "Piliin ang lokal na currency at coin na pambayad (USDC o USDT). Magbayad gamit ang built-in wallet ng StablePay, o ikonekta ang MetaMask o OKX Wallet.",
    "s3-h": "Suriin ang QR o OTP request",
    "s3-p": "I-scan ang QR ng seller o ilagay ang 7-digit OTP na natanggap para suriin ang request.",
    "s4-h": "Aprubahan ang bayad sa wallet",
    "s4-p": "Suriin ang halaga at receiving wallet, saka aprubahan ang bayad sa piniling wallet.",
    "lbl-pricing": "Presyo",
    "ttl-pricing": "Magsimula sa makatwirang presyo",
    "sub-pricing": "Maaaring may blockchain network fee sa pagbabayad.",
    "plan1-tag": "Buyer",
    "plan1-h": "Magbayad nang walang subscription",
    "plan1-period": "subscription sa app",
    "plan1-desc": "Walang limitasyon sa bilang ng QR o OTP na pagbabayad ng buyer.",
    "plan1-f1": "Walang limitasyong QR scan payment",
    "plan1-f2": "Walang limitasyong OTP code payment",
    "plan1-f3": "Ipakita at i-convert ang presyo sa 21 currency",
    "plan1-f4": "Awtomatikong ipon ng sukli",
    "plan1-f5": "Suporta sa 15 wika",
    "plan2-tag": "Libreng Seller",
    "plan2-h": "Basic Seller",
    "plan2-period": "/ 5 beses bawat araw",
    "plan2-desc": "Gumawa ng hanggang 5 libreng QR o OTP payment request sa kabuuan bawat araw.",
    
    
    "plan2-f3": "Real-time exchange conversion",
    "plan2-f4": "Tingnan ang payment history",
    "plan3-tag": "Premium Member",
    "plan3-h": "Premium",
    "plan3-period": "/ 6 na buwan",
    "plan3-desc": "Gumawa ng walang limitasyong QR/OTP payment request. May taunang plan din na $75.",
    "plan3-f1": "Walang limitasyong paggawa ng QR/OTP",
    
    "plan3-f3": "Priyoridad na customer support",
    "plan3-f4": "Dashboard ng pinagsamang istatistika",
    "plan3-f5": "Taunang plan $75",
    "lbl-currencies": "Mga currency para sa presyo",
    "ttl-currencies": "Ipakita at i-convert ang presyo sa 21 currency",
    "sub-currencies": "Ipakita ang presyo sa lokal na currency at i-convert ito sa USDC o USDT gamit ang exchange rate.",
    "lbl-countries": "Google Play",
    "ttl-countries": "Availability ng Android app",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "Pinatutunayan ng Teknolohiya",
    "pat1-label": "PATENT 01",
    "pat1-h": "Patent 1: “QR-Based Stablecoin Payment System and Method”",
    "pat1-filed": "Petsa ng paghahain: 2025.06.17 (Application No.: 10-2025-0079540)",
    "pat1-registered": "Petsa ng rehistro: 2025.11.14 (Registration No.: 10-2888374-0000)",
    "pat1-pct": "PCT International Application No.: PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "Patent 2: “Web3-Based Payment Settlement and Tax Automation System Using Multiple Wallets”",
    "pat2-filed": "Petsa ng paghahain: 2025.12.31 (Application No.: 10-2025-0215773)",
    "pat2-registered": "Petsa ng rehistro: 2026.08.03 (Registration No.: 10-3001369-0000)",
    "pat2-pct": "PCT International Application No.: PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "Patent 3: “Blockchain Payment and Settlement System Using KYC-Linked Wallet Authorization Delegation and AI Agents”",
    "pat3-filed": "Petsa ng paghahain: 2026.03.31 (Application No.: 10-2026-0058433)",
    "pat3-status": "Kasalukuyang nasa priority examination (Patent Pending)",
    "footer-desc": "Magbayad sa cellphone gamit ang USDC o USDT sa pamamagitan ng QR o OTP",
    "footer-h-service": "Serbisyo",
    "footer-h-info": "Impormasyon",
    "footer-h-download": "Download",
    "footer-h-contact": "Makipag-ugnayan",
    "footer-features": "Pangunahing Tampok",
    "footer-app": "Screen ng App",
    "footer-how": "Paano Gamitin",
    "footer-pricing": "Presyo",
    "footer-currencies": "Suportadong Currency",
    "footer-patent": "Rehistradong Patent",
    "footer-contact": "Makipag-ugnayan",
    "footer-privacy": "Patakaran sa Pagkapribado",
    "footer-terms": "Mga Tuntunin sa Paggamit",
    "footer-privacy2": "Patakaran sa Pagkapribado",
    "footer-terms2": "Mga Tuntunin sa Paggamit",
    "modal-privacy-title": "🔐 Patakaran sa Pagkapribado",
    "modal-privacy-btn": "Isara",
    "modal-terms-title": "📋 Mga Tuntunin sa Paggamit",
    "modal-terms-btn": "Isara"
  },

  ar: {
    "hero-network": "ادفع باستخدام USDC أو USDT على شبكة Polygon.",
    "hero-fee-note": "Android · قد تُفرض رسوم شبكة البلوك تشين عند الدفع.",
    "btn-payment-demo": "شاهد عرض الدفع",
    "app-demo-caption": "عرض الدفع بعملة USDC عبر QR · بالإنجليزية",
    "sub-countries": "نزّل تطبيق Android في البلدان والمناطق التي يتوفر فيها على Google Play.",
    "page-title": "StablePay Labs | نظام دفع بالعملات المستقرة قائم على رمز QR",
    "nav-features": "المميزات", "nav-app": "التطبيق", "nav-how": "طريقة الاستخدام",
    "nav-pricing": "الأسعار", "nav-currencies": "العملات", "nav-patent": "البراءات",
    "nav-download": "تحميل",
    "cafe-caption": "ادفع في أي مكان بدون صرف العملة",
    "hero-badge-text": "مدفوعات Web3 بالعملات المستقرة",
    "hero-h1": "ادفع بهاتفك باستخدام<br><span>USDC أو USDT</span><br>عبر رمز QR أو OTP",
    "hero-p": "ينشئ البائع طلب دفع برمز QR أو OTP دون جهاز دفع منفصل. يراجع المشتري المبلغ والمحفظة المستلِمة ثم يوافق على الدفع بنفسه.",
    
    "fx-invisible-label": "هيكل مدفوعات العملات المستقرة",
    "fx-invisible-title": "عصر العملة المستقرة بالوون: حساب سعر الصرف لا يختفي بل يصبح 'غير مرئي'",
    "fx-invisible-sub": "العملة المستقرة ليست تقنية لإزالة صرف العملات الأجنبية، بل هي تقنية لرقمنة أصول التسوية. ما لم تتطابق معايير سعر المنتج وأصول المشتري وأصول تسوية البائع، فإن تحويل القيمة في الوقت الفعلي سيحدث دائمًا.",
    "fx-invisible-core": "مستقبل العملات المستقرة ليس إزالة سعر الصرف، بل جعل المستخدمين يدفعون دون الوعي به — التقنية التي تجعل التحويل والتسوية غير مرئيَين هي StablePay.",
    "fx-invisible-caption": "تحويل القيمة طبقة ضرورية لا يمكن تجاوزها. تحمي StablePay هيكل الدفع هذا بموجب براءة اختراع.",
    "fx-invisible-mobile": "انقر على الصورة لتكبيرها.",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
    "btn-download": "تنزيل Google Play", "btn-contact": "📩 تواصل معنا",
    "stat-currencies": "عملات عرض الأسعار", "stat-languages": "اللغات",
    "stat-patents": "البراءات",
    "lbl-features": "المميزات الرئيسية", "ttl-features": "لماذا StablePay؟",
    "sub-features": "أنشئ طلب الدفع وراجعه ووافق عليه باستخدام الهاتف الذكي.",
    "f1-h": "سعر صرف فوري", "f1-p": "اعرض السعر بالعملة المحلية وحوّله إلى مبلغ الدفع بعملة USDC أو USDT حسب سعر الصرف.",
    "f2-h": "مسح رمز QR + رمز OTP", "f2-p": "رمز QR للمدفوعات القريبة ورمز OTP مكوّن من 7 أرقام للمدفوعات عن بُعد — بسهولة وأمان.",
    "f3-h": "أمان ببصمة الإصبع", "f3-p": "مصادقة بيومترية للدخول إلى التطبيق وتوقيع المدفوعات. يتم تخزين المفتاح الخاص بتشفير AES-256.",
    "f4-h": "حفظ الفكة تلقائيًا", "f4-p": "المبالغ الأقل من 0.01 دولار أمريكي يتم حفظها تلقائيًا كنقاط مع إحصاءات فورية.",
    "f5-h": "محفظة مدمجة ومحافظ خارجية", "f5-p": "ادفع باستخدام محفظة StablePay المدمجة، أو اربط MetaMask أو OKX Wallet.",
    "f6-h": "يدعم 15 لغة", "f6-p": "يدعم 15 لغة منها الكورية والإنجليزية والعربية والصينية مع ضبط تلقائي لحجم الخط.",
    "lbl-app": "شاشات التطبيق", "ttl-app": "شاهده أثناء العمل",
    "sub-app": "واجهة سهلة الاستخدام تتيح لأي شخص البدء من دون إعدادات معقدة.",
    "app1-h": "عرض الأسعار وتحويلها بـ21 عملة",
    "app1-p": "سجّل العملة والعملة المستقرة وعنوان المحفظة خطوة بخطوة. يتم عرض أسعار الصرف المباشرة تلقائيًا.",
    "app1-li1": "1. عملات عرض الأسعار",
    "app1-li2": "الخطوة 2 : اختيار العملة المستقرة (USDT/USDC)",
    "app1-li3": "الخطوة 3 : تسجيل عنوان محفظتك",
    "app1-li4": "الخطوة 4 : التحقق التلقائي من رصيد العملة",
    "app1-li5": "عرض سعر الصرف المباشر (مثال: 1 USD = 1,441.97 KRW)",
    "app2-h": "اطلب الدفع برمز QR ووافق عليه في محفظتك",
    "app2-p": "يدخل البائع المبلغ وينشئ رمز QR، ويمسحه المشتري في التطبيق لمراجعة طلب الدفع.",
    "app2-li1": "البائع : أدخل المبلغ وأنشئ رمز QR فورًا",
    "app2-li2": "امسح رمز QR الخاص بالبائع أو أدخل رمز OTP المكوّن من 7 أرقام لمراجعة الطلب.",
    "app2-li3": "تحقق من المبلغ والمحفظة المستلِمة ثم وافق على الدفع في المحفظة التي اخترتها.",
    "app2-li4": "تحديد مدة صلاحية QR (دقيقتان / 5 دقائق)",
    "app2-li5": "حفظ الفكة تلقائيًا بعد الدفع",
    "lbl-how": "طريقة الاستخدام", "ttl-how": "ابدأ في 4 خطوات سهلة",
    "sub-how": "سجّل الدخول إلى التطبيق واختر المحفظة التي ستستخدمها للدفع.",
    "s1-h": "التسجيل عبر تسجيل الدخول الاجتماعي", "s1-p": "أنشئ حسابًا باستخدام Google أو KakaoTalk أو Facebook.",
    "s2-h": "اختر العملة والمحفظة", "s2-p": "اختر العملة المحلية وعملة الدفع (USDC أو USDT). ادفع باستخدام محفظة StablePay المدمجة، أو اربط MetaMask أو OKX Wallet.",
    "s3-h": "راجع طلب QR أو OTP", "s3-p": "امسح رمز QR الخاص بالبائع أو أدخل رمز OTP المكوّن من 7 أرقام لمراجعة الطلب.",
    "s4-h": "وافق على الدفع في محفظتك", "s4-p": "تحقق من المبلغ والمحفظة المستلِمة ثم وافق على الدفع في المحفظة التي اخترتها.",
    "lbl-pricing": "الأسعار", "ttl-pricing": "ابدأ بسعر ممتاز",
    "sub-pricing": "قد تُفرض رسوم شبكة البلوك تشين عند الدفع.",
    "plan1-tag": "مشتري", "plan1-h": "ادفع دون اشتراك", "plan1-period": "اشتراك التطبيق",
    "plan1-desc": "يمكن للمشتري الدفع باستخدام QR أو OTP دون حد لعدد الدفعات.",
    "plan1-f1": "مدفوعات QR غير محدودة", "plan1-f2": "مدفوعات OTP غير محدودة",
    "plan1-f3": "عرض الأسعار وتحويلها بـ21 عملة", "plan1-f4": "حفظ الفكة تلقائيًا", "plan1-f5": "يدعم 15 لغة",
    "plan2-tag": "بائع مجاني", "plan2-h": "البائع الأساسي", "plan2-period": "/ 5 مرات يوميًا",
    "plan2-desc": "أنشئ مجانًا ما يصل إلى 5 طلبات دفع يوميًا إجمالًا باستخدام QR أو OTP.",
    
    "plan2-f3": "سعر صرف فوري", "plan2-f4": "سجل المدفوعات",
    "plan3-tag": "مميز", "plan3-h": "Premium", "plan3-period": "/ 6 أشهر",
    "plan3-desc": "أنشئ طلبات دفع QR/OTP بلا حدود. تتوفر أيضًا خطة سنوية بسعر 75 دولارًا.",
    "plan3-f1": "إنشاء QR/OTP غير محدود", 
    "plan3-f3": "دعم أولوية", "plan3-f4": "لوحة إحصاءات تراكمية", "plan3-f5": "الخطة السنوية 75 دولارًا",
    "lbl-currencies": "عملات عرض الأسعار", "ttl-currencies": "عرض الأسعار وتحويلها بـ21 عملة",
    "sub-currencies": "اعرض السعر بالعملة المحلية وحوّله إلى مبلغ الدفع بعملة USDC أو USDT حسب سعر الصرف.",
    "lbl-countries": "Google Play", "ttl-countries": "توفّر تطبيق Android",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "مثبت بالتقنية",
    "pat1-label": "PATENT 01",
    "pat1-h": "البراءة 1: «نظام وطريقة دفع بالعملات المستقرة قائم على QR»",
    "pat1-filed": "تاريخ الإيداع: 2025.06.17 (رقم الطلب: 10-2025-0079540)",
    "pat1-registered": "تاريخ التسجيل: 2025.11.14 (رقم التسجيل: 10-2888374-0000)",
    "pat1-pct": "رقم طلب PCT الدولي: PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "البراءة 2: «نظام Web3 لتسوية المدفوعات والأتمتة الضريبية باستخدام محافظ متعددة»",
    "pat2-filed": "تاريخ الإيداع: 2025.12.31 (رقم الطلب: 10-2025-0215773)",
    "pat2-registered": "تاريخ التسجيل: 2026.08.03 (رقم التسجيل: 10-3001369-0000)",
    "pat2-pct": "رقم طلب PCT الدولي: PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "البراءة 3: «نظام دفع وتسوية بالبلوكتشين باستخدام تفويض صلاحيات المحافظ المرتبطة بـ KYC ووكلاء الذكاء الاصطناعي»",
    "pat3-filed": "تاريخ الإيداع: 2026.03.31 (رقم الطلب: 10-2026-0058433)",
    "pat3-status": "قيد الفحص ذي الأولوية حاليًا (Patent Pending)",
    "footer-desc": "ادفع بهاتفك باستخدام USDC أو USDT عبر رمز QR أو OTP",
    "footer-h-service": "الخدمات", "footer-h-info": "معلومات",
    "footer-h-download": "تحميل", "footer-h-contact": "تواصل",
    "footer-features": "المميزات", "footer-app": "شاشة التطبيق", "footer-how": "طريقة الاستخدام",
    "footer-pricing": "الأسعار", "footer-currencies": "العملات",
    "footer-patent": "البراءات", "footer-contact": "تواصل معنا",
    "footer-privacy": "سياسة الخصوصية", "footer-terms": "الشروط والأحكام",
    "footer-privacy2": "سياسة الخصوصية", "footer-terms2": "الشروط والأحكام",
    "modal-privacy-title": "🔐 سياسة الخصوصية", "modal-privacy-btn": "إغلاق",
    "modal-terms-title": "📋 الشروط والأحكام", "modal-terms-btn": "إغلاق"
  },
  en: {
    "hero-network": "Pay with USDC or USDT on the Polygon network.",
    "hero-fee-note": "Android · Network fees may apply at checkout.",
    "btn-payment-demo": "Watch the payment demo",
    "app-demo-caption": "USDC QR payment demo · A payment priced in Korean won",
    "sub-countries": "Download the Android app where it is available on Google Play.",
    "page-title": "StablePay Labs | USDC and USDT Payments by QR or OTP",
    "nav-features": "Features", "nav-app": "App Screens", "nav-how": "How It Works",
    "nav-pricing": "Pricing", "nav-currencies": "Currencies", "nav-patent": "Patents",
    "nav-download": "Download",
    "cafe-caption": "Pay anywhere. No exchange. Just scan.",
    "hero-badge-text": "Web3 Stablecoin Payment",
    "hero-h1": "Pay by phone with<br><span>USDC or USDT</span><br>via QR or OTP",
    "hero-p": "Sellers create a QR code or one-time code without a separate card terminal. Buyers verify the amount and recipient, then approve the payment in their own wallet.",
    
    "fx-invisible-label": "Stablecoin Payment Structure",
    "fx-invisible-title": "From Local Prices to Stablecoin Payments",
    "fx-invisible-sub": "Sellers enter the price in their local currency. StablePay calculates the corresponding amount in USDC or USDT and shows it to the buyer before approval.",
    "fx-invisible-core": "The buyer reviews the amount and approves the payment in their own wallet. The seller receives the stablecoins.",
    "fx-invisible-caption": "Payment example from South Korea. The price is entered in Korean won (KRW) and the payment is made in stablecoins.",
    "fx-invisible-mobile": "Tap the image to enlarge.",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
    "btn-download": "Google Play Download", "btn-contact": "📩 Contact Us",
    "stat-currencies": "Pricing currencies", "stat-languages": "Languages",
    "stat-patents": "Patents",
    "lbl-features": "KEY FEATURES", "ttl-features": "Why StablePay?",
    "sub-features": "Use a smartphone to request, review, and approve a payment.",
    "f1-h": "Real-time Exchange Rate", "f1-p": "Display prices in local currency and convert them to the USDC or USDT payment amount using the exchange rate.",
    "f2-h": "QR Scan + OTP Code", "f2-p": "Use a QR code for nearby payments and a 7-digit OTP for remote payments — simple and secure.",
    "f3-h": "Fingerprint Security", "f3-p": "Biometric authentication for app entry and payment signing. Private key stored with AES-256 encryption.",
    "f4-h": "Auto Spare Change", "f4-p": "Amounts under USD 0.01 are automatically saved as points, with totals updated in real time.",
    "f5-h": "Built-in and external wallets", "f5-p": "Pay with the built-in StablePay wallet, or connect MetaMask or OKX Wallet.",
    "f6-h": "15 Languages", "f6-p": "Supports 15 languages including Korean, English, Arabic, Chinese with auto font sizing.",
    "lbl-app": "APP SCREENSHOTS", "ttl-app": "See It in Action",
    "sub-app": "An intuitive interface that is easy to use without complicated setup.",
    "app1-h": "Show and convert prices in 21 currencies",
    "app1-p": "Register your currency, stablecoin, and wallet address step by step. Live exchange rates are displayed automatically.",
    "app1-li1": "1. Pricing currencies",
    "app1-li2": "Step 2 : Select stablecoin (USDT/USDC)",
    "app1-li3": "Step 3 : Register your wallet address",
    "app1-li4": "Step 4 : Auto-check coin balance",
    "app1-li5": "View the exchange rate used to convert the local price to USDC or USDT.",
    "app2-h": "Request by QR and approve in your wallet",
    "app2-p": "The seller enters the amount and creates a QR code. The buyer scans it in the app to review the payment request.",
    "app2-li1": "Seller : Enter amount and generate QR instantly",
    "app2-li2": "Scan the seller’s QR code or enter the 7-digit one-time code to review the request.",
    "app2-li3": "Verify the amount and receiving wallet, then approve the payment in your selected wallet.",
    "app2-li4": "Set QR expiry time (2 min / 5 min)",
    "app2-li5": "Spare change auto-saved after payment",
    "lbl-how": "HOW IT WORKS", "ttl-how": "Get Started in 4 Easy Steps",
    "sub-how": "Sign in to the app and choose the wallet you want to use.",
    "s1-h": "Sign Up with Google", "s1-p": "Sign up with your Google account. Facebook and KakaoTalk sign-in are also available.",
    "s2-h": "Choose a currency and wallet", "s2-p": "Select your local currency and a payment asset (USDC or USDT). Pay with the built-in StablePay wallet, or connect MetaMask or OKX Wallet.",
    "s3-h": "Review the QR or OTP request", "s3-p": "Scan the seller’s QR code or enter the 7-digit one-time code to review the request.",
    "s4-h": "Approve in your wallet", "s4-p": "Verify the amount and receiving wallet, then approve the payment in your selected wallet.",
    "lbl-pricing": "PRICING", "ttl-pricing": "Start at a Great Price",
    "sub-pricing": "Blockchain network fees may apply.",
    "plan1-tag": "Buyer", "plan1-h": "Pay without a subscription", "plan1-period": "app subscription",
    "plan1-desc": "Buyers can make unlimited QR or OTP payments.",
    "plan1-f1": "Unlimited QR scan payments", "plan1-f2": "Unlimited OTP code payments",
    "plan1-f3": "Show and convert prices in 21 currencies", "plan1-f4": "Auto spare change savings", "plan1-f5": "15 languages supported",
    "plan2-tag": "Seller Free", "plan2-h": "Basic Seller", "plan2-period": "/ 5 times/day",
    "plan2-desc": "Create up to 5 QR or OTP payment requests in total per day for free.",
    
    "plan2-f3": "Real-time exchange rate", "plan2-f4": "Payment history",
    "plan3-tag": "Premium", "plan3-h": "Premium", "plan3-period": "/ 6 months",
    "plan3-desc": "Create unlimited QR/OTP payment requests. An annual plan for $75 is also available.",
    "plan3-f1": "Unlimited QR/OTP generation", 
    "plan3-f3": "Priority support", "plan3-f4": "Cumulative stats dashboard", "plan3-f5": "Annual plan $75",
    "lbl-currencies": "Pricing currencies", "ttl-currencies": "Show and convert prices in 21 currencies",
    "sub-currencies": "Display prices in local currency and convert them to the USDC or USDT payment amount using the exchange rate.",
    "lbl-countries": "Google Play", "ttl-countries": "Android app availability",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "Proven by Technology",
    "pat1-label": "PATENT 01",
    "pat1-h": "Patent 1: “QR-Based Stablecoin Payment System and Method”",
    "pat1-filed": "Filing Date: 2025.06.17 (Application No.: 10-2025-0079540)",
    "pat1-registered": "Korean Patent Registration No. 10-2888374-0000 (Nov 14, 2025)",
    "pat1-pct": "PCT International Application No. PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "Patent 2: “Web3-Based Payment Settlement and Tax Automation System Using Multiple Wallets”",
    "pat2-filed": "Filing Date: 2025.12.31 (Application No.: 10-2025-0215773)",
    "pat2-registered": "Korean Patent Registration No. 10-3001369-0000 (Aug 3, 2026)",
    "pat2-pct": "PCT International Application No. PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "Patent 3: “Blockchain Payment and Settlement System Using KYC-Linked Wallet Authorization Delegation and AI Agents”",
    "pat3-filed": "Filing Date: 2026.03.31 (Application No.: 10-2026-0058433)",
    "pat3-status": "Currently under expedited examination (Patent Pending)",
    "footer-desc": "Pay by phone with USDC or USDT via QR or OTP",
    "footer-h-service": "Services", "footer-h-info": "Info",
    "footer-h-download": "Download", "footer-h-contact": "Contact",
    "footer-features": "Features", "footer-app": "App Screen", "footer-how": "How It Works",
    "footer-pricing": "Pricing", "footer-currencies": "Currencies",
    "footer-patent": "Patents", "footer-contact": "Contact Us",
    "footer-privacy": "Privacy Policy", "footer-terms": "Terms of Service",
    "footer-privacy2": "Privacy Policy", "footer-terms2": "Terms of Service",
    "modal-privacy-title": "🔐 Privacy Policy", "modal-privacy-btn": "Close",
    "modal-terms-title": "📋 Terms of Service", "modal-terms-btn": "Close"
  },
  de: {
    "hero-network": "Bezahlen Sie mit USDC oder USDT im Polygon-Netzwerk.",
    "hero-fee-note": "Android · Bei der Zahlung können Blockchain-Netzwerkgebühren anfallen.",
    "btn-payment-demo": "Zahlungsdemo ansehen",
    "app-demo-caption": "USDC-Zahlungsdemo per QR · Englisch",
    "sub-countries": "Lade die Android-App in den Ländern und Regionen herunter, in denen sie bei Google Play verfügbar ist.",
    "page-title": "StablePay Labs | QR-basiertes Stablecoin-Zahlungssystem",
    "nav-features": "Funktionen",
    "nav-app": "App",
    "nav-how": "So funktioniert's",
    "nav-pricing": "Preise",
    "nav-currencies": "Währungen",
    "nav-patent": "Patente",
    "nav-download": "Download",
    "cafe-caption": "Überall zahlen. Kein Umtausch nötig.",
    "hero-badge-text": "Web3-Stablecoin-Zahlung",
    "hero-h1": "Mit dem Smartphone bezahlen<br><span>USDC oder USDT</span><br>per QR-Code oder OTP",
    "hero-p": "Verkäufer erstellen Zahlungsanfragen per QR-Code oder OTP ohne separates Terminal. Käufer prüfen den Betrag und die Empfänger-Wallet und bestätigen die Zahlung selbst.",
    
    "fx-invisible-label": "Stablecoin-Zahlungsstruktur",
    "fx-invisible-title": "Das Zeitalter des KRW-Stablecoins: Die Wechselkursberechnung verschwindet nicht — sie wird 'unsichtbar'",
    "fx-invisible-sub": "Ein Stablecoin ist keine Technologie zur Eliminierung von FX, sondern zur Digitalisierung von Abrechnungsaktiva. Solange Produktpreis, Käufer-Asset und Verkäufer-Abrechnungs-Asset nicht übereinstimmen, findet eine Echtzeit-Wertkonvertierung statt.",
    "fx-invisible-core": "Die Zukunft von Stablecoins liegt nicht darin, FX zu eliminieren, sondern darin, dass Nutzer zahlen, ohne sich des Wechselkurses bewusst zu sein — die Technologie, die Konvertierung und Abrechnung unsichtbar macht, ist StablePay.",
    "fx-invisible-caption": "Wertkonvertierung ist eine unverzichtbare Schicht. StablePay schützt diese unsichtbare Konvertierungsstruktur durch Patente.",
    "fx-invisible-mobile": "Tippen Sie auf das Bild zum Vergrößern.",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
    "btn-download": "Google Play Download",
    "btn-contact": "📩 Kontakt",
    "stat-currencies": "Währungen für Preisanzeige",
    "stat-languages": "Sprachen",
    
    "stat-patents": "Patente",
    "lbl-features": "HAUPTFUNKTIONEN",
    "ttl-features": "Warum StablePay?",
    "sub-features": "Erstelle, prüfe und bestätige Zahlungsanfragen mit dem Smartphone.",
    "f1-h": "Echtzeit-Wechselkurs",
    "f1-p": "Zeige Preise in lokaler Währung an und rechne den Betrag zum Wechselkurs in USDC oder USDT um.",
    "f2-h": "QR-Scan + OTP-Code",
    "f2-p": "QR-Code für Zahlungen vor Ort, 7-stelliger OTP-Code für Fernzahlungen – einfach und sicher.",
    "f3-h": "Fingerabdruck-Sicherheit",
    "f3-p": "Biometrische Authentifizierung für App-Zugang und Zahlungssignatur. Der private Schlüssel wird sicher im Android Keystore gespeichert.",
    "f4-h": "Automatische Kleingeld-Speicherung",
    "f4-p": "Beträge unter 0,01 USD werden automatisch als Guthaben gespeichert – inklusive Statistik in Echtzeit.",
    "f5-h": "Integrierte und externe Wallets",
    "f5-p": "Bezahle mit der integrierten StablePay-Wallet oder verbinde MetaMask oder OKX Wallet.",
    "f6-h": "15 verfügbare Sprachen",
    "f6-p": "Unterstützt 15 Sprachen wie Koreanisch, Englisch, Arabisch und Chinesisch; die Schriftgröße passt sich automatisch an den Bildschirm an.",
    "lbl-app": "APP-SCREENSHOTS",
    "ttl-app": "So sieht es aus",
    "sub-app": "Eine intuitive Benutzeroberfläche, die sich auch ohne komplizierte Einrichtung leicht bedienen lässt.",
    "app1-h": "Preise in 21 Währungen anzeigen und umrechnen",
    "app1-p": "Registriere Währung, Stablecoin und Wallet-Adresse Schritt für Schritt. Live-Wechselkurse werden sofort angezeigt.",
    "app1-li1": "1. Währungen für Preisanzeige",
    "app1-li2": "Schritt 2: Stablecoin wählen (USDT/USDC)",
    "app1-li3": "Schritt 3: Wallet-Adresse registrieren",
    "app1-li4": "Schritt 4: Coin-Guthaben automatisch prüfen",
    "app1-li5": "Live-Wechselkursanzeige (z. B. 1 USD = 1.441,97 KRW)",
    "app2-h": "Per QR anfragen und in der Wallet bestätigen",
    "app2-p": "Der Verkäufer gibt den Betrag ein und erstellt einen QR-Code. Der Käufer scannt ihn in der App, um die Zahlungsanfrage zu prüfen.",
    "app2-li1": "Verkäufer: Betrag eingeben und QR sofort erstellen",
    "app2-li2": "Scanne den QR-Code des Verkäufers oder gib das 7-stellige OTP ein, um die Anfrage zu prüfen.",
    "app2-li3": "Prüfe Betrag und Empfänger-Wallet und bestätige die Zahlung in deiner ausgewählten Wallet.",
    "app2-li4": "QR-Ablaufzeit festlegen (2 Min / 5 Min)",
    "app2-li5": "Kleingeld wird nach der Zahlung automatisch gespeichert",
    "lbl-how": "SO FUNKTIONIERT'S",
    "ttl-how": "In 4 einfachen Schritten starten",
    "sub-how": "Melde dich in der App an und wähle die Wallet für deine Zahlungen aus.",
    "s1-h": "Mit Social Login registrieren",
    "s1-p": "Registriere dich mit deinem Google-, KakaoTalk- oder Facebook-Konto.",
    "s2-h": "Währung und Wallet auswählen",
    "s2-p": "Wähle die lokale Währung und den Stablecoin für die Zahlung (USDC oder USDT). Bezahle mit der integrierten StablePay-Wallet oder verbinde MetaMask oder OKX Wallet.",
    "s3-h": "QR- oder OTP-Anfrage prüfen",
    "s3-p": "Scanne den QR-Code des Verkäufers oder gib das 7-stellige OTP ein, um die Anfrage zu prüfen.",
    "s4-h": "Zahlung in der Wallet bestätigen",
    "s4-p": "Prüfe Betrag und Empfänger-Wallet und bestätige die Zahlung in deiner ausgewählten Wallet.",
    "lbl-pricing": "PREISE",
    "ttl-pricing": "Stark starten, günstig nutzen",
    "sub-pricing": "Bei der Zahlung können Blockchain-Netzwerkgebühren anfallen.",
    "plan1-tag": "Käufer",
    "plan1-h": "Bezahlen ohne Abo",
    "plan1-period": "App-Abogebühr",
    "plan1-desc": "Käufer können unbegrenzt per QR-Code oder OTP bezahlen.",
    "plan1-f1": "Unbegrenzte QR-Scan-Zahlungen",
    "plan1-f2": "Unbegrenzte OTP-Code-Zahlungen",
    "plan1-f3": "Preise in 21 Währungen anzeigen und umrechnen",
    "plan1-f4": "Automatische Kleingeld-Speicherung",
    "plan1-f5": "15 Sprachen unterstützt",
    "plan2-tag": "Verkäufer kostenlos",
    "plan2-h": "Basis-Verkäufer",
    "plan2-period": "/ 5-mal/Tag",
    "plan2-desc": "Erstelle pro Tag insgesamt bis zu 5 QR- oder OTP-Zahlungsanfragen kostenlos.",
    
    
    "plan2-f3": "Echtzeit-Wechselkurs",
    "plan2-f4": "Zahlungsverlauf",
    "plan3-tag": "Premium",
    "plan3-h": "Premium",
    "plan3-period": "/ 6 Monate",
    "plan3-desc": "Unbegrenzt QR-/OTP-Zahlungsanfragen erstellen. Ein Jahresplan für 75 $ ist ebenfalls verfügbar.",
    "plan3-f1": "Unbegrenzte QR-/OTP-Erstellung",
    
    "plan3-f3": "Priorisierter Support",
    "plan3-f4": "Dashboard für kumulative Statistiken",
    "plan3-f5": "Jahresplan 75 $",
    "lbl-currencies": "Währungen für Preisanzeige",
    "ttl-currencies": "Preise in 21 Währungen anzeigen und umrechnen",
    "sub-currencies": "Zeige Preise in lokaler Währung an und rechne den Betrag zum Wechselkurs in USDC oder USDT um.",
    "lbl-countries": "Google Play",
    "ttl-countries": "Verfügbarkeit der Android-App",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "Durch Technologie belegt",
    "pat1-label": "PATENT 01",
    "pat1-h": "Patent 1: „QR-basiertes Stablecoin-Zahlungssystem und Verfahren“",
    "pat1-filed": "Anmeldedatum: 2025.06.17 (Anmeldenummer: 10-2025-0079540)",
    "pat1-registered": "Registrierungsdatum: 2025.11.14 (Registrierungsnummer: 10-2888374-0000)",
    "pat1-pct": "PCT-Internationale Anmeldenummer: PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "Patent 2: „Web3-basiertes System zur Zahlungsabwicklung und Steuerautomatisierung mit mehreren Wallets“",
    "pat2-filed": "Anmeldedatum: 2025.12.31 (Anmeldenummer: 10-2025-0215773)",
    "pat2-registered": "Registrierungsdatum: 2026.08.03 (Registrierungsnummer: 10-3001369-0000)",
    "pat2-pct": "PCT-Internationale Anmeldenummer: PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "Patent 3: „Blockchain-Zahlungs- und Abwicklungssystem mit KYC-gekoppelter Wallet-Berechtigungsdelegation und KI-Agenten“",
    "pat3-filed": "Anmeldedatum: 2026.03.31 (Anmeldenummer: 10-2026-0058433)",
    "pat3-status": "Derzeit im beschleunigten Prüfungsverfahren (Patent Pending)",
    "footer-desc": "Mit dem Smartphone bezahlen USDC oder USDT per QR-Code oder OTP",
    "footer-h-service": "Services",
    "footer-h-info": "Info",
    "footer-h-download": "Download",
    "footer-h-contact": "Kontakt",
    "footer-features": "Funktionen",
    "footer-app": "App-Bildschirm",
    "footer-how": "So funktioniert's",
    "footer-pricing": "Preise",
    "footer-currencies": "Währungen",
    "footer-patent": "Patente",
    "footer-contact": "Kontakt",
    "footer-privacy": "Datenschutzerklärung",
    "footer-terms": "Nutzungsbedingungen",
    "footer-privacy2": "Datenschutzerklärung",
    "footer-terms2": "Nutzungsbedingungen",
    "modal-privacy-title": "🔐 Datenschutzerklärung",
    "modal-privacy-btn": "Schließen",
    "modal-terms-title": "📋 Nutzungsbedingungen",
    "modal-terms-btn": "Schließen"
  },

  fr: {
    "hero-network": "Payez en USDC ou en USDT sur le réseau Polygon.",
    "hero-fee-note": "Android · Des frais de réseau blockchain peuvent s’appliquer au paiement.",
    "btn-payment-demo": "Voir la démo de paiement",
    "app-demo-caption": "Démo du paiement en USDC par QR · Anglais",
    "sub-countries": "Téléchargez l’application Android dans les pays et régions où elle est disponible sur Google Play.",
    "page-title": "StablePay Labs | Système de paiement en stablecoin basé sur QR",
    "nav-features": "Fonctionnalités",
    "nav-app": "App",
    "nav-how": "Mode d'emploi",
    "nav-pricing": "Tarifs",
    "nav-currencies": "Devises",
    "nav-patent": "Brevets",
    "nav-download": "Télécharger",
    "cafe-caption": "Payez partout, sans échange de devises.",
    "hero-badge-text": "Paiement Web3 en stablecoin",
    "hero-h1": "Payez avec votre téléphone en<br><span>USDC ou USDT</span><br>par QR ou OTP",
    "hero-p": "Le vendeur crée une demande de paiement par QR ou OTP sans terminal dédié. L’acheteur vérifie le montant et le portefeuille destinataire avant d’approuver le paiement.",
    
    "fx-invisible-label": "Structure de paiement en Stablecoin",
    "fx-invisible-title": "L'ère du Stablecoin en KRW : le calcul du taux de change ne disparaît pas, il devient « invisible »",
    "fx-invisible-sub": "Un stablecoin n'est pas une technologie pour éliminer le change (FX), mais pour numériser l'actif de règlement. Tant que le prix du produit, l'actif de l'acheteur et l'actif de règlement du vendeur ne correspondent pas, une conversion de valeur en temps réel doit obligatoirement se produire.",
    "fx-invisible-core": "L'avenir des stablecoins n'est pas d'éliminer le taux de change, mais de permettre aux utilisateurs de payer sans en être conscients — la technologie qui rend la conversion et le règlement invisibles, c'est StablePay.",
    "fx-invisible-caption": "La conversion de valeur est une couche essentielle incontournable. StablePay protège par brevet cette structure de paiement à conversion invisible.",
    "fx-invisible-mobile": "Appuyez sur l'image pour l'agrandir.",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
    "btn-download": "Télécharger sur Google Play",
    "btn-contact": "📩 Contactez-nous",
    "stat-currencies": "Devises d’affichage des prix",
    "stat-languages": "Langues",
    
    "stat-patents": "Brevets",
    "lbl-features": "FONCTIONNALITÉS CLÉS",
    "ttl-features": "Pourquoi StablePay ?",
    "sub-features": "Créez, vérifiez et approuvez une demande de paiement sur votre téléphone.",
    "f1-h": "Taux de change en temps réel",
    "f1-p": "Affichez le prix en devise locale et convertissez-le en montant à payer en USDC ou USDT selon le taux de change.",
    "f2-h": "Scan QR + code OTP",
    "f2-p": "Paiement simple partout : QR pour les paiements de proximité, code OTP à 7 chiffres pour les paiements à distance.",
    "f3-h": "Sécurité biométrique",
    "f3-p": "Authentification biométrique pour l'accès et la signature du paiement. La clé privée est sécurisée via Android Keystore + AES-256.",
    "f4-h": "Petite monnaie créditée automatiquement",
    "f4-p": "Les montants inférieurs à 0,01 USD sont automatiquement crédités en points, avec un suivi en temps réel.",
    "f5-h": "Portefeuille intégré et portefeuilles externes",
    "f5-p": "Payez avec le portefeuille intégré de StablePay ou connectez MetaMask ou OKX Wallet.",
    "f6-h": "15 langues prises en charge",
    "f6-p": "Prend en charge 15 langues, dont le coréen, l'anglais, l'arabe et le chinois, avec adaptation automatique des polices.",
    "lbl-app": "ÉCRANS DE L'APPLICATION",
    "ttl-app": "Découvrez l'application",
    "sub-app": "Une interface intuitive que tout le monde peut utiliser facilement, sans configuration complexe.",
    "app1-h": "Afficher et convertir les prix dans 21 devises",
    "app1-p": "Dans les paramètres de l'application, enregistrez étape par étape la devise de paiement, le stablecoin et l'adresse du portefeuille. Le taux en temps réel est affiché automatiquement.",
    "app1-li1": "1. Devises d’affichage des prix",
    "app1-li2": "Étape 2 : choisir le stablecoin (USDT/USDC)",
    "app1-li3": "Étape 3 : enregistrer votre adresse de portefeuille",
    "app1-li4": "Étape 4 : vérification automatique du solde",
    "app1-li5": "Affichage automatique du taux en temps réel (ex. : 1 USD = 1 441,97 KRW)",
    "app2-h": "Demandez un paiement par QR et approuvez-le dans votre portefeuille",
    "app2-p": "Le vendeur saisit le montant et crée un code QR. L’acheteur le scanne dans l’application pour vérifier la demande de paiement.",
    "app2-li1": "Vendeur : générer immédiatement un QR après saisie du montant",
    "app2-li2": "Scannez le QR du vendeur ou saisissez le code OTP à 7 chiffres reçu pour vérifier la demande.",
    "app2-li3": "Vérifiez le montant et le portefeuille destinataire, puis approuvez dans le portefeuille choisi.",
    "app2-li4": "Durée de validité du QR (2 min / 5 min)",
    "app2-li5": "Accumulation automatique de la monnaie après paiement",
    "lbl-how": "COMMENT ÇA MARCHE",
    "ttl-how": "Commencez en 4 étapes simples",
    "sub-how": "Connectez-vous à l’application et choisissez votre portefeuille de paiement.",
    "s1-h": "Inscription par connexion sociale",
    "s1-p": "Inscrivez-vous avec votre compte Google, KakaoTalk ou Facebook.",
    "s2-h": "Choisir la devise et le portefeuille",
    "s2-p": "Choisissez la devise locale et le stablecoin à utiliser (USDC ou USDT). Payez avec le portefeuille intégré de StablePay ou connectez MetaMask ou OKX Wallet.",
    "s3-h": "Vérifier la demande QR ou OTP",
    "s3-p": "Scannez le QR du vendeur ou saisissez le code OTP à 7 chiffres reçu pour vérifier la demande.",
    "s4-h": "Approuver dans le portefeuille",
    "s4-p": "Vérifiez le montant et le portefeuille destinataire, puis approuvez dans le portefeuille choisi.",
    "lbl-pricing": "TARIFS",
    "ttl-pricing": "Commencez à un prix raisonnable",
    "sub-pricing": "Des frais de réseau blockchain peuvent s’appliquer au paiement.",
    "plan1-tag": "Acheteur",
    "plan1-h": "Payer sans abonnement",
    "plan1-period": "abonnement à l’application",
    "plan1-desc": "Les acheteurs peuvent effectuer un nombre illimité de paiements par QR ou OTP.",
    "plan1-f1": "Paiements QR illimités",
    "plan1-f2": "Paiements par code OTP illimités",
    "plan1-f3": "Afficher et convertir les prix dans 21 devises",
    "plan1-f4": "Monnaie cumulée automatiquement",
    "plan1-f5": "15 langues prises en charge",
    "plan2-tag": "Vendeur gratuit",
    "plan2-h": "Vendeur standard",
    "plan2-period": "/ 5 fois par jour",
    "plan2-desc": "Créez gratuitement jusqu’à 5 demandes de paiement par QR ou OTP par jour au total.",
    
    
    "plan2-f3": "Conversion au taux en temps réel",
    "plan2-f4": "Historique des paiements",
    "plan3-tag": "Membre premium",
    "plan3-h": "Premium",
    "plan3-period": "/ 6 mois",
    "plan3-desc": "Créez des demandes de paiement QR/OTP illimitées. Une formule annuelle à 75 $ est également disponible.",
    "plan3-f1": "Génération illimitée de QR/OTP",
    
    "plan3-f3": "Support prioritaire",
    "plan3-f4": "Tableau de bord des statistiques",
    "plan3-f5": "Forfait annuel 75 $",
    "lbl-currencies": "Devises d’affichage des prix",
    "ttl-currencies": "Afficher et convertir les prix dans 21 devises",
    "sub-currencies": "Affichez le prix en devise locale et convertissez-le en montant à payer en USDC ou USDT selon le taux de change.",
    "lbl-countries": "Google Play",
    "ttl-countries": "Disponibilité de l’application Android",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "Une technologie qui fait ses preuves",
    "pat1-label": "PATENT 01",
    "pat1-h": "Brevet 1 : « Système et méthode de paiement en stablecoin basé sur QR »",
    "pat1-filed": "Date de dépôt : 2025.06.17 (Demande n° : 10-2025-0079540)",
    "pat1-registered": "Date d’enregistrement : 2025.11.14 (N° d’enregistrement : 10-2888374-0000)",
    "pat1-pct": "N° de demande internationale PCT : PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "Brevet 2 : « Système Web3 de règlement des paiements et d’automatisation fiscale utilisant plusieurs portefeuilles »",
    "pat2-filed": "Date de dépôt : 2025.12.31 (Demande n° : 10-2025-0215773)",
    "pat2-registered": "Date d’enregistrement : 2026.08.03 (N° d’enregistrement : 10-3001369-0000)",
    "pat2-pct": "N° de demande internationale PCT : PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "Brevet 3 : « Système de paiement et de règlement blockchain utilisant la délégation d’autorisation de portefeuille liée au KYC et des agents IA »",
    "pat3-filed": "Date de dépôt : 2026.03.31 (Demande n° : 10-2026-0058433)",
    "pat3-status": "Actuellement en examen prioritaire (Patent Pending)",
    "footer-desc": "Payez avec votre téléphone en USDC ou USDT par QR ou OTP",
    "footer-h-service": "Service",
    "footer-h-info": "Informations",
    "footer-h-download": "Téléchargement",
    "footer-h-contact": "Contact",
    "footer-features": "Fonctionnalités clés",
    "footer-app": "Écrans de l'app",
    "footer-how": "Comment ça marche",
    "footer-pricing": "Tarifs",
    "footer-currencies": "Devises",
    "footer-patent": "Brevets",
    "footer-contact": "Contactez-nous",
    "footer-privacy": "Politique de confidentialité",
    "footer-terms": "Conditions générales d'utilisation",
    "footer-privacy2": "Politique de confidentialité",
    "footer-terms2": "Conditions générales d'utilisation",
    "modal-privacy-title": "🔐 Politique de confidentialité",
    "modal-privacy-btn": "Confirmer",
    "modal-terms-title": "📋 Conditions générales d'utilisation",
    "modal-terms-btn": "Confirmer"
  },
  pt: {
    "hero-network": "Pague com USDC ou USDT na rede Polygon.",
    "hero-fee-note": "Android · O pagamento pode ter taxas da rede blockchain.",
    "btn-payment-demo": "Veja a demonstração do pagamento",
    "app-demo-caption": "Demonstração de pagamento em USDC por QR · Inglês",
    "sub-countries": "Baixe o aplicativo Android nos países e regiões em que está disponível no Google Play.",
      "page-title": "StablePay Labs | Sistema de pagamento com stablecoin baseado em QR",
      "nav-features": "Recursos",
      "nav-app": "App",
      "nav-how": "Como usar",
      "nav-pricing": "Planos",
      "nav-currencies": "Moedas",
      "nav-patent": "Patentes",
      "nav-download": "Baixar",
    "cafe-caption": "Pague em qualquer lugar, sem câmbio.",
      "hero-badge-text": "Pagamentos Web3 com stablecoins",
      "hero-h1": "Pague pelo celular com<br><span>USDC ou USDT</span><br>via QR ou OTP",
      "hero-p": "O vendedor cria uma solicitação de pagamento por QR ou OTP sem um terminal separado. O comprador confere o valor e a carteira de destino antes de aprovar.",
    
    "fx-invisible-label": "Estrutura de Pagamento em Stablecoin",
    "fx-invisible-title": "A era do KRW Stablecoin: o cálculo da taxa de câmbio não desaparece — torna-se 'invisível'",
    "fx-invisible-sub": "Um stablecoin não é uma tecnologia para eliminar o câmbio (FX), mas para digitalizar o ativo de liquidação. Enquanto o preço do produto, o ativo do comprador e o ativo de liquidação do vendedor não coincidirem, a conversão de valor em tempo real ocorrerá inevitavelmente.",
    "fx-invisible-core": "O futuro dos stablecoins não é eliminar o câmbio, mas fazer com que os usuários paguem sem perceber a taxa — a tecnologia que torna a conversão e liquidação invisíveis é o StablePay.",
    "fx-invisible-caption": "A conversão de valor é uma camada essencial indispensável. O StablePay protege essa estrutura de pagamento com conversão invisível por meio de patentes.",
    "fx-invisible-mobile": "Toque na imagem para ampliar.",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
      "btn-download": "Baixar no Google Play",
      "btn-contact": "📩 Fale conosco",
      "stat-currencies": "Moedas para exibir preços",
      "stat-languages": "Idiomas",
      
      "stat-patents": "Patentes",
      "lbl-features": "RECURSOS PRINCIPAIS",
      "ttl-features": "Por que escolher a StablePay Labs?",
      "sub-features": "Use o celular para solicitar, conferir e aprovar um pagamento.",
      "f1-h": "Câmbio em tempo real",
      "f1-p": "Exiba o preço em moeda local e converta o valor para USDC ou USDT pela taxa de câmbio.",
      "f2-h": "QR + código OTP",
      "f2-p": "Pagamento simples em qualquer lugar: QR para curta distância e código OTP de 7 dígitos para pagamentos remotos.",
      "f3-h": "Segurança biométrica",
      "f3-p": "Autenticação biométrica para acesso e assinatura do pagamento. A chave privada é protegida com Android Keystore + AES-256.",
      "f4-h": "Troco acumulado automaticamente",
      "f4-p": "Valores abaixo de US$ 0,01 são acumulados automaticamente em pontos, com estatísticas em tempo real.",
      "f5-h": "Carteira integrada e carteiras externas",
      "f5-p": "Pague com a carteira integrada da StablePay ou conecte a MetaMask ou a OKX Wallet.",
      "f6-h": "Suporte a 15 idiomas",
      "f6-p": "Suporta 15 idiomas, incluindo coreano, inglês, árabe e chinês, com ajuste automático de fontes.",
      "lbl-app": "TELAS REAIS DO APLICATIVO",
      "ttl-app": "Veja como funciona",
      "sub-app": "Uma interface intuitiva para qualquer pessoa usar com facilidade, sem configuração complicada.",
      "app1-h": "Exiba e converta preços em 21 moedas",
      "app1-p": "Nas configurações do app, cadastre passo a passo a moeda de pagamento, a stablecoin e o endereço da carteira. A taxa em tempo real aparece automaticamente.",
      "app1-li1": "1. Moedas para exibir preços",
      "app1-li2": "Passo 2: escolher a stablecoin (USDT/USDC)",
      "app1-li3": "Passo 3: informar o endereço da sua carteira",
      "app1-li4": "Passo 4: verificação automática de saldo",
      "app1-li5": "Exibição automática da taxa em tempo real (ex.: 1 USD = 1.441,97 KRW)",
      "app2-h": "Solicite por QR e aprove na carteira",
      "app2-p": "O vendedor informa o valor e gera um código QR. O comprador escaneia o código no aplicativo para conferir a solicitação de pagamento.",
      "app2-li1": "Vendedor: gerar QR imediatamente após inserir o valor",
      "app2-li2": "Escaneie o QR do vendedor ou digite o OTP de 7 dígitos recebido para conferir a solicitação.",
      "app2-li3": "Confira o valor e a carteira de destino e aprove o pagamento na carteira escolhida.",
      "app2-li4": "Tempo de validade do QR (2 min / 5 min)",
      "app2-li5": "Acúmulo automático de troco após o pagamento",
      "lbl-how": "COMO USAR",
      "ttl-how": "Comece em 4 passos simples",
      "sub-how": "Entre no aplicativo e escolha a carteira que vai usar para pagar.",
      "s1-h": "Cadastro com login social",
      "s1-p": "Cadastre-se com sua conta Google, KakaoTalk ou Facebook.",
      "s2-h": "Escolha a moeda e a carteira",
      "s2-p": "Selecione a moeda local e o ativo de pagamento (USDC ou USDT). Pague com a carteira integrada da StablePay ou conecte a MetaMask ou a OKX Wallet.",
      "s3-h": "Confira a solicitação por QR ou OTP",
      "s3-p": "Escaneie o QR do vendedor ou digite o OTP de 7 dígitos recebido para conferir a solicitação.",
      "s4-h": "Aprove na carteira",
      "s4-p": "Confira o valor e a carteira de destino e aprove o pagamento na carteira escolhida.",
      "lbl-pricing": "PLANOS E PREÇOS",
      "ttl-pricing": "Comece com um plano acessível",
      "sub-pricing": "O pagamento pode ter taxas da rede blockchain.",
      "plan1-tag": "Comprador",
      "plan1-h": "Pague sem assinatura",
      "plan1-period": "assinatura do aplicativo",
      "plan1-desc": "Compradores podem fazer pagamentos ilimitados por QR ou OTP.",
      "plan1-f1": "Pagamentos via QR ilimitados",
      "plan1-f2": "Pagamentos por código OTP ilimitados",
      "plan1-f3": "Exiba e converta preços em 21 moedas",
      "plan1-f4": "Troco acumulado automaticamente",
      "plan1-f5": "Suporte a 15 idiomas",
      "plan2-tag": "Vendedor grátis",
      "plan2-h": "Vendedor padrão",
      "plan2-period": "/ 5 vezes por dia",
      "plan2-desc": "Crie gratuitamente até 5 solicitações de pagamento por QR ou OTP por dia no total.",
      
      
      "plan2-f3": "Conversão com taxa em tempo real",
      "plan2-f4": "Histórico de pagamentos",
      "plan3-tag": "Membro premium",
      "plan3-h": "Premium",
      "plan3-period": "/ 6 meses",
      "plan3-desc": "Crie solicitações de pagamento QR/OTP ilimitadas. Plano anual de US$ 75 também disponível.",
      "plan3-f1": "Geração ilimitada de QR/OTP",
      
      "plan3-f3": "Suporte prioritário",
      "plan3-f4": "Painel de estatísticas",
      "plan3-f5": "Plano anual de US$ 75",
      "lbl-currencies": "Moedas para exibir preços",
      "ttl-currencies": "Exiba e converta preços em 21 moedas",
      "sub-currencies": "Exiba o preço em moeda local e converta o valor para USDC ou USDT pela taxa de câmbio.",
      "lbl-countries": "Google Play",
      "ttl-countries": "Disponibilidade do aplicativo Android",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "Comprovado pela tecnologia",
    "pat1-label": "PATENT 01",
    "pat1-h": "Patente 1: “Sistema e método de pagamento com stablecoin baseado em QR”",
    "pat1-filed": "Data do depósito: 2025.06.17 (Pedido nº: 10-2025-0079540)",
    "pat1-registered": "Data do registro: 2025.11.14 (Registro nº: 10-2888374-0000)",
    "pat1-pct": "Pedido internacional PCT nº: PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "Patente 2: “Sistema Web3 de liquidação de pagamentos e automação fiscal usando múltiplas carteiras”",
    "pat2-filed": "Data do depósito: 2025.12.31 (Pedido nº: 10-2025-0215773)",
    "pat2-registered": "Data do registro: 2026.08.03 (Registro nº: 10-3001369-0000)",
    "pat2-pct": "Pedido internacional PCT nº: PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "Patente 3: “Sistema de pagamento e liquidação em blockchain usando delegação de autorização de carteira vinculada a KYC e agentes de IA”",
    "pat3-filed": "Data do depósito: 2026.03.31 (Pedido nº: 10-2026-0058433)",
    "pat3-status": "Atualmente em exame prioritário (Patent Pending)",
      "footer-desc": "Pague pelo celular com USDC ou USDT via QR ou OTP",
      "footer-h-service": "Serviço",
      "footer-h-info": "Informações",
      "footer-h-download": "Download",
      "footer-h-contact": "Contato",
      "footer-features": "Recursos principais",
      "footer-app": "Telas do app",
      "footer-how": "Como usar",
      "footer-pricing": "Planos",
      "footer-currencies": "Moedas",
      "footer-patent": "Patentes",
      "footer-contact": "Fale conosco",
      "footer-privacy": "Política de Privacidade",
      "footer-terms": "Termos e Condições de Uso",
      "footer-privacy2": "Política de Privacidade",
      "footer-terms2": "Termos e Condições de Uso",
      "modal-privacy-title": "🔐 Política de Privacidade",
      "modal-privacy-btn": "Entendi",
      "modal-terms-title": "📋 Termos e Condições de Uso",
      "modal-terms-btn": "Entendi"
  },
  es: {
    "hero-network": "Paga con USDC o USDT en la red Polygon.",
    "hero-fee-note": "Android · Pueden aplicarse comisiones de la red blockchain al pagar.",
    "btn-payment-demo": "Ver demostración de pago",
    "app-demo-caption": "Demostración de pago en USDC por QR · Inglés",
    "sub-countries": "Descarga la aplicación Android en los países y regiones donde está disponible en Google Play.",
      "page-title": "StablePay Labs | Sistema de pago con stablecoins basado en QR",
      "nav-features": "Funciones",
      "nav-app": "Pantallas",
      "nav-how": "Cómo usar",
      "nav-pricing": "Planes",
      "nav-currencies": "Monedas",
      "nav-patent": "Patentes",
      "nav-download": "Descargar app",
    "cafe-caption": "Paga en cualquier lugar sin cambio.",
      "hero-badge-text": "Pago Web3 con stablecoins",
      "hero-h1": "Paga con tu móvil en<br><span>USDC o USDT</span><br>mediante QR u OTP",
      "hero-p": "El vendedor crea una solicitud de pago por QR u OTP sin un terminal independiente. El comprador comprueba el importe y la cartera receptora antes de aprobar.",
    
    "fx-invisible-label": "Estructura de pago en Stablecoin",
    "fx-invisible-title": "La era del KRW Stablecoin: el cálculo del tipo de cambio no desaparece, se vuelve 'invisible'",
    "fx-invisible-sub": "Un stablecoin no es una tecnología para eliminar el FX, sino para digitalizar el activo de liquidación. Mientras el precio del producto, el activo del comprador y el activo de liquidación del vendedor no coincidan, la conversión de valor en tiempo real inevitablemente ocurrirá.",
    "fx-invisible-core": "El futuro de los stablecoins no es eliminar el tipo de cambio, sino hacer que los usuarios paguen sin ser conscientes de él — la tecnología que hace invisible la conversión y liquidación es StablePay.",
    "fx-invisible-caption": "La conversión de valor es una capa esencial que no se puede omitir. StablePay protege esta estructura de pago con conversión invisible mediante patentes.",
    "fx-invisible-mobile": "Toca la imagen para ampliarla.",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
      "btn-download": "Descargar en Google Play",
      "btn-contact": "📩 Contáctanos",
      "stat-currencies": "Monedas para mostrar precios",
      "stat-languages": "Idiomas",
      
      "stat-patents": "Patentes",
      "lbl-features": "FUNCIONES PRINCIPALES",
      "ttl-features": "¿Por qué elegir StablePay?",
      "sub-features": "Crea, revisa y aprueba solicitudes de pago desde el móvil.",
      "f1-h": "Tipo de cambio en tiempo real",
      "f1-p": "Muestra el precio en moneda local y conviértelo en el importe a pagar en USDC o USDT según el tipo de cambio.",
      "f2-h": "QR + código OTP",
      "f2-p": "Pago sencillo en cualquier lugar: QR para pagos presenciales y un código OTP de 7 dígitos para pagos a distancia.",
      "f3-h": "Seguridad biométrica",
      "f3-p": "Autenticación biométrica para acceso y firma del pago. La clave privada se protege con Android Keystore + AES-256.",
      "f4-h": "Cambio acreditado automáticamente",
      "f4-p": "Los importes inferiores a 0,01 USD se acumulan automáticamente como puntos, con estadísticas en tiempo real.",
      "f5-h": "Cartera integrada y carteras externas",
      "f5-p": "Paga con la cartera integrada de StablePay o conecta MetaMask u OKX Wallet.",
      "f6-h": "Soporte en 15 idiomas",
      "f6-p": "Admite 15 idiomas, incluidos coreano, inglés, árabe y chino, con ajuste automático de fuentes.",
      "lbl-app": "PANTALLAS REALES DE LA APLICACIÓN",
      "ttl-app": "Compruébelo usted mismo",
      "sub-app": "Una interfaz intuitiva que cualquiera puede usar con facilidad, sin configuraciones complicadas.",
      "app1-h": "Muestra y convierte precios en 21 monedas",
      "app1-p": "En la configuración de la app, registra paso a paso la moneda de pago, la stablecoin y la dirección de tu cartera. El tipo de cambio en tiempo real aparece automáticamente.",
      "app1-li1": "1. Monedas para mostrar precios",
      "app1-li2": "Paso 2: elegir stablecoin (USDT/USDC)",
      "app1-li3": "Paso 3: registrar tu dirección de cartera",
      "app1-li4": "Paso 4: verificación automática del saldo",
      "app1-li5": "Visualización automática del tipo de cambio en tiempo real (ej.: 1 USD = 1.441,97 KRW)",
      "app2-h": "Solicita por QR y aprueba en tu cartera",
      "app2-p": "El vendedor introduce el importe y crea un código QR. El comprador lo escanea en la aplicación para revisar la solicitud de pago.",
      "app2-li1": "Vendedor: generar QR inmediatamente tras introducir el importe",
      "app2-li2": "Escanea el QR del vendedor o introduce el código OTP de 7 dígitos recibido para revisar la solicitud.",
      "app2-li3": "Comprueba el importe y la cartera receptora y aprueba el pago en la cartera que hayas elegido.",
      "app2-li4": "Tiempo de validez del QR (2 min / 5 min)",
      "app2-li5": "Acumulación automática del cambio tras el pago",
      "lbl-how": "CÓMO USAR",
      "ttl-how": "Empieza en 4 pasos sencillos",
      "sub-how": "Inicia sesión en la aplicación y elige la cartera que usarás para pagar.",
      "s1-h": "Registro con inicio de sesión social",
      "s1-p": "Regístrate con tu cuenta de Google, KakaoTalk o Facebook.",
      "s2-h": "Elige la moneda y la cartera",
      "s2-p": "Selecciona la moneda local y el activo de pago (USDC o USDT). Paga con la cartera integrada de StablePay o conecta MetaMask u OKX Wallet.",
      "s3-h": "Revisa la solicitud QR u OTP",
      "s3-p": "Escanea el QR del vendedor o introduce el código OTP de 7 dígitos recibido para revisar la solicitud.",
      "s4-h": "Aprueba en tu cartera",
      "s4-p": "Comprueba el importe y la cartera receptora y aprueba el pago en la cartera que hayas elegido.",
      "lbl-pricing": "PLANES",
      "ttl-pricing": "Empieza con un precio accesible",
      "sub-pricing": "Pueden aplicarse comisiones de la red blockchain al pagar.",
      "plan1-tag": "Comprador",
      "plan1-h": "Paga sin suscripción",
      "plan1-period": "suscripción de la aplicación",
      "plan1-desc": "Los compradores pueden pagar por QR u OTP sin límite de operaciones.",
      "plan1-f1": "Pagos QR ilimitados",
      "plan1-f2": "Pagos con código OTP ilimitados",
      "plan1-f3": "Muestra y convierte precios en 21 monedas",
      "plan1-f4": "Cambio acumulado automáticamente",
      "plan1-f5": "Soporte en 15 idiomas",
      "plan2-tag": "Vendedor gratis",
      "plan2-h": "Vendedor estándar",
      "plan2-period": "/ 5 veces al día",
      "plan2-desc": "Crea gratis hasta 5 solicitudes de pago por QR u OTP en total al día.",
      
      
      "plan2-f3": "Conversión con tipo de cambio en tiempo real",
      "plan2-f4": "Historial de pagos",
      "plan3-tag": "Miembro premium",
      "plan3-h": "Premium",
      "plan3-period": "/ 6 meses",
      "plan3-desc": "Crea solicitudes de pago QR/OTP ilimitadas. También hay un plan anual de 75 USD.",
      "plan3-f1": "Generación ilimitada de QR/OTP",
      
      "plan3-f3": "Soporte prioritario",
      "plan3-f4": "Panel de estadísticas",
      "plan3-f5": "Plan anual de 75 USD",
      "lbl-currencies": "Monedas para mostrar precios",
      "ttl-currencies": "Muestra y convierte precios en 21 monedas",
      "sub-currencies": "Muestra el precio en moneda local y conviértelo en el importe a pagar en USDC o USDT según el tipo de cambio.",
      "lbl-countries": "Google Play",
      "ttl-countries": "Disponibilidad de la aplicación Android",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "Tecnología demostrada",
    "pat1-label": "PATENT 01",
    "pat1-h": "Patente 1: «Sistema y método de pago con stablecoins basado en QR»",
    "pat1-filed": "Fecha de solicitud: 2025.06.17 (N.º de solicitud: 10-2025-0079540)",
    "pat1-registered": "Fecha de registro: 2025.11.14 (N.º de registro: 10-2888374-0000)",
    "pat1-pct": "N.º de solicitud internacional PCT: PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "Patente 2: «Sistema Web3 de liquidación de pagos y automatización fiscal con múltiples carteras»",
    "pat2-filed": "Fecha de solicitud: 2025.12.31 (N.º de solicitud: 10-2025-0215773)",
    "pat2-registered": "Fecha de registro: 2026.08.03 (N.º de registro: 10-3001369-0000)",
    "pat2-pct": "N.º de solicitud internacional PCT: PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "Patente 3: «Sistema de pago y liquidación blockchain con delegación de autorización de cartera vinculada a KYC y agentes de IA»",
    "pat3-filed": "Fecha de solicitud: 2026.03.31 (N.º de solicitud: 10-2026-0058433)",
    "pat3-status": "Actualmente en examen prioritario (Patent Pending)",
      "footer-desc": "Paga con tu móvil en USDC o USDT mediante QR u OTP",
      "footer-h-service": "Servicio",
      "footer-h-info": "Información",
      "footer-h-download": "Descarga",
      "footer-h-contact": "Contacto",
      "footer-features": "Funciones principales",
      "footer-app": "Pantallas de la app",
      "footer-how": "Cómo usar",
      "footer-pricing": "Planes",
      "footer-currencies": "Monedas",
      "footer-patent": "Patentes",
      "footer-contact": "Contáctanos",
      "footer-privacy": "Política de privacidad",
      "footer-terms": "Términos y condiciones",
      "footer-privacy2": "Política de privacidad",
      "footer-terms2": "Términos y condiciones",
      "modal-privacy-title": "🔐 Política de privacidad",
      "modal-privacy-btn": "Entendido",
      "modal-terms-title": "📋 Términos y condiciones de uso",
      "modal-terms-btn": "Entendido"
  },
  hi: {
    "hero-network": "Polygon नेटवर्क पर USDC या USDT से भुगतान करें।",
    "hero-fee-note": "Android · भुगतान पर ब्लॉकचेन नेटवर्क शुल्क लग सकता है।",
    "btn-payment-demo": "भुगतान का वीडियो देखें",
    "app-demo-caption": "USDC QR भुगतान का वीडियो · अंग्रेज़ी",
    "sub-countries": "Android ऐप उन देशों और क्षेत्रों में डाउनलोड करें जहाँ यह Google Play पर उपलब्ध है।",
      "page-title": "StablePay Labs | QR आधारित स्टेबलकॉइन भुगतान प्रणाली",
      "nav-features": "विशेषताएँ",
      "nav-app": "ऐप",
      "nav-how": "कैसे इस्तेमाल करें",
      "nav-pricing": "प्लान",
      "nav-currencies": "मुद्राएँ",
      "nav-patent": "पेटेंट",
      "nav-download": "डाउनलोड",
    "cafe-caption": "बिना विनिमय के कहीं भी भुगतान करें",
      "hero-badge-text": "Web3 स्टेबलकॉइन भुगतान",
      "hero-h1": "अपने फ़ोन से<br><span>USDC या USDT</span><br>में QR या OTP से भुगतान करें",
      "hero-p": "विक्रेता बिना अलग टर्मिनल के QR या OTP भुगतान अनुरोध बना सकते हैं। खरीदार राशि और प्राप्तकर्ता का वॉलेट जाँचकर स्वयं भुगतान स्वीकृत करते हैं।",
    
    "fx-invisible-label": "स्टेबलकॉइन भुगतान संरचना",
    "fx-invisible-title": "KRW स्टेबलकॉइन का युग: विनिमय दर गणना गायब नहीं होती — यह 'अदृश्य' हो जाती है",
    "fx-invisible-sub": "स्टेबलकॉइन FX को समाप्त करने की तकनीक नहीं है, बल्कि सेटलमेंट एसेट को डिजिटल करने की तकनीक है। जब तक उत्पाद मूल्य, खरीदार संपत्ति और विक्रेता सेटलमेंट संपत्ति एक समान नहीं होती, रीयल-टाइम मूल्य रूपांतरण अवश्य होगा।",
    "fx-invisible-core": "स्टेबलकॉइन का भविष्य विनिमय दर को हटाना नहीं है, बल्कि उपयोगकर्ताओं को बिना विनिमय दर के प्रति जागरूक हुए भुगतान करने देना है — रूपांतरण और सेटलमेंट को अदृश्य बनाने की तकनीक StablePay है।",
    "fx-invisible-caption": "मूल्य रूपांतरण एक अनिवार्य परत है जिसे छोड़ा नहीं जा सकता। StablePay इस अदृश्य रूपांतरण भुगतान संरचना को पेटेंट द्वारा सुरक्षित करता है।",
    "fx-invisible-mobile": "छवि को बड़ा देखने के लिए टैप करें।",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
      "btn-download": "Google Play से डाउनलोड करें",
      "btn-contact": "📩 हमसे संपर्क करें",
      "stat-currencies": "कीमत दिखाने की मुद्राएँ",
      "stat-languages": "भाषाएँ",
      
      "stat-patents": "पेटेंट",
      "lbl-features": "मुख्य विशेषताएँ",
      "ttl-features": "StablePay क्यों चुनें?",
      "sub-features": "स्मार्टफ़ोन से भुगतान का अनुरोध बनाएँ, जाँचें और स्वीकृत करें।",
      "f1-h": "रियल-टाइम विनिमय दर रूपांतरण",
      "f1-p": "कीमत स्थानीय मुद्रा में दिखाएँ और विनिमय दर से भुगतान के लिए ज़रूरी USDC या USDT की राशि निकालें।",
      "f2-h": "QR + OTP कोड",
      "f2-p": "नज़दीकी भुगतान के लिए QR और दूरस्थ भुगतान के लिए 7-अंकीय OTP कोड।",
      "f3-h": "बायोमेट्रिक सुरक्षा",
      "f3-p": "ऐप एक्सेस और भुगतान स्वीकृति के लिए बायोमेट्रिक प्रमाणीकरण। निजी कुंजी Android Keystore + AES-256 से सुरक्षित है।",
      "f4-h": "बची हुई राशि स्वतः जमा",
      "f4-p": "0.01 USD से कम राशि स्वतः सेविंग्स के रूप में जमा होती है और आँकड़े रियल-टाइम में दिखते हैं।",
      "f5-h": "इनबिल्ट और बाहरी वॉलेट",
      "f5-p": "StablePay के इनबिल्ट वॉलेट से भुगतान करें या MetaMask अथवा OKX Wallet कनेक्ट करें।",
      "f6-h": "15 भाषाओं का समर्थन",
      "f6-p": "कोरियन, अंग्रेज़ी, अरबी, चीनी सहित 15 भाषाएँ और स्वचालित फ़ॉन्ट समायोजन।",
      "lbl-app": "ऐप की वास्तविक स्क्रीन",
      "ttl-app": "खुद देखें",
      "sub-app": "ऐसा सहज इंटरफ़ेस जिसे कोई भी आसानी से इस्तेमाल कर सकता है।",
      "app1-h": "21 मुद्राओं में कीमत दिखाएँ और बदलें",
      "app1-p": "ऐप सेटिंग में भुगतान मुद्रा, स्टेबलकॉइन और वॉलेट पता चरण-दर-चरण दर्ज करें। वास्तविक समय विनिमय दर अपने आप दिखाई जाती है।",
      "app1-li1": "1. कीमत दिखाने की मुद्राएँ",
      "app1-li2": "चरण 2: स्टेबलकॉइन चुनें (USDT/USDC)",
      "app1-li3": "चरण 3: अपना वॉलेट पता पंजीकृत करें",
      "app1-li4": "चरण 4: बैलेंस का स्वतः सत्यापन",
      "app1-li5": "रियल-टाइम विनिमय दर रूपांतरण का स्वतः प्रदर्शन",
      "app2-h": "QR से अनुरोध करें और वॉलेट में स्वीकृति दें",
      "app2-p": "विक्रेता राशि दर्ज करके QR कोड बनाता है। खरीदार भुगतान अनुरोध देखने के लिए ऐप में उस कोड को स्कैन करता है।",
      "app2-li1": "विक्रेता: राशि दर्ज करते ही QR बनाएँ",
      "app2-li2": "अनुरोध देखने के लिए विक्रेता का QR कोड स्कैन करें या मिला हुआ 7 अंकों का OTP दर्ज करें।",
      "app2-li3": "राशि और प्राप्तकर्ता का वॉलेट देखकर चुने हुए वॉलेट में स्वयं भुगतान स्वीकृत करें।",
      "app2-li4": "QR की वैधता अवधि (2/5 मिनट)",
      "app2-li5": "भुगतान के बाद बचा शेष स्वतः जमा",
      "lbl-how": "कैसे इस्तेमाल करें",
      "ttl-how": "4 आसान चरणों में शुरुआत करें",
      "sub-how": "ऐप में साइन इन करें और भुगतान के लिए वॉलेट चुनें।",
      "s1-h": "सोशल लॉगिन से साइन-अप",
      "s1-p": "अपने Google, KakaoTalk या Facebook खाते से पंजीकरण करें।",
      "s2-h": "मुद्रा और वॉलेट चुनें",
      "s2-p": "स्थानीय मुद्रा और भुगतान का कॉइन (USDC या USDT) चुनें। StablePay के इनबिल्ट वॉलेट से भुगतान करें या MetaMask अथवा OKX Wallet कनेक्ट करें।",
      "s3-h": "QR या OTP अनुरोध जाँचें",
      "s3-p": "अनुरोध देखने के लिए विक्रेता का QR कोड स्कैन करें या मिला हुआ 7 अंकों का OTP दर्ज करें।",
      "s4-h": "वॉलेट में भुगतान स्वीकृत करें",
      "s4-p": "राशि और प्राप्तकर्ता का वॉलेट देखकर चुने हुए वॉलेट में स्वयं भुगतान स्वीकृत करें।",
      "lbl-pricing": "प्लान",
      "ttl-pricing": "उचित मूल्य पर शुरुआत करें",
      "sub-pricing": "भुगतान पर ब्लॉकचेन नेटवर्क शुल्क लग सकता है।",
      "plan1-tag": "खरीदार",
      "plan1-h": "सदस्यता के बिना भुगतान",
      "plan1-period": "ऐप सदस्यता शुल्क",
      "plan1-desc": "खरीदार QR या OTP से असीमित भुगतान कर सकते हैं।",
      "plan1-f1": "असीमित QR भुगतान",
      "plan1-f2": "असीमित OTP भुगतान",
      "plan1-f3": "21 मुद्राओं में कीमत दिखाएँ और बदलें",
      "plan1-f4": "बचा शेष स्वतः जमा",
      "plan1-f5": "15 भाषाओं का समर्थन",
      "plan2-tag": "मुफ़्त विक्रेता",
      "plan2-h": "स्टैंडर्ड विक्रेता",
      "plan2-period": "/ प्रतिदिन 5 बार",
      "plan2-desc": "QR और OTP को मिलाकर हर दिन कुल 5 भुगतान अनुरोध मुफ़्त में बनाएँ।",
      
      
      "plan2-f3": "रियल-टाइम विनिमय दर रूपांतरण रूपांतरण",
      "plan2-f4": "भुगतान इतिहास",
      "plan3-tag": "प्रीमियम सदस्य",
      "plan3-h": "प्रीमियम",
      "plan3-period": "/ 6 महीने",
      "plan3-desc": "असीमित QR/OTP भुगतान अनुरोध बनाएँ। 75 USD की वार्षिक योजना भी उपलब्ध है।",
      "plan3-f1": "असीमित QR/OTP जनरेशन",
      
      "plan3-f3": "प्राथमिकता सहायता",
      "plan3-f4": "सांख्यिकी डैशबोर्ड",
      "plan3-f5": "75 USD वार्षिक प्लान",
      "lbl-currencies": "कीमत दिखाने की मुद्राएँ",
      "ttl-currencies": "21 मुद्राओं में कीमत दिखाएँ और बदलें",
      "sub-currencies": "कीमत स्थानीय मुद्रा में दिखाएँ और विनिमय दर से भुगतान के लिए ज़रूरी USDC या USDT की राशि निकालें।",
      "lbl-countries": "Google Play",
      "ttl-countries": "Android ऐप की उपलब्धता",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "तकनीक से प्रमाणित",
    "pat1-label": "PATENT 01",
    "pat1-h": "पेटेंट 1: “QR आधारित स्टेबलकॉइन भुगतान प्रणाली और विधि”",
    "pat1-filed": "आवेदन तिथि: 2025.06.17 (आवेदन सं.: 10-2025-0079540)",
    "pat1-registered": "पंजीकरण तिथि: 2025.11.14 (पंजीकरण सं.: 10-2888374-0000)",
    "pat1-pct": "अंतरराष्ट्रीय PCT आवेदन सं.: PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "पेटेंट 2: “मल्टी-वॉलेट का उपयोग करने वाली Web3 भुगतान निपटान और कर स्वचालन प्रणाली”",
    "pat2-filed": "आवेदन तिथि: 2025.12.31 (आवेदन सं.: 10-2025-0215773)",
    "pat2-registered": "पंजीकरण तिथि: 2026.08.03 (पंजीकरण सं.: 10-3001369-0000)",
    "pat2-pct": "अंतरराष्ट्रीय PCT आवेदन सं.: PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "पेटेंट 3: “KYC-लिंक्ड वॉलेट अनुमति प्रत्यायोजन और AI एजेंट का उपयोग करने वाली ब्लॉकचेन भुगतान व निपटान प्रणाली”",
    "pat3-filed": "आवेदन तिथि: 2026.03.31 (आवेदन सं.: 10-2026-0058433)",
    "pat3-status": "वर्तमान में प्राथमिकता परीक्षा जारी है (Patent Pending)",
      "footer-desc": "अपने फ़ोन से USDC या USDT में QR या OTP से भुगतान करें",
      "footer-h-service": "सेवा",
      "footer-h-info": "जानकारी",
      "footer-h-download": "डाउनलोड",
      "footer-h-contact": "संपर्क",
      "footer-features": "मुख्य विशेषताएँ",
      "footer-app": "ऐप स्क्रीन",
      "footer-how": "कैसे इस्तेमाल करें",
      "footer-pricing": "प्लान",
      "footer-currencies": "मुद्राएँ",
      "footer-patent": "पेटेंट",
      "footer-contact": "संपर्क करें",
      "footer-privacy": "गोपनीयता नीति",
      "footer-terms": "सेवा की शर्तें",
      "footer-privacy2": "गोपनीयता नीति",
      "footer-terms2": "सेवा की शर्तें",
      "modal-privacy-title": "🔐 गोपनीयता नीति",
      "modal-privacy-btn": "पुष्टि करें",
      "modal-terms-title": "📋 सेवा की शर्तें",
      "modal-terms-btn": "पुष्टि करें"
  },
  ru: {
    "hero-network": "Оплачивайте в USDC или USDT в сети Polygon.",
    "hero-fee-note": "Android · При оплате может взиматься комиссия блокчейн-сети.",
    "btn-payment-demo": "Смотреть видео об оплате",
    "app-demo-caption": "Видео об оплате USDC по QR · Английский",
    "sub-countries": "Скачайте приложение для Android в странах и регионах, где оно доступно в Google Play.",
      "page-title": "StablePay Labs | Платёжная система со стейблкоинами на основе QR",
      "nav-features": "Функции",
      "nav-app": "Экраны приложения",
      "nav-how": "Как использовать",
      "nav-pricing": "Тарифы",
      "nav-currencies": "Поддерживаемые валюты",
      "nav-patent": "Патенты",
      "nav-download": "Скачать приложение",
    "cafe-caption": "Платите везде без обмена валют",
      "hero-badge-text": "Web3-платежи в стейблкоинах",
      "hero-h1": "Оплата со смартфона<br><span>USDC или USDT</span><br>по QR или OTP",
      "hero-p": "Продавец создаёт запрос по QR или OTP без отдельного терминала. Покупатель проверяет сумму и кошелёк получателя и сам подтверждает оплату.",
    
    "fx-invisible-label": "Структура платежей на стейблкоинах",
    "fx-invisible-title": "Эпоха KRW-стейблкоина: расчёт обменного курса не исчезает — он становится «невидимым»",
    "fx-invisible-sub": "Стейблкоин — это не технология устранения валютного обмена (FX), а технология оцифровки расчётного актива. Пока цена товара, актив покупателя и расчётный актив продавца не совпадают, конвертация стоимости в реальном времени неизбежна.",
    "fx-invisible-core": "Будущее стейблкоинов — не в устранении обменного курса, а в том, чтобы пользователи платили, не задумываясь о нём — технология, делающая конвертацию и расчёт невидимыми, — это StablePay.",
    "fx-invisible-caption": "Конвертация стоимости — это обязательный слой, который нельзя пропустить. StablePay защищает эту структуру платежей с невидимой конвертацией патентами.",
    "fx-invisible-mobile": "Нажмите на изображение для увеличения.",
    "fx-invisible-img": "원화_스테이블코인_시대_결제_구조_Eng_2.jpg",
      "btn-download": "Скачать в Google Play",
      "btn-contact": "📩 Связаться с нами",
      "stat-currencies": "Валюты для отображения цен",
      "stat-languages": "Языки",
      
      "stat-patents": "Патенты",
      "lbl-features": "Ключевые функции",
      "ttl-features": "Почему StablePay?",
      "sub-features": "Создавайте, проверяйте и подтверждайте платёжные запросы со смартфона.",
      "f1-h": "Автоконвертация по курсу в реальном времени",
      "f1-p": "Показывайте цену в местной валюте и пересчитывайте её в сумму USDC или USDT по курсу.",
      "f2-h": "QR-сканирование + OTP-код",
      "f2-p": "QR для оплаты на месте и 7-значный OTP-код для удалённых переводов — быстро и безопасно.",
      "f3-h": "Безопасная биометрическая проверка",
      "f3-p": "Вход в приложение и подпись платежа защищены биометрией. Приватный ключ шифруется AES-256 и хранится на устройстве.",
      "f4-h": "Автоматическое накопление сдачи",
      "f4-p": "Сдача менее 0,01 USD автоматически накапливается, а статистика обновляется в реальном времени.",
      "f5-h": "Встроенный и внешние кошельки",
      "f5-p": "Платите через встроенный кошелёк StablePay или подключите MetaMask или OKX Wallet.",
      "f6-h": "Поддержка 15 языков",
      "f6-p": "Поддерживаются корейский, английский, арабский, китайский и другие языки с автоматической подстройкой интерфейса.",
      "lbl-app": "Экран приложения",
      "ttl-app": "Интерфейс для покупателя и продавца",
      "sub-app": "Понятный и удобный интерфейс для запроса оплаты, подтверждения и завершения операции в реальном времени.",
      "app1-h": "Отображение и пересчёт цен в 21 валюте",
      "app1-p": "Покупатели могут оплачивать покупки стейблкоинами без сложной подготовки.",
      "app1-li1": "1. Валюты для отображения цен",
      "app1-li2": "Подключение кошелька через QR и выбор монеты",
      "app1-li3": "Сканирование QR продавца или ввод OTP-кода",
      "app1-li4": "Бесплатное использование без ограничений",
      "app1-li5": "Автоматическое накопление сдачи и история платежей",
      "app2-h": "Запросите платёж по QR и подтвердите его в кошельке",
      "app2-p": "Продавец указывает сумму и создаёт QR-код. Покупатель сканирует код в приложении, чтобы проверить запрос на оплату.",
      "app2-li1": "Запрос платежа через QR и OTP",
      "app2-li2": "Отсканируйте QR-код продавца или введите полученный 7-значный OTP, чтобы проверить запрос.",
      "app2-li3": "Проверьте сумму и кошелёк получателя и подтвердите платёж в выбранном кошельке.",
      "app2-li4": "Мгновенное подтверждение оплаты и история",
      "app2-li5": "Поддержка корпоративной закрытой экосистемы на базе NFT",
      "lbl-how": "Как использовать",
      "ttl-how": "4 шага для начала",
      "sub-how": "Войдите в приложение и выберите кошелёк для оплаты.",
      "s1-h": "Регистрация через соцсети",
      "s1-p": "Зарегистрируйтесь через свой аккаунт Google, KakaoTalk или Facebook.",
      "s2-h": "Выберите валюту и кошелёк",
      "s2-p": "Выберите местную валюту и актив для оплаты (USDC или USDT). Платите через встроенный кошелёк StablePay или подключите MetaMask или OKX Wallet.",
      "s3-h": "Проверьте запрос по QR или OTP",
      "s3-p": "Отсканируйте QR-код продавца или введите полученный 7-значный OTP, чтобы проверить запрос.",
      "s4-h": "Подтвердите платёж в кошельке",
      "s4-p": "Проверьте сумму и кошелёк получателя и подтвердите платёж в выбранном кошельке.",
      "lbl-pricing": "Тарифные планы",
      "ttl-pricing": "План для каждого сценария",
      "sub-pricing": "При оплате может взиматься комиссия блокчейн-сети.",
      "plan1-tag": "Бесплатно",
      "plan1-h": "Оплата без подписки",
      "plan1-period": "подписка на приложение",
      "plan1-desc": "Покупатели могут без ограничений оплачивать покупки по QR или OTP.",
      "plan1-f1": "Неограниченные платежи",
      "plan1-f2": "21 валюта по курсу в реальном времени",
      "plan1-f3": "Отображение и пересчёт цен в 21 валюте",
      "plan1-f4": "Автосохранение сдачи",
      "plan1-f5": "Биометрическая защита",
      "plan2-tag": "Базовый",
      "plan2-h": "Продавец",
      "plan2-period": "Бесплатно",
      "plan2-desc": "Создавайте бесплатно до 5 запросов по QR и OTP в день суммарно.",
      
      
      "plan2-f3": "История запросов и платежей",
      "plan2-f4": "Подтверждение оплаты в реальном времени",
      "plan3-tag": "Премиум",
      "plan3-h": "Премиум-продавец",
      "plan3-period": "$45 / 6 месяцев · $75 / 1 год",
      "plan3-desc": "Создавайте неограниченное число QR/OTP-запросов на оплату. Также доступен годовой план за 75 USD.",
      "plan3-f1": "Неограниченные QR/OTP-запросы",
      
      "plan3-f3": "Приоритетная поддержка",
      "plan3-f4": "Поддержка расширенных настроек",
      "plan3-f5": "Подходит для бизнеса и партнёров",
      "lbl-currencies": "Валюты для отображения цен",
      "ttl-currencies": "Отображение и пересчёт цен в 21 валюте",
      "sub-currencies": "Показывайте цену в местной валюте и пересчитывайте её в сумму USDC или USDT по курсу.",
      "lbl-countries": "Google Play",
      "ttl-countries": "Доступность приложения для Android",
    "lbl-patent": "PATENTS & INTELLECTUAL PROPERTY",
    "ttl-patent": "Подтверждено технологией",
    "pat1-label": "PATENT 01",
    "pat1-h": "Патент 1: «Система и способ оплаты стейблкоинами на основе QR»",
    "pat1-filed": "Дата подачи: 2025.06.17 (№ заявки: 10-2025-0079540)",
    "pat1-registered": "Дата регистрации: 2025.11.14 (№ регистрации: 10-2888374-0000)",
    "pat1-pct": "№ международной заявки PCT: PCT/KR2025/021643",
    "pat2-label": "PATENT 02",
    "pat2-h": "Патент 2: «Система расчётов по платежам и налоговой автоматизации на базе Web3 с использованием нескольких кошельков»",
    "pat2-filed": "Дата подачи: 2025.12.31 (№ заявки: 10-2025-0215773)",
    "pat2-registered": "Дата регистрации: 2026.08.03 (№ регистрации: 10-3001369-0000)",
    "pat2-pct": "№ международной заявки PCT: PCT/KR2026/013937",
    "pat3-label": "PATENT 03",
    "pat3-h": "Патент 3: «Система блокчейн-платежей и расчётов с делегированием полномочий KYC-связанного кошелька и AI-агентами»",
    "pat3-filed": "Дата подачи: 2026.03.31 (№ заявки: 10-2026-0058433)",
    "pat3-status": "В настоящее время проходит приоритетную экспертизу (Patent Pending)",
      "footer-desc": "Оплата со смартфона USDC или USDT по QR или OTP",
      "footer-h-service": "Сервис",
      "footer-h-info": "Информация",
      "footer-h-download": "Скачать",
      "footer-h-contact": "Контакты",
      "footer-features": "Функции",
      "footer-app": "Экраны приложения",
      "footer-how": "Как использовать",
      "footer-pricing": "Тарифы",
      "footer-currencies": "Поддерживаемые валюты",
      "footer-patent": "Патенты",
      "footer-contact": "Связаться",
      "footer-privacy": "Политика конфиденциальности",
      "footer-terms": "Условия использования",
      "footer-privacy2": "Политика конфиденциальности",
      "footer-terms2": "Условия использования",
      "modal-privacy-title": "🔐 Политика конфиденциальности",
      "modal-privacy-btn": "Подтвердить",
      "modal-terms-title": "📋 Условия использования",
      "modal-terms-btn": "Подтвердить"
  },
};

var currentLang = document.documentElement.lang;

var QR_COPY = {
  ko: {
    label: "QR 기술 구조",
    title: "기존 QR은 주소표, StablePay QR은 결제 명령입니다",
    sub: "Web2 QR 결제는 중앙 서버로 연결되는 라우팅 키에 가깝습니다. 반면 StablePay의 Web3 QR은 지갑 주소, 결제 금액, 네트워크 검증 정보를 하나의 QR에 담아 블록체인에서 실행되는 자기완결형 결제 명령으로 작동합니다.",
    core: "StablePay는 기존 QR의 서버 라우팅 구조를 넘어, 결제 금액·지갑 주소·네트워크 검증 정보를 하나의 QR에 담는 Web3 자기완결형 결제 구조를 제공합니다.",
    caption: "StablePay는 특허 제10-2888374-0000호 기반의 QR 스테이블코인 결제 구조를 통해 기존 QR 결제의 중앙 서버 의존 구조와 구분되는 Web3 결제 프로토콜을 제시합니다.",
    note: "모바일에서는 이미지를 누르면 크게 볼 수 있습니다.",
    img: "web2-web3-qr-stablepay-ko.webp",
    alt: "StablePay Web2 QR 결제와 Web3 QR 스테이블코인 결제 구조 비교 - 특허 제10-2888374-0000호"
  },
  en: {
    label: "QR Architecture",
    title: "Traditional QR is an address label. StablePay QR is a payment instruction.",
    sub: "Web2 QR payment is mainly a routing key that points to a central server. StablePay Web3 QR embeds wallet address, amount, and network verification data into one QR, allowing the payment instruction to execute on-chain.",
    core: "StablePay goes beyond the server-routing structure of traditional QR codes by placing the payment amount, wallet address, and network verification data into a single QR, providing a Web3 self-contained payment architecture.",
    caption: "StablePay presents a Web3 QR stablecoin payment protocol distinguished from server-dependent Web2 QR payments, based on Korean Patent No. 10-2888374-0000.",
    note: "On mobile, tap the image to view it in full size.",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "Comparison between Web2 QR payment and StablePay Web3 QR stablecoin payment architecture - Korean Patent No. 10-2888374-0000"
  },
  ja: {
    label: "QRアーキテクチャ",
    title: "従来のQRは住所ラベル、StablePay QRは決済命令です",
    sub: "Web2のQR決済は中央サーバーへ接続するルーティングキーに近い構造です。StablePayのWeb3 QRはウォレットアドレス、金額、ネットワーク検証情報を1つのQRに含め、オンチェーンで実行される自己完結型の決済命令として機能します。",
    core: "StablePayは、従来のQRのサーバールーティング構造を超え、決済金額・ウォレットアドレス・ネットワーク検証情報を1つのQRに組み込むWeb3自己完結型の決済構造を提供します。",
    caption: "StablePayは、特許第10-2888374-0000号に基づくQRステーブルコイン決済構造により、中央サーバー依存型の既存QR決済とは異なるWeb3決済プロトコルを提示します。",
    note: "モバイルでは画像をタップすると大きく表示できます。",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "StablePay Web2 QR決済とWeb3 QRステーブルコイン決済アーキテクチャの比較 - 特許第10-2888374-0000号"
  },
  zh: {
    label: "QR 技术架构",
    title: "传统 QR 是地址标签，StablePay QR 是支付指令",
    sub: "Web2 QR 支付更像是连接中央服务器的路由键。StablePay 的 Web3 QR 将钱包地址、金额和网络验证信息整合到一个 QR 中，作为可在链上执行的自包含支付指令。",
    core: "StablePay 超越传统 QR 的服务器路由结构，将支付金额、钱包地址和网络验证信息整合到一个 QR 中，提供 Web3 自包含支付架构。",
    caption: "StablePay 基于专利第10-2888374-0000号的 QR 稳定币支付结构，提出了区别于传统中央服务器依赖型 QR 支付的 Web3 支付协议。",
    note: "在手机上点击图片可查看大图。",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "StablePay Web2 QR 支付与 Web3 QR 稳定币支付架构比较 - 专利第10-2888374-0000号"
  },
  "zh-hk": {
    label: "QR 技術架構",
    title: "傳統 QR 是地址標籤，StablePay QR 是支付指令",
    sub: "Web2 QR 支付更像是連接中央伺服器的路由鍵。StablePay 的 Web3 QR 將錢包地址、金額和網絡驗證資訊整合到一個 QR 中，作為可在鏈上執行的自包含支付指令。",
    core: "StablePay 超越傳統 QR 的伺服器路由結構，將支付金額、錢包地址和網絡驗證資訊整合到一個 QR 中，提供 Web3 自包含支付架構。",
    caption: "StablePay 基於專利第10-2888374-0000號的 QR 穩定幣支付結構，提出有別於傳統中央伺服器依賴型 QR 支付的 Web3 支付協議。",
    note: "在手機上點擊圖片可查看大圖。",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "StablePay Web2 QR 支付與 Web3 QR 穩定幣支付架構比較 - 專利第10-2888374-0000號"
  },
  th: {
    label: "สถาปัตยกรรม QR",
    title: "QR แบบเดิมคือป้ายที่อยู่ แต่ StablePay QR คือคำสั่งชำระเงิน",
    sub: "การชำระเงินด้วย QR แบบ Web2 ส่วนใหญ่เป็นคีย์นำทางไปยังเซิร์ฟเวอร์กลาง ส่วน StablePay Web3 QR รวมที่อยู่กระเป๋า จำนวนเงิน และข้อมูลตรวจสอบเครือข่ายไว้ใน QR เดียว เพื่อทำงานเป็นคำสั่งชำระเงินบนบล็อกเชน",
    core: "StablePay ก้าวข้ามโครงสร้าง QR แบบเดิมที่ใช้การนำทางผ่านเซิร์ฟเวอร์ โดยรวมจำนวนเงิน ที่อยู่กระเป๋า และข้อมูลตรวจสอบเครือข่ายไว้ใน QR เดียว เพื่อมอบโครงสร้างการชำระเงิน Web3 แบบครบในตัวเอง",
    caption: "StablePay นำเสนอโปรโตคอลชำระเงิน Web3 ด้วย QR stablecoin ที่แตกต่างจากระบบ QR แบบพึ่งพาเซิร์ฟเวอร์กลาง โดยอ้างอิงสิทธิบัตรเลขที่ 10-2888374-0000",
    note: "บนมือถือ แตะรูปภาพเพื่อดูขนาดเต็ม",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "การเปรียบเทียบ Web2 QR Payment และ StablePay Web3 QR Stablecoin Payment - Korean Patent No. 10-2888374-0000"
  },
  vi: {
    label: "Kiến trúc QR",
    title: "QR truyền thống là nhãn địa chỉ, StablePay QR là lệnh thanh toán",
    sub: "Thanh toán QR Web2 chủ yếu là khóa định tuyến đến máy chủ trung tâm. StablePay Web3 QR tích hợp địa chỉ ví, số tiền và dữ liệu xác minh mạng vào một QR duy nhất, hoạt động như lệnh thanh toán tự chứa trên blockchain.",
    core: "StablePay vượt qua cấu trúc định tuyến qua máy chủ của QR truyền thống bằng cách đưa số tiền thanh toán, địa chỉ ví và dữ liệu xác minh mạng vào một QR duy nhất, cung cấp kiến trúc thanh toán Web3 tự chứa.",
    caption: "StablePay giới thiệu giao thức thanh toán stablecoin QR Web3 khác biệt với QR Web2 phụ thuộc máy chủ trung tâm, dựa trên Bằng sáng chế số 10-2888374-0000.",
    note: "Trên di động, chạm vào hình để xem kích thước lớn.",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "So sánh kiến trúc thanh toán Web2 QR và StablePay Web3 QR stablecoin - Korean Patent No. 10-2888374-0000"
  },
  fil: {
    label: "QR Architecture",
    title: "Ang tradisyonal na QR ay address label; ang StablePay QR ay payment instruction",
    sub: "Ang Web2 QR payment ay kadalasang routing key papunta sa central server. Ang StablePay Web3 QR ay naglalaman ng wallet address, halaga, at network verification data sa iisang QR para maisagawa ang payment instruction on-chain.",
    core: "Nilalampasan ng StablePay ang server-routing structure ng tradisyonal na QR sa pamamagitan ng paglalagay ng payment amount, wallet address, at network verification data sa iisang QR, na nagbibigay ng Web3 self-contained payment architecture.",
    caption: "Ipinapakita ng StablePay ang Web3 QR stablecoin payment protocol na naiiba sa server-dependent Web2 QR payments, batay sa Korean Patent No. 10-2888374-0000.",
    note: "Sa mobile, i-tap ang image para makita sa full size.",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "Comparison ng Web2 QR payment at StablePay Web3 QR stablecoin payment architecture - Korean Patent No. 10-2888374-0000"
  },
  ar: {
    label: "بنية QR",
    title: "رمز QR التقليدي هو ملصق عنوان، أما StablePay QR فهو أمر دفع",
    sub: "دفع QR في Web2 يعمل غالبًا كمفتاح توجيه إلى خادم مركزي. أما StablePay Web3 QR فيضم عنوان المحفظة والمبلغ وبيانات التحقق من الشبكة داخل رمز واحد، ليعمل كأمر دفع ذاتي التنفيذ على البلوكشين.",
    core: "تتجاوز StablePay بنية التوجيه عبر الخادم في رموز QR التقليدية، من خلال تضمين مبلغ الدفع وعنوان المحفظة وبيانات التحقق من الشبكة داخل رمز QR واحد، لتوفر بنية دفع Web3 ذاتية الاكتمال.",
    caption: "تقدم StablePay بروتوكول دفع Web3 بالعملات المستقرة عبر QR متميزًا عن مدفوعات QR المعتمدة على الخادم المركزي، استنادًا إلى براءة الاختراع رقم 10-2888374-0000.",
    note: "على الهاتف، اضغط على الصورة لعرضها بالحجم الكامل.",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "مقارنة بين Web2 QR payment و StablePay Web3 QR stablecoin payment architecture - Korean Patent No. 10-2888374-0000"
  },
  de: {
    label: "QR-Architektur",
    title: "Klassischer QR ist ein Adressetikett. StablePay QR ist eine Zahlungsanweisung.",
    sub: "Web2-QR-Zahlung ist hauptsächlich ein Routing-Schlüssel zu einem zentralen Server. StablePay Web3 QR integriert Wallet-Adresse, Betrag und Netzwerk-Verifizierungsdaten in einem QR und funktioniert als selbstenthaltende On-Chain-Zahlungsanweisung.",
    core: "StablePay geht über die Server-Routing-Struktur herkömmlicher QR-Codes hinaus, indem Zahlungsbetrag, Wallet-Adresse und Netzwerk-Verifizierungsdaten in einem einzigen QR zusammengeführt werden – als Web3-Zahlungsarchitektur mit selbstenthaltender Struktur.",
    caption: "StablePay präsentiert ein Web3-QR-Stablecoin-Zahlungsprotokoll, das sich von serverabhängigen Web2-QR-Zahlungen unterscheidet, basierend auf Patent Nr. 10-2888374-0000.",
    note: "Auf Mobilgeräten tippen Sie auf das Bild, um es in voller Größe zu öffnen.",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "Vergleich zwischen Web2 QR Payment und StablePay Web3 QR Stablecoin Payment Architecture - Korean Patent No. 10-2888374-0000"
  },
  fr: {
    label: "Architecture QR",
    title: "Le QR classique est une étiquette d’adresse. Le QR StablePay est une instruction de paiement.",
    sub: "Le paiement QR Web2 est surtout une clé de routage vers un serveur central. StablePay Web3 QR intègre l’adresse du wallet, le montant et les données de vérification réseau dans un seul QR, qui fonctionne comme une instruction de paiement on-chain autoportante.",
    core: "StablePay dépasse la structure de routage serveur des QR classiques en intégrant le montant du paiement, l’adresse du wallet et les données de vérification réseau dans un seul QR, afin de fournir une architecture de paiement Web3 autoportante.",
    caption: "StablePay présente un protocole de paiement stablecoin QR Web3 distinct des paiements QR Web2 dépendants d’un serveur central, sur la base du brevet n° 10-2888374-0000.",
    note: "Sur mobile, touchez l’image pour l’ouvrir en grand format.",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "Comparaison entre Web2 QR Payment et StablePay Web3 QR Stablecoin Payment Architecture - Korean Patent No. 10-2888374-0000"
  },
  pt: {
    label: "Arquitetura QR",
    title: "O QR tradicional é um rótulo de endereço. O StablePay QR é uma instrução de pagamento.",
    sub: "O pagamento QR Web2 é principalmente uma chave de roteamento para um servidor central. O StablePay Web3 QR incorpora endereço da carteira, valor e dados de verificação da rede em um único QR, funcionando como uma instrução de pagamento on-chain autossuficiente.",
    core: "A StablePay vai além da estrutura de roteamento por servidor dos QR tradicionais ao incorporar o valor do pagamento, o endereço da carteira e os dados de verificação da rede em um único QR, oferecendo uma arquitetura de pagamento Web3 autossuficiente.",
    caption: "A StablePay apresenta um protocolo Web3 de pagamento em stablecoin via QR, distinto dos pagamentos QR Web2 dependentes de servidor, com base na Patente nº 10-2888374-0000.",
    note: "No celular, toque na imagem para ver em tamanho completo.",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "Comparação entre Web2 QR payment e StablePay Web3 QR stablecoin payment architecture - Korean Patent No. 10-2888374-0000"
  },
  es: {
    label: "Arquitectura QR",
    title: "El QR tradicional es una etiqueta de dirección. StablePay QR es una instrucción de pago.",
    sub: "El pago QR Web2 es principalmente una clave de enrutamiento hacia un servidor central. StablePay Web3 QR integra dirección de wallet, importe y datos de verificación de red en un solo QR, funcionando como una instrucción de pago on-chain autocontenida.",
    core: "StablePay supera la estructura de enrutamiento por servidor de los QR tradicionales al incorporar el importe del pago, la dirección de wallet y los datos de verificación de red en un solo QR, ofreciendo una arquitectura de pago Web3 autocontenida.",
    caption: "StablePay presenta un protocolo Web3 de pago con stablecoins mediante QR, distinto de los pagos QR Web2 dependientes de servidor, basado en la Patente n.º 10-2888374-0000.",
    note: "En móvil, toca la imagen para verla en tamaño completo.",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "Comparación entre Web2 QR payment y StablePay Web3 QR stablecoin payment architecture - Korean Patent No. 10-2888374-0000"
  },
  hi: {
    label: "QR आर्किटेक्चर",
    title: "पारंपरिक QR एक address label है, StablePay QR एक payment instruction है",
    sub: "Web2 QR payment मुख्य रूप से central server तक जाने वाला routing key है। StablePay Web3 QR एक ही QR में wallet address, amount और network verification data शामिल करता है, जिससे payment instruction on-chain execute हो सकता है।",
    core: "StablePay पारंपरिक QR की server-routing संरचना से आगे बढ़कर payment amount, wallet address और network verification data को एक ही QR में शामिल करता है, जिससे Web3 self-contained payment architecture प्रदान होती है।",
    caption: "StablePay Korean Patent No. 10-2888374-0000 के आधार पर server-dependent Web2 QR payments से अलग Web3 QR stablecoin payment protocol प्रस्तुत करता है।",
    note: "मोबाइल पर image को full size में देखने के लिए tap करें।",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "Web2 QR payment और StablePay Web3 QR stablecoin payment architecture की तुलना - Korean Patent No. 10-2888374-0000"
  },
  ru: {
    label: "QR-архитектура",
    title: "Обычный QR — это адресная метка. StablePay QR — платежная инструкция.",
    sub: "Web2 QR-платеж в основном является ключом маршрутизации к центральному серверу. StablePay Web3 QR включает адрес кошелька, сумму и данные сетевой проверки в один QR, работая как самодостаточная on-chain платежная инструкция.",
    core: "StablePay выходит за пределы серверной маршрутизации традиционных QR-кодов, объединяя сумму платежа, адрес кошелька и данные сетевой проверки в одном QR, обеспечивая самодостаточную Web3-архитектуру платежей.",
    caption: "StablePay представляет Web3 QR-протокол оплаты стейблкоинами, отличающийся от сервер-зависимых Web2 QR-платежей, на основе патента № 10-2888374-0000.",
    note: "На мобильном устройстве нажмите на изображение, чтобы открыть его в полном размере.",
    img: "web2-web3-qr-stablepay-en.webp",
    alt: "Сравнение Web2 QR payment и StablePay Web3 QR stablecoin payment architecture - Korean Patent No. 10-2888374-0000"
  }
};


var PAYMENT_ARCH_COPY = {
  "ko": {
    "label": "결제 구조",
    "title": "StablePay 결제 구조",
    "sub": "판매자가 현지 통화 금액을 입력하면 결제에 필요한 USDC·USDT 금액이 표시됩니다. 구매자는 QR 또는 7자리 OTP로 요청을 확인하고 자신의 지갑에서 직접 승인합니다. 지원 네트워크는 앱의 결제 설정에서 확인할 수 있습니다.",
    "core": "요청 기반 QR/OTP 스테이블코인 결제 프로토콜: 판매자는 별도 POS 단말기 없이 스마트폰만으로 결제 요청을 만들고, 구매자는 지갑 서명으로 결제를 승인합니다.",
    "caption": "StablePay는 하나의 앱에서 구매자 지갑과 판매자 단말기 역할을 동시에 수행하며, 별도 POS 없이 QR/OTP 요청 기반 결제 구조를 제공합니다.",
    "note": "모바일에서는 이미지를 누르면 크게 볼 수 있습니다.",
    "img": "stablepay-payment-architecture-ko.webp",
    "alt": "StablePay 결제 구조 - QR OTP 요청 기반 스테이블코인 결제 프로토콜",
    "steps": [
      {
        "title": "판매자 요청 생성",
        "body": "판매자가 현지 화폐 금액, 결제 통화, 네트워크 정보를 입력하고 QR 코드 또는 7자리 OTP를 생성합니다."
      },
      {
        "title": "구매자 승인",
        "body": "구매자는 QR을 스캔하거나 OTP를 입력해 요청된 금액과 지갑 주소를 확인합니다."
      },
      {
        "title": "스테이블코인 결제 실행",
        "body": "StablePay는 실시간 환율을 기준으로 금액을 계산하고, 비수탁 지갑 서명을 통해 USDT 또는 USDC 결제를 실행합니다."
      },
      {
        "title": "잔돈 적립 및 정산 연결",
        "body": "0.01달러 미만의 잔돈은 자동으로 적립됩니다."
      }
    ]
  },
  "en": {
    "label": "Payment Architecture",
    "title": "StablePay Payment Architecture",
    "sub": "The seller enters a price in local currency and the app shows the amount due in USDC or USDT. The buyer reviews the request by QR or 7-digit OTP and approves it in their wallet. Check the app’s payment settings for supported networks.",
    "core": "A request-based QR/OTP stablecoin payment protocol: sellers create payment requests directly from any smartphone without an external POS terminal, while buyers approve the payment with a wallet signature.",
    "caption": "StablePay allows one app to work as both buyer wallet and seller terminal, providing a QR/OTP request-based payment structure without external POS hardware.",
    "note": "On mobile, tap the image to view it in full size.",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "StablePay Payment Architecture - Request-Based QR OTP Stablecoin Payment Protocol",
    "steps": [
      {
        "title": "Seller Creates a Request",
        "body": "The seller enters the local currency amount, selected currency, and network details, then generates a QR code or 7-digit OTP."
      },
      {
        "title": "Buyer Approves the Payment",
        "body": "The buyer scans the QR code or enters the OTP to verify the requested amount and wallet address."
      },
      {
        "title": "Stablecoin Payment Execution",
        "body": "StablePay calculates the payment amount using real-time exchange rates and executes USDT or USDC payment through a non-custodial wallet signature."
      },
      {
        "title": "Dust Accumulation & Settlement Link",
        "body": "Spare change under $0.01 is saved automatically."
      }
    ]
  },
  "ja": {
    "label": "決済アーキテクチャ",
    "title": "StablePayの決済アーキテクチャ",
    "sub": "販売者が現地通貨で金額を入力すると、決済に必要なUSDCまたはUSDTの金額が表示されます。購入者はQRまたは7桁のOTPで内容を確認し、ウォレットで承認します。対応ネットワークはアプリの決済設定で確認できます。",
    "core": "リクエストベースのQR/OTPステーブルコイン決済プロトコル：販売者は外部POS端末なしでスマートフォンから決済リクエストを作成し、購入者はウォレット署名で決済を承認します。",
    "caption": "StablePayは、1つのアプリで購入者ウォレットと販売者端末の両方の役割を担い、外部POSなしでQR/OTPリクエスト型決済構造を提供します。",
    "note": "モバイルでは画像をタップすると拡大表示できます。",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "StablePay 決済アーキテクチャ - リクエストベースQR OTPステーブルコイン決済プロトコル",
    "steps": [
      {
        "title": "販売者がリクエストを作成",
        "body": "販売者は現地通貨の金額、決済通貨、ネットワーク情報を入力し、QRコードまたは7桁OTPを生成します。"
      },
      {
        "title": "購入者が決済を承認",
        "body": "購入者はQRコードをスキャンするかOTPを入力し、請求金額とウォレットアドレスを確認します。"
      },
      {
        "title": "ステーブルコイン決済を実行",
        "body": "StablePayはリアルタイム為替レートで決済金額を計算し、ノンカストディアルウォレット署名を通じてUSDTまたはUSDC決済を実行します。"
      },
      {
        "title": "端数積立と精算連携",
        "body": "0.01米ドル未満のおつりは自動で積み立てられます。"
      }
    ]
  },
  "zh": {
    "label": "支付架构",
    "title": "StablePay 支付架构",
    "sub": "卖家输入当地货币金额后，应用显示付款所需的 USDC 或 USDT 金额。买家用 QR 码或 7 位 OTP 查看请求，并在钱包中自行批准付款。请在应用的付款设置中查看支持的网络。",
    "core": "请求式 QR/OTP 稳定币支付协议：卖家无需外部 POS 终端，只需使用智能手机即可创建支付请求；买家通过钱包签名完成授权。",
    "caption": "StablePay 让一个 App 同时充当买家钱包和卖家收款终端，无需外部 POS 硬件即可提供 QR/OTP 请求式支付结构。",
    "note": "在移动设备上，点击图片可查看大图。",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "StablePay 支付架构 - 请求式 QR OTP 稳定币支付协议",
    "steps": [
      {
        "title": "卖家创建请求",
        "body": "卖家输入当地货币金额、支付币种和网络信息，然后生成 QR 码或 7 位 OTP。"
      },
      {
        "title": "买家确认支付",
        "body": "买家扫描 QR 码或输入 OTP，确认请求金额和钱包地址。"
      },
      {
        "title": "执行稳定币支付",
        "body": "StablePay 根据实时汇率计算支付金额，并通过非托管钱包签名执行 USDT 或 USDC 支付。"
      },
      {
        "title": "零钱累积与结算连接",
        "body": "低于 0.01 美元的零钱会自动积存。"
      }
    ]
  },
  "zh-hk": {
    "label": "支付架構",
    "title": "StablePay 支付架構",
    "sub": "商戶輸入本地貨幣金額後，應用程式會顯示付款所需的 USDC 或 USDT 金額。買家用 QR 碼或 7 位數字 OTP 查看請求，並在錢包自行批准付款。支援的網絡可在應用程式的付款設定查看。",
    "core": "請求式 QR/OTP 穩定幣支付協議：賣家無需外部 POS 終端，只需使用智能手機即可建立支付請求；買家則透過錢包簽名完成授權。",
    "caption": "StablePay 讓一個 App 同時成為買家錢包和賣家收款終端，無需外部 POS 硬件即可提供 QR/OTP 請求式支付結構。",
    "note": "在流動裝置上，點按圖片可查看大圖。",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "StablePay 支付架構 - 請求式 QR OTP 穩定幣支付協議",
    "steps": [
      {
        "title": "賣家建立請求",
        "body": "賣家輸入本地貨幣金額、支付幣種和網絡資料，然後產生 QR 碼或 7 位 OTP。"
      },
      {
        "title": "買家確認支付",
        "body": "買家掃描 QR 碼或輸入 OTP，確認請求金額和錢包地址。"
      },
      {
        "title": "執行穩定幣支付",
        "body": "StablePay 按照實時匯率計算支付金額，並透過非託管錢包簽名執行 USDT 或 USDC 支付。"
      },
      {
        "title": "零錢累積與結算連接",
        "body": "低於 0.01 美元的零錢會自動積存。"
      }
    ]
  },
  "th": {
    "label": "สถาปัตยกรรมการชำระเงิน",
    "title": "สถาปัตยกรรมการชำระเงินของ StablePay",
    "sub": "เมื่อผู้ขายกรอกยอดเงินในสกุลท้องถิ่น แอปจะแสดงยอด USDC หรือ USDT ที่ต้องชำระ ผู้ซื้อตรวจสอบคำขอด้วย QR หรือ OTP 7 หลัก แล้วอนุมัติในกระเป๋าของตน ดูเครือข่ายที่รองรับได้ในการตั้งค่าการชำระเงินของแอป",
    "core": "โปรโตคอลชำระเงิน stablecoin แบบ QR/OTP ที่อิงคำขอ: ผู้ขายสร้างคำขอชำระเงินได้จากสมาร์ทโฟนโดยไม่ต้องใช้เครื่อง POS ภายนอก และผู้ซื้ออนุมัติด้วยลายเซ็นกระเป๋าเงิน",
    "caption": "StablePay ทำให้แอปเดียวทำหน้าที่ได้ทั้งกระเป๋าเงินของผู้ซื้อและเครื่องรับชำระของผู้ขาย โดยรองรับโครงสร้างชำระเงินแบบ QR/OTP โดยไม่ต้องใช้ฮาร์ดแวร์ POS ภายนอก",
    "note": "บนมือถือ ให้แตะรูปภาพเพื่อดูขนาดเต็ม",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "สถาปัตยกรรมการชำระเงิน StablePay - โปรโตคอล QR OTP Stablecoin แบบอิงคำขอ",
    "steps": [
      {
        "title": "ผู้ขายสร้างคำขอ",
        "body": "ผู้ขายกรอกยอดเงินสกุลท้องถิ่น สกุลเงินที่เลือก และข้อมูลเครือข่าย จากนั้นสร้าง QR code หรือรหัส OTP 7 หลัก"
      },
      {
        "title": "ผู้ซื้ออนุมัติการชำระเงิน",
        "body": "ผู้ซื้อสแกน QR code หรือกรอกรหัส OTP เพื่อตรวจสอบยอดที่ร้องขอและที่อยู่กระเป๋าเงิน"
      },
      {
        "title": "ดำเนินการชำระด้วย Stablecoin",
        "body": "StablePay คำนวณยอดชำระด้วยอัตราแลกเปลี่ยนแบบเรียลไทม์ และดำเนินการชำระ USDT หรือ USDC ผ่านลายเซ็นของกระเป๋าเงิน non-custodial"
      },
      {
        "title": "สะสมเศษเงินและเชื่อมต่อการชำระบัญชี",
        "body": "เศษเงินที่ต่ำกว่า 0.01 ดอลลาร์สหรัฐจะถูกสะสมโดยอัตโนมัติ"
      }
    ]
  },
  "vi": {
    "label": "Kiến trúc thanh toán",
    "title": "Kiến trúc thanh toán StablePay",
    "sub": "Người bán nhập số tiền bằng nội tệ, ứng dụng hiển thị số USDC hoặc USDT cần thanh toán. Người mua kiểm tra yêu cầu qua QR hoặc OTP 7 chữ số và phê duyệt trong ví của mình. Xem mạng được hỗ trợ trong phần cài đặt thanh toán của ứng dụng.",
    "core": "Giao thức thanh toán stablecoin QR/OTP dựa trên yêu cầu: người bán tạo yêu cầu thanh toán trực tiếp từ điện thoại thông minh mà không cần thiết bị POS bên ngoài, còn người mua phê duyệt bằng chữ ký ví.",
    "caption": "StablePay cho phép một ứng dụng đóng vai trò đồng thời là ví của người mua và thiết bị đầu cuối của người bán, cung cấp cấu trúc thanh toán QR/OTP không cần phần cứng POS bên ngoài.",
    "note": "Trên thiết bị di động, hãy chạm vào hình ảnh để xem kích thước đầy đủ.",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "Kiến trúc thanh toán StablePay - Giao thức QR OTP Stablecoin dựa trên yêu cầu",
    "steps": [
      {
        "title": "Người bán tạo yêu cầu",
        "body": "Người bán nhập số tiền nội tệ, đơn vị tiền tệ đã chọn và thông tin mạng, sau đó tạo mã QR hoặc OTP 7 chữ số."
      },
      {
        "title": "Người mua phê duyệt thanh toán",
        "body": "Người mua quét mã QR hoặc nhập OTP để xác minh số tiền được yêu cầu và địa chỉ ví."
      },
      {
        "title": "Thực thi thanh toán Stablecoin",
        "body": "StablePay tính toán số tiền thanh toán bằng tỷ giá thời gian thực và thực thi thanh toán USDT hoặc USDC thông qua chữ ký ví non-custodial."
      },
      {
        "title": "Tích lũy tiền lẻ và liên kết đối soát",
        "body": "Tiền lẻ dưới 0,01 USD được tích lũy tự động."
      }
    ]
  },
  "fil": {
    "label": "Arkitektura ng Pagbabayad",
    "title": "StablePay Payment Architecture",
    "sub": "Ilalagay ng seller ang halaga sa lokal na currency, at ipapakita ng app ang katumbas na USDC o USDT. Susuriin ng buyer ang request gamit ang QR o 7-digit OTP at aaprubahan ito sa sariling wallet. Tingnan ang mga sinusuportahang network sa payment settings ng app.",
    "core": "Request-based QR/OTP stablecoin payment protocol: ang seller ay maaaring gumawa ng payment request mula sa anumang smartphone nang walang external POS terminal, habang ang buyer ay nag-aapruba gamit ang wallet signature.",
    "caption": "Pinapayagan ng StablePay ang isang app na magsilbing parehong buyer wallet at seller terminal, na nagbibigay ng QR/OTP request-based payment structure nang walang external POS hardware.",
    "note": "Sa mobile, i-tap ang larawan upang makita ito sa full size.",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "StablePay Payment Architecture - Request-Based QR OTP Stablecoin Payment Protocol",
    "steps": [
      {
        "title": "Gumagawa ng Request ang Seller",
        "body": "Ilalagay ng seller ang lokal na halaga, napiling currency, at network details, pagkatapos ay gagawa ng QR code o 7-digit OTP."
      },
      {
        "title": "Inaaprubahan ng Buyer ang Payment",
        "body": "Ii-scan ng buyer ang QR code o ilalagay ang OTP upang i-verify ang hinihinging halaga at wallet address."
      },
      {
        "title": "Stablecoin Payment Execution",
        "body": "Kinakalkula ng StablePay ang halaga ng bayad gamit ang real-time exchange rates at isinasagawa ang USDT o USDC payment sa pamamagitan ng non-custodial wallet signature."
      },
      {
        "title": "Dust Accumulation at Settlement Link",
        "body": "Awtomatikong naiipon ang sukling mas mababa sa $0.01."
      }
    ]
  },
  "ar": {
    "label": "بنية الدفع",
    "title": "بنية الدفع في StablePay",
    "sub": "يدخل البائع السعر بالعملة المحلية، ويعرض التطبيق المبلغ المستحق بعملة USDC أو USDT. يراجع المشتري الطلب برمز QR أو OTP مكوّن من 7 أرقام ويوافق عليه في محفظته. تحقّق من الشبكات المدعومة في إعدادات الدفع داخل التطبيق.",
    "core": "بروتوكول دفع Stablecoin قائم على الطلب عبر QR/OTP: يستطيع البائع إنشاء طلب الدفع من أي هاتف ذكي دون جهاز POS خارجي، بينما يوافق المشتري من خلال توقيع المحفظة.",
    "caption": "تجعل StablePay التطبيق الواحد يعمل كمحفظة للمشتري ومحطة دفع للبائع في الوقت نفسه، مع بنية دفع QR/OTP قائمة على الطلب دون الحاجة إلى أجهزة POS خارجية.",
    "note": "على الهاتف المحمول، اضغط على الصورة لعرضها بالحجم الكامل.",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "بنية الدفع في StablePay - بروتوكول Stablecoin عبر QR OTP قائم على الطلب",
    "steps": [
      {
        "title": "ينشئ البائع طلب الدفع",
        "body": "يدخل البائع مبلغ العملة المحلية، والعملة المحددة، وبيانات الشبكة، ثم ينشئ رمز QR أو رمز OTP مكوّناً من 7 أرقام."
      },
      {
        "title": "يوافق المشتري على الدفع",
        "body": "يمسح المشتري رمز QR أو يدخل رمز OTP للتحقق من المبلغ المطلوب وعنوان المحفظة."
      },
      {
        "title": "تنفيذ دفع Stablecoin",
        "body": "تحسب StablePay مبلغ الدفع باستخدام أسعار الصرف الفورية وتنفذ دفع USDT أو USDC عبر توقيع محفظة غير احتجازية."
      },
      {
        "title": "تجميع الفروقات وربط التسوية",
        "body": "تُحفظ الفكة التي تقل عن 0.01 دولار أمريكي تلقائيًا."
      }
    ]
  },
  "de": {
    "label": "Zahlungsarchitektur",
    "title": "StablePay Zahlungsarchitektur",
    "sub": "Der Verkäufer gibt den Betrag in lokaler Währung ein und die App zeigt den fälligen Betrag in USDC oder USDT an. Der Käufer prüft die Anfrage per QR-Code oder 7-stelligem OTP und bestätigt sie in seiner Wallet. Die unterstützten Netzwerke stehen in den Zahlungseinstellungen der App.",
    "core": "Ein anfragebasiertes QR/OTP-Stablecoin-Zahlungsprotokoll: Verkäufer erstellen Zahlungsanforderungen direkt vom Smartphone aus, ohne externes POS-Terminal; Käufer bestätigen die Zahlung per Wallet-Signatur.",
    "caption": "StablePay macht eine einzige App gleichzeitig zur Käufer-Wallet und zum Verkäufer-Terminal und ermöglicht eine QR/OTP-basierte Zahlungsstruktur ohne externe POS-Hardware.",
    "note": "Auf Mobilgeräten tippen Sie auf das Bild, um es in voller Größe zu öffnen.",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "StablePay Zahlungsarchitektur - Anfragebasiertes QR OTP Stablecoin-Zahlungsprotokoll",
    "steps": [
      {
        "title": "Verkäufer erstellt Anfrage",
        "body": "Der Verkäufer gibt den Betrag in lokaler Währung, die ausgewählte Währung und die Netzwerkdaten ein und erzeugt anschließend einen QR-Code oder ein 7-stelliges OTP."
      },
      {
        "title": "Käufer bestätigt die Zahlung",
        "body": "Der Käufer scannt den QR-Code oder gibt das OTP ein, um den angeforderten Betrag und die Wallet-Adresse zu prüfen."
      },
      {
        "title": "Stablecoin-Zahlung ausführen",
        "body": "StablePay berechnet den Zahlungsbetrag mit Echtzeit-Wechselkursen und führt die USDT- oder USDC-Zahlung über eine Non-Custodial-Wallet-Signatur aus."
      },
      {
        "title": "Dust-Sammlung & Settlement-Link",
        "body": "Kleingeld unter 0,01 USD wird automatisch angesammelt."
      }
    ]
  },
  "fr": {
    "label": "Architecture de paiement",
    "title": "Architecture de paiement StablePay",
    "sub": "Le vendeur saisit le prix en devise locale et l’application indique le montant dû en USDC ou USDT. L’acheteur vérifie la demande par QR ou OTP à 7 chiffres et l’approuve dans son portefeuille. Les réseaux pris en charge figurent dans les paramètres de paiement de l’application.",
    "core": "Un protocole de paiement stablecoin QR/OTP basé sur la demande : le vendeur crée une demande de paiement depuis n’importe quel smartphone sans terminal POS externe, tandis que l’acheteur approuve le paiement par signature de wallet.",
    "caption": "StablePay permet à une seule application de servir à la fois de wallet acheteur et de terminal vendeur, avec une structure de paiement QR/OTP sans matériel POS externe.",
    "note": "Sur mobile, touchez l’image pour l’ouvrir en grand format.",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "Architecture de paiement StablePay - Protocole QR OTP Stablecoin basé sur la demande",
    "steps": [
      {
        "title": "Le vendeur crée une demande",
        "body": "Le vendeur saisit le montant en devise locale, la devise sélectionnée et les informations réseau, puis génère un QR code ou un OTP à 7 chiffres."
      },
      {
        "title": "L’acheteur approuve le paiement",
        "body": "L’acheteur scanne le QR code ou saisit l’OTP pour vérifier le montant demandé et l’adresse du wallet."
      },
      {
        "title": "Exécution du paiement en stablecoin",
        "body": "StablePay calcule le montant avec les taux de change en temps réel et exécute le paiement USDT ou USDC via une signature de wallet non-custodial."
      },
      {
        "title": "Accumulation du dust & lien de règlement",
        "body": "La monnaie inférieure à 0,01 USD est accumulée automatiquement."
      }
    ]
  },
  "pt": {
    "label": "Arquitetura de Pagamento",
    "title": "Arquitetura de Pagamento StablePay",
    "sub": "O vendedor digita um valor em moeda local e o aplicativo mostra o valor a pagar em USDC ou USDT. O comprador confere a solicitação por QR ou OTP de 7 dígitos e aprova na própria carteira. Consulte as redes compatíveis nas configurações de pagamento do aplicativo.",
    "core": "Um protocolo de pagamento stablecoin QR/OTP baseado em solicitação: vendedores criam solicitações de pagamento diretamente de qualquer smartphone, sem terminal POS externo, enquanto compradores aprovam o pagamento com assinatura da carteira.",
    "caption": "A StablePay permite que um único aplicativo funcione como carteira do comprador e terminal do vendedor, oferecendo uma estrutura de pagamento QR/OTP sem hardware POS externo.",
    "note": "No celular, toque na imagem para ver em tamanho completo.",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "Arquitetura de Pagamento StablePay - Protocolo QR OTP Stablecoin baseado em solicitação",
    "steps": [
      {
        "title": "Vendedor cria a solicitação",
        "body": "O vendedor informa o valor em moeda local, a moeda selecionada e os detalhes da rede, depois gera um QR code ou OTP de 7 dígitos."
      },
      {
        "title": "Comprador aprova o pagamento",
        "body": "O comprador escaneia o QR code ou insere o OTP para verificar o valor solicitado e o endereço da carteira."
      },
      {
        "title": "Execução do pagamento em Stablecoin",
        "body": "A StablePay calcula o valor do pagamento com taxas de câmbio em tempo real e executa o pagamento em USDT ou USDC por assinatura de carteira non-custodial."
      },
      {
        "title": "Acúmulo de dust e conexão com liquidação",
        "body": "O troco inferior a US$ 0,01 é acumulado automaticamente."
      }
    ]
  },
  "es": {
    "label": "Arquitectura de pago",
    "title": "Arquitectura de pago de StablePay",
    "sub": "El vendedor introduce un precio en moneda local y la aplicación muestra el importe en USDC o USDT. El comprador revisa la solicitud mediante QR u OTP de 7 dígitos y la aprueba en su cartera. Consulta las redes compatibles en la configuración de pago de la aplicación.",
    "core": "Un protocolo de pago con stablecoins QR/OTP basado en solicitud: los vendedores crean solicitudes de pago directamente desde cualquier smartphone sin terminal POS externo, mientras los compradores aprueban el pago con una firma de wallet.",
    "caption": "StablePay permite que una sola app funcione como wallet del comprador y terminal del vendedor, ofreciendo una estructura de pago QR/OTP sin hardware POS externo.",
    "note": "En móvil, toca la imagen para verla en tamaño completo.",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "Arquitectura de pago StablePay - Protocolo QR OTP Stablecoin basado en solicitud",
    "steps": [
      {
        "title": "El vendedor crea una solicitud",
        "body": "El vendedor introduce el importe en moneda local, la moneda seleccionada y los datos de red, y luego genera un código QR o un OTP de 7 dígitos."
      },
      {
        "title": "El comprador aprueba el pago",
        "body": "El comprador escanea el código QR o introduce el OTP para verificar el importe solicitado y la dirección de la wallet."
      },
      {
        "title": "Ejecución del pago en Stablecoin",
        "body": "StablePay calcula el importe con tipos de cambio en tiempo real y ejecuta el pago en USDT o USDC mediante una firma de wallet no custodial."
      },
      {
        "title": "Acumulación de dust y enlace de liquidación",
        "body": "El cambio inferior a 0,01 USD se acumula automáticamente."
      }
    ]
  },
  "hi": {
    "label": "पेमेंट आर्किटेक्चर",
    "title": "StablePay पेमेंट आर्किटेक्चर",
    "sub": "विक्रेता स्थानीय मुद्रा में राशि दर्ज करता है और ऐप देय USDC या USDT की राशि दिखाता है। खरीदार QR या 7 अंकों के OTP से अनुरोध जाँचता है और अपने वॉलेट में भुगतान स्वीकृत करता है। समर्थित नेटवर्क ऐप की भुगतान सेटिंग में देखें।",
    "core": "Request-based QR/OTP stablecoin payment protocol: sellers किसी external POS terminal के बिना किसी भी smartphone से payment request बना सकते हैं, और buyers wallet signature से payment approve करते हैं।",
    "caption": "StablePay एक ही app को buyer wallet और seller terminal दोनों की भूमिका देता है, जिससे external POS hardware के बिना QR/OTP request-based payment structure उपलब्ध होता है।",
    "note": "मोबाइल पर image को full size में देखने के लिए tap करें।",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "StablePay Payment Architecture - Request-Based QR OTP Stablecoin Payment Protocol",
    "steps": [
      {
        "title": "Seller request बनाता है",
        "body": "Seller local currency amount, selected currency और network details दर्ज करता है, फिर QR code या 7-digit OTP generate करता है।"
      },
      {
        "title": "Buyer payment approve करता है",
        "body": "Buyer QR code scan करता है या OTP दर्ज करता है ताकि requested amount और wallet address verify हो सके।"
      },
      {
        "title": "Stablecoin payment execution",
        "body": "StablePay real-time exchange rates से payment amount calculate करता है और non-custodial wallet signature के माध्यम से USDT या USDC payment execute करता है।"
      },
      {
        "title": "Dust accumulation और settlement link",
        "body": "0.01 अमेरिकी डॉलर से कम की बची हुई राशि अपने आप जमा होती है।"
      }
    ]
  },
  "ru": {
    "label": "Платежная архитектура",
    "title": "Платежная архитектура StablePay",
    "sub": "Продавец вводит цену в местной валюте, и приложение показывает сумму к оплате в USDC или USDT. Покупатель проверяет запрос по QR или 7-значному OTP и подтверждает платёж в своём кошельке. Поддерживаемые сети указаны в настройках оплаты приложения.",
    "core": "Платежный протокол QR/OTP для стейблкоинов на основе запроса: продавец создает платежный запрос с любого смартфона без внешнего POS-терминала, а покупатель подтверждает оплату подписью кошелька.",
    "caption": "StablePay позволяет одному приложению работать одновременно как кошелек покупателя и терминал продавца, обеспечивая QR/OTP-структуру оплаты без внешнего POS-оборудования.",
    "note": "На мобильном устройстве нажмите на изображение, чтобы открыть его в полном размере.",
    "img": "stablepay-payment-architecture-en.webp",
    "alt": "Платежная архитектура StablePay - QR OTP протокол оплаты стейблкоинами на основе запроса",
    "steps": [
      {
        "title": "Продавец создает запрос",
        "body": "Продавец вводит сумму в местной валюте, выбранную валюту и данные сети, затем генерирует QR-код или 7-значный OTP."
      },
      {
        "title": "Покупатель подтверждает оплату",
        "body": "Покупатель сканирует QR-код или вводит OTP, чтобы проверить запрошенную сумму и адрес кошелька."
      },
      {
        "title": "Выполнение платежа в Stablecoin",
        "body": "StablePay рассчитывает сумму платежа по курсу в реальном времени и выполняет платеж USDT или USDC через подпись non-custodial кошелька."
      },
      {
        "title": "Накопление dust и связь с расчетами",
        "body": "Остатки менее 0,01 USD накапливаются автоматически."
      }
    ]
  }
};


var MISDEPOSIT_IMAGE_SRC = {
  ko: "stablepay-mistaken-transfer-prevention-ko.jpg",
  en: "stablepay-mistaken-transfer-prevention-en.jpg"
};

var MISDEPOSIT_COPY = {
  "ko": {
    "label": "오입금 방지 기술",
    "title": "가상자산 오입금 방지 기술 비교",
    "sub": "StablePay는 네트워크·화폐 코드·스마트 컨트랙트 주소 불일치를 앱 단계에서 감지하여 결제 버튼을 자동 비활성화하는 사전 차단 구조를 제공합니다.",
    "core": "StablePay의 핵심은 사용자에게 ‘확인하라’고 맡기는 수동 대조가 아니라, 불일치가 감지되면 결제 자체가 진행되지 않도록 막는 자동 보안 로직입니다.",
    "caption": "StablePay는 특허 제10-2888374-0000호 기반의 요청 기반 QR/OTP 스테이블코인 결제 구조를 통해 네트워크·화폐 코드 불일치로 인한 고위험 오입금을 결제 실행 전 단계에서 차단하도록 설계되었습니다.",
    "note": "모바일에서는 이미지를 누르면 크게 볼 수 있습니다.",
    "alt": "가상자산 오입금 방지 기술 비교 - 기존 송금 방식과 StablePay 혁신 기술"
  },
  "en": {
    "label": "Mistaken Transfer Prevention",
    "title": "Preventing Mistaken Digital Asset Transfers",
    "sub": "StablePay detects mismatches between currency code, network, and smart contract or wallet address at the app level, then automatically disables the payment button before a mistaken transfer can occur.",
    "core": "The key difference is not asking users to manually double-check. StablePay blocks the transaction path itself when a mismatch is detected.",
    "caption": "Conventional digital asset transfers leave liability to the user after an irreversible mistake. StablePay is designed as a patented, request-based stablecoin payment structure that prevents high-risk mismatches before payment execution. Korean Patent No. 10-2888374-0000.",
    "note": "On mobile, tap the image to view it in full size.",
    "alt": "Preventing mistaken digital asset transfers - Conventional method versus StablePay innovative technology"
  },
  "ja": {
    "label": "誤送金防止技術",
    "title": "暗号資産の誤送金防止技術比較",
    "sub": "StablePayは、通貨コード、ネットワーク、スマートコントラクトまたはウォレットアドレスの不一致をアプリ内で検知し、誤送金が発生する前に決済ボタンを自動的に無効化します。",
    "core": "StablePayの違いは、ユーザーに手動確認を任せるのではなく、不一致が検知された時点で決済経路そのものを遮断する点にあります。",
    "caption": "StablePayは、特許番号10-2888374-0000に基づくリクエスト型QR/OTPステーブルコイン決済構造により、ネットワークや通貨コードの不一致による高リスクな誤送金を決済実行前に防ぐよう設計されています。",
    "note": "モバイルでは画像をタップすると拡大表示できます。",
    "alt": "暗号資産の誤送金防止技術比較 - 従来方式とStablePay革新技術"
  },
  "zh": {
    "label": "误转防范技术",
    "title": "数字资产误转防范技术比较",
    "sub": "StablePay可在应用层检测货币代码、网络、智能合约或钱包地址的不一致，并在误转发生前自动禁用支付按钮。",
    "core": "StablePay的核心并不是让用户自行反复核对，而是在检测到不一致时直接阻断交易路径。",
    "caption": "StablePay基于专利号10-2888374-0000的请求式QR/OTP稳定币支付结构，旨在支付执行前阻止因网络或货币代码不一致导致的高风险误转。",
    "note": "在移动设备上，点击图片可查看大图。",
    "alt": "数字资产误转防范技术比较 - 传统方式与StablePay创新技术"
  },
  "zh-hk": {
    "label": "誤轉防範技術",
    "title": "數碼資產誤轉防範技術比較",
    "sub": "StablePay會在應用程式層面偵測貨幣代碼、網絡、智能合約或錢包地址不一致，並在誤轉發生前自動停用付款按鈕。",
    "core": "StablePay的核心並不是要求用戶自行反覆核對，而是在偵測到不一致時直接阻斷交易路徑。",
    "caption": "StablePay基於專利號10-2888374-0000的請求式QR/OTP穩定幣付款結構，旨在付款執行前阻止因網絡或貨幣代碼不一致造成的高風險誤轉。",
    "note": "在流動裝置上，點按圖片可查看大圖。",
    "alt": "數碼資產誤轉防範技術比較 - 傳統方式與StablePay創新技術"
  },
  "th": {
    "label": "เทคโนโลยีป้องกันการโอนผิด",
    "title": "เปรียบเทียบเทคโนโลยีป้องกันการโอนสินทรัพย์ดิจิทัลผิดพลาด",
    "sub": "StablePay ตรวจจับความไม่ตรงกันของรหัสสกุลเงิน เครือข่าย สมาร์ตคอนแทรกต์ หรือที่อยู่วอลเล็ตในระดับแอป และปิดใช้งานปุ่มชำระเงินโดยอัตโนมัติก่อนเกิดการโอนผิด",
    "core": "จุดต่างสำคัญคือ StablePay ไม่ได้ปล่อยให้ผู้ใช้ตรวจสอบเองทั้งหมด แต่จะบล็อกเส้นทางธุรกรรมทันทีเมื่อพบความไม่ตรงกัน",
    "caption": "StablePay ได้รับการออกแบบด้วยโครงสร้างการชำระเงินสเตเบิลคอยน์แบบ QR/OTP ตามคำขอ โดยอ้างอิงสิทธิบัตรเลขที่ 10-2888374-0000 เพื่อป้องกันการโอนผิดที่มีความเสี่ยงสูงก่อนการชำระเงินจริง",
    "note": "บนมือถือ ให้แตะรูปภาพเพื่อดูขนาดเต็ม",
    "alt": "เปรียบเทียบเทคโนโลยีป้องกันการโอนสินทรัพย์ดิจิทัลผิดพลาด - วิธีดั้งเดิมกับ StablePay"
  },
  "vi": {
    "label": "Công nghệ chống chuyển nhầm",
    "title": "So sánh công nghệ ngăn chuyển nhầm tài sản số",
    "sub": "StablePay phát hiện sự không khớp giữa mã tiền tệ, mạng lưới, smart contract hoặc địa chỉ ví ngay trong ứng dụng, rồi tự động vô hiệu hóa nút thanh toán trước khi giao dịch nhầm xảy ra.",
    "core": "Điểm khác biệt cốt lõi là StablePay không chỉ yêu cầu người dùng tự kiểm tra thủ công, mà chặn luôn đường dẫn giao dịch khi phát hiện sai lệch.",
    "caption": "StablePay được thiết kế dựa trên cấu trúc thanh toán stablecoin QR/OTP theo yêu cầu, theo Bằng sáng chế số 10-2888374-0000, nhằm ngăn các lỗi chuyển nhầm rủi ro cao trước khi thanh toán được thực thi.",
    "note": "Trên thiết bị di động, hãy chạm vào hình ảnh để xem kích thước đầy đủ.",
    "alt": "So sánh công nghệ ngăn chuyển nhầm tài sản số - phương thức truyền thống và công nghệ StablePay"
  },
  "fil": {
    "label": "Teknolohiya Laban sa Maling Transfer",
    "title": "Paghahambing ng Teknolohiya para Maiwasan ang Maling Digital Asset Transfer",
    "sub": "Nade-detect ng StablePay sa mismong app ang hindi pagtutugma ng currency code, network, smart contract, o wallet address, at awtomatikong dini-disable ang payment button bago mangyari ang maling transfer.",
    "core": "Ang pangunahing kaibahan ay hindi lang pinapaubaya ng StablePay sa user ang manual checking; kapag may mismatch, hinaharang nito ang mismong transaction path.",
    "caption": "Dinisenyo ang StablePay bilang request-based QR/OTP stablecoin payment structure batay sa Korean Patent No. 10-2888374-0000 upang pigilan ang high-risk mismatched transfers bago pa maisagawa ang payment.",
    "note": "Sa mobile, i-tap ang larawan upang makita ito sa full size.",
    "alt": "Paghahambing ng teknolohiya para maiwasan ang maling digital asset transfer - tradisyonal na paraan at StablePay"
  },
  "ar": {
    "label": "تقنية منع التحويل الخاطئ",
    "title": "مقارنة تقنية منع تحويل الأصول الرقمية بالخطأ",
    "sub": "تكتشف StablePay عدم تطابق رمز العملة أو الشبكة أو عنوان العقد الذكي أو المحفظة داخل التطبيق، ثم تعطل زر الدفع تلقائياً قبل حدوث تحويل خاطئ.",
    "core": "الفرق الأساسي هو أن StablePay لا تترك التحقق اليدوي للمستخدم فقط، بل تمنع مسار المعاملة نفسه عند اكتشاف أي عدم تطابق.",
    "caption": "صُممت StablePay كبنية دفع بالعملات المستقرة عبر QR/OTP قائمة على الطلب، وفق براءة الاختراع رقم 10-2888374-0000، لمنع التحويلات عالية المخاطر قبل تنفيذ الدفع.",
    "note": "على الهاتف المحمول، اضغط على الصورة لعرضها بالحجم الكامل.",
    "alt": "مقارنة تقنية منع تحويل الأصول الرقمية بالخطأ - الطريقة التقليدية مقابل StablePay"
  },
  "de": {
    "label": "Schutz vor Fehlüberweisungen",
    "title": "Vergleich der Technologie zur Vermeidung falscher Digital-Asset-Transfers",
    "sub": "StablePay erkennt Abweichungen bei Währungscode, Netzwerk, Smart Contract oder Wallet-Adresse direkt in der App und deaktiviert den Zahlungsbutton automatisch, bevor ein Fehltransfer entstehen kann.",
    "core": "Der wesentliche Unterschied: StablePay verlässt sich nicht nur auf manuelle Prüfung durch den Nutzer, sondern blockiert den Transaktionspfad selbst, sobald ein Mismatch erkannt wird.",
    "caption": "StablePay ist als patentierte, anfragebasierte QR/OTP-Stablecoin-Zahlungsstruktur konzipiert, um risikoreiche Fehltransfers vor der Zahlungsausführung zu verhindern. Patent Nr. 10-2888374-0000.",
    "note": "Auf Mobilgeräten tippen Sie auf das Bild, um es in voller Größe zu öffnen.",
    "alt": "Vergleich der Technologie zur Vermeidung falscher Digital-Asset-Transfers - konventionelle Methode versus StablePay"
  },
  "fr": {
    "label": "Prévention des transferts erronés",
    "title": "Comparaison des technologies de prévention des transferts d’actifs numériques erronés",
    "sub": "StablePay détecte dans l’application les incohérences de code de devise, de réseau, de smart contract ou d’adresse de portefeuille, puis désactive automatiquement le bouton de paiement avant qu’un transfert erroné ne puisse se produire.",
    "core": "La différence essentielle est que StablePay ne se limite pas à demander une vérification manuelle à l’utilisateur : lorsqu’une incohérence est détectée, le chemin de transaction est bloqué.",
    "caption": "StablePay est conçue comme une structure brevetée de paiement en stablecoin par QR/OTP sur demande, afin de prévenir les transferts à haut risque avant l’exécution du paiement. Brevet n° 10-2888374-0000.",
    "note": "Sur mobile, touchez l’image pour l’ouvrir en grand format.",
    "alt": "Comparaison des technologies de prévention des transferts d’actifs numériques erronés - méthode conventionnelle et StablePay"
  },
  "pt": {
    "label": "Prevenção de transferências incorretas",
    "title": "Comparação da tecnologia para evitar transferências incorretas de ativos digitais",
    "sub": "O StablePay detecta no nível do aplicativo divergências de código de moeda, rede, smart contract ou endereço de carteira, e desativa automaticamente o botão de pagamento antes que uma transferência incorreta ocorra.",
    "core": "A principal diferença é que o StablePay não depende apenas da conferência manual do usuário; quando detecta uma incompatibilidade, bloqueia o próprio caminho da transação.",
    "caption": "O StablePay foi projetado como uma estrutura patenteada de pagamento em stablecoin por QR/OTP baseada em solicitação, para impedir transferências de alto risco antes da execução do pagamento. Patente nº 10-2888374-0000.",
    "note": "No celular, toque na imagem para ver em tamanho completo.",
    "alt": "Comparação da tecnologia para evitar transferências incorretas de ativos digitais - método convencional versus StablePay"
  },
  "es": {
    "label": "Prevención de transferencias erróneas",
    "title": "Comparación de tecnología para prevenir transferencias erróneas de activos digitales",
    "sub": "StablePay detecta en la aplicación discrepancias de código de moneda, red, smart contract o dirección de billetera, y desactiva automáticamente el botón de pago antes de que ocurra una transferencia errónea.",
    "core": "La diferencia clave es que StablePay no deja todo a la verificación manual del usuario; cuando detecta una discrepancia, bloquea directamente la ruta de la transacción.",
    "caption": "StablePay está diseñado como una estructura patentada de pago con stablecoins mediante QR/OTP basada en solicitud, para prevenir transferencias de alto riesgo antes de ejecutar el pago. Patente n.º 10-2888374-0000.",
    "note": "En móvil, toca la imagen para verla en tamaño completo.",
    "alt": "Comparación de tecnología para prevenir transferencias erróneas de activos digitales - método convencional frente a StablePay"
  },
  "hi": {
    "label": "गलत ट्रांसफ़र रोकथाम तकनीक",
    "title": "डिजिटल एसेट के गलत ट्रांसफ़र को रोकने वाली तकनीक की तुलना",
    "sub": "StablePay ऐप स्तर पर करेंसी कोड, नेटवर्क, स्मार्ट कॉन्ट्रैक्ट या वॉलेट पते की असंगति पहचानता है और गलत ट्रांसफ़र होने से पहले भुगतान बटन को स्वतः निष्क्रिय कर देता है।",
    "core": "मुख्य अंतर यह है कि StablePay उपयोगकर्ता पर केवल मैनुअल जाँच नहीं छोड़ता; असंगति मिलते ही यह लेन-देन के रास्ते को ही रोक देता है।",
    "caption": "StablePay को अनुरोध-आधारित QR/OTP स्टेबलकॉइन भुगतान संरचना के रूप में डिज़ाइन किया गया है, जो पेटेंट संख्या 10-2888374-0000 पर आधारित है और भुगतान निष्पादन से पहले उच्च जोखिम वाले गलत ट्रांसफ़र को रोकता है।",
    "note": "मोबाइल पर image को full size में देखने के लिए tap करें।",
    "alt": "डिजिटल एसेट के गलत ट्रांसफ़र को रोकने वाली तकनीक की तुलना - पारंपरिक तरीका बनाम StablePay"
  },
  "ru": {
    "label": "Защита от ошибочных переводов",
    "title": "Сравнение технологий предотвращения ошибочных переводов цифровых активов",
    "sub": "StablePay на уровне приложения обнаруживает несоответствие кода валюты, сети, smart contract или адреса кошелька и автоматически отключает кнопку оплаты до совершения ошибочного перевода.",
    "core": "Ключевое отличие в том, что StablePay не перекладывает всё на ручную проверку пользователя: при обнаружении несоответствия сам путь транзакции блокируется.",
    "caption": "StablePay разработан как запатентованная структура платежей в стейблкоинах через QR/OTP по запросу, чтобы предотвращать высокорисковые ошибки до исполнения платежа. Патент № 10-2888374-0000.",
    "note": "На мобильном устройстве нажмите на изображение, чтобы открыть его в полном размере.",
    "alt": "Сравнение технологий предотвращения ошибочных переводов цифровых активов - традиционный метод и StablePay"
  }
};

function updateMisdepositComparison(lang) {
  var copy = MISDEPOSIT_COPY[lang] || MISDEPOSIT_COPY.en;
  var imageSrc = (lang === 'ko') ? MISDEPOSIT_IMAGE_SRC.ko : MISDEPOSIT_IMAGE_SRC.en;
  var map = {
    "misdeposit-comparison-label": copy.label,
    "misdeposit-comparison-title": copy.title,
    "misdeposit-comparison-sub": copy.sub,
    "misdeposit-comparison-core": copy.core,
    "misdeposit-comparison-caption": copy.caption,
    "misdeposit-comparison-mobile-note": copy.note
  };
  for (var id in map) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = map[id];
  }
  var img = document.getElementById("misdeposit-comparison-img");
  var link = document.getElementById("misdeposit-comparison-link");
  if (img) {
    img.src = new URL(imageSrc, siteRoot).href;
    img.alt = copy.alt;
  }
  if (link) link.href = new URL(imageSrc, siteRoot).href;
}

function updatePaymentArchitecture(lang) {
  var copy = PAYMENT_ARCH_COPY[lang] || PAYMENT_ARCH_COPY.en;
  var map = {
    "payment-architecture-label": copy.label,
    "payment-architecture-title": copy.title,
    "payment-architecture-sub": copy.sub,
    "payment-architecture-core": copy.core,
    "payment-architecture-caption": copy.caption,
    "payment-architecture-mobile-note": copy.note
  };
  for (var id in map) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = map[id];
  }
  var img = document.getElementById("payment-architecture-img");
  var link = document.getElementById("payment-architecture-link");
  if (img) {
    img.src = new URL(copy.img, siteRoot).href;
    img.alt = copy.alt;
  }
  if (link) link.href = new URL(copy.img, siteRoot).href;

  if (copy.steps) {
    copy.steps.forEach(function(step, idx) {
      var n = idx + 1;
      var titleEl = document.getElementById("payment-architecture-step" + n + "-title");
      var bodyEl = document.getElementById("payment-architecture-step" + n + "-body");
      if (titleEl) titleEl.innerHTML = step.title;
      if (bodyEl) bodyEl.innerHTML = step.body;
    });
  }
}

function updateQrParadigm(lang) {
  var copy = QR_COPY[lang] || QR_COPY.en;
  var map = {
    "qr-paradigm-label": copy.label,
    "qr-paradigm-title": copy.title,
    "qr-paradigm-sub": copy.sub,
    "qr-paradigm-core": copy.core,
    "qr-paradigm-caption": copy.caption,
    "qr-paradigm-mobile-note": copy.note
  };
  for (var id in map) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = map[id];
  }
  var img = document.getElementById("qr-paradigm-img");
  var link = document.getElementById("qr-paradigm-link");
  if (img) {
    img.src = new URL(copy.img, siteRoot).href;
    img.alt = copy.alt;
  }
  if (link) link.href = new URL(copy.img, siteRoot).href;
}

function updateFxInvisible(lang) {
  var t = TEXTS[lang] || TEXTS['en'];
  var ids = ['fx-invisible-label','fx-invisible-title','fx-invisible-sub','fx-invisible-core','fx-invisible-caption','fx-invisible-mobile'];
  ids.forEach(function(id) {
    var el = document.getElementById(id === 'fx-invisible-mobile' ? 'fx-invisible-mobile-note' : id);
    if (el && t[id]) el.innerHTML = t[id];
  });
  var img = document.getElementById('fx-invisible-img');
  var link = document.getElementById('fx-invisible-link');
  var src = (t && t['fx-invisible-img']) ? t['fx-invisible-img'] : '원화_스테이블코인_시대_결제_구조_Eng_2.jpg';
  if (img) {
    img.src = new URL(src, siteRoot).href;
    img.alt = lang === 'ko' ? '원화 스테이블코인 결제 구조' : 'Stablecoin payment example priced in Korean won';
  }
  if (link) link.href = new URL(src, siteRoot).href;
}


// Wrap existing translated title lines so language switching preserves the motion.
function animateHeroTitle() {
  var title = document.getElementById('hero-h1');
  if (!title) return;
  var lines = title.innerHTML.split(/<br\s*\/?>/i);
  var fragment = document.createDocumentFragment();
  title.classList.remove('hero-motion-ready');
  lines.forEach(function(html, index) {
    var line = document.createElement('span');
    line.className = 'hero-line';
    line.style.setProperty('--hero-line-delay', (0.1 + index * 0.24) + 's');
    line.innerHTML = html;
    line.querySelectorAll('span').forEach(function(emphasis) {
      emphasis.classList.add('hero-emphasis');
    });
    fragment.appendChild(line);
    if (index < lines.length - 1) fragment.appendChild(document.createTextNode('\n'));
  });
  title.replaceChildren(fragment);
  title.classList.add('hero-motion-ready');
}


const paymentDemo = document.getElementById('payment-demo-video');
const paymentDemoFallback = document.getElementById('payment-demo-fallback');
const paymentDemoMedia = {
  ko: {src: new URL('StablePay_QR_USDC_Demo_KO.mp4', siteRoot).href, poster: new URL('assets/payment-demo-ko.jpg', siteRoot).href},
  en: {src: new URL('StablePay_QR_USDC_Demo_EN.mp4', siteRoot).href, poster: new URL('assets/payment-demo-en.jpg', siteRoot).href},
};

function updatePaymentDemo(lang) {
  const videoLang = lang === 'ko' ? 'ko' : 'en';
  if (paymentDemo.lang === videoLang) return;

  const media = paymentDemoMedia[videoLang];
  paymentDemo.pause();
  paymentDemo.lang = videoLang;
  paymentDemo.poster = media.poster;
  paymentDemo.src = media.src;
  paymentDemoFallback.href = media.src;
  paymentDemo.load();
}

document.getElementById('btn-payment-demo').addEventListener('click', function () {
  // The link scrolls to the player even if inline playback is unavailable.
  const playback = paymentDemo.play();
  if (playback) playback.catch(function () {});
});

function setLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('lang', lang);

  // RTL 지원 (아랍어)
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.style.direction = 'rtl';
    document.body.style.textAlign = 'right';
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.style.direction = 'ltr';
    document.body.style.textAlign = '';
  }

  // ID 기반 텍스트 교체
  var texts = TEXTS[lang] || TEXTS['en'];
  for (var id in texts) {
    var el = document.getElementById(id);
    if (el && el.tagName !== 'IMG') el.innerHTML = texts[id];
  }

  animateHeroTitle();
  updatePaymentDemo(lang);

  // 화폐/국가 태그 (data-ko/en/ja 방식, 없으면 영어 fallback)
  document.querySelectorAll('.c-name').forEach(function(el) {
    var val = el.getAttribute('data-' + lang);
    if (!val) val = el.getAttribute('data-en') || el.getAttribute('data-ko') || el.textContent;
    el.textContent = val;
  });

  updateQrParadigm(lang);
  updatePaymentArchitecture(lang);
  updateMisdepositComparison(lang);
  updateCafeCaption(lang);
  updateFxInvisible(lang);

  // 모달 바디 전환
  var bodies = [
    'privacy-body-ko','privacy-body-ja','privacy-body-zh','privacy-body-zh-hk','privacy-body-th','privacy-body-vi','privacy-body-fil','privacy-body-ar','privacy-body-de','privacy-body-fr','privacy-body-pt','privacy-body-es','privacy-body-hi','privacy-body-ru','privacy-body-en',
    'terms-body-ko','terms-body-ja','terms-body-zh','terms-body-zh-hk','terms-body-th','terms-body-vi','terms-body-fil','terms-body-ar','terms-body-de','terms-body-fr','terms-body-pt','terms-body-es','terms-body-hi','terms-body-ru','terms-body-en'
  ];
  bodies.forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var active =
      (id === 'privacy-body-ko' && lang === 'ko') ||
      (id === 'privacy-body-ja' && lang === 'ja') ||
      (id === 'privacy-body-zh' && lang === 'zh') ||
      (id === 'privacy-body-zh-hk' && lang === 'zh-hk') ||
      (id === 'privacy-body-th' && lang === 'th') ||
      (id === 'privacy-body-vi' && lang === 'vi') ||
      (id === 'privacy-body-fil' && lang === 'fil') ||
      (id === 'privacy-body-ar' && lang === 'ar') ||
      (id === 'privacy-body-de' && lang === 'de') ||
      (id === 'privacy-body-fr' && lang === 'fr') ||
      (id === 'privacy-body-pt' && lang === 'pt') ||
      (id === 'privacy-body-es' && lang === 'es') ||
      (id === 'privacy-body-hi' && lang === 'hi') ||
      (id === 'privacy-body-ru' && lang === 'ru') ||
      (id === 'privacy-body-en' && lang !== 'ko' && lang !== 'ja' && lang !== 'zh' && lang !== 'zh-hk' && lang !== 'th' && lang !== 'vi' && lang !== 'fil' && lang !== 'ar' && lang !== 'de' && lang !== 'fr' && lang !== 'pt' && lang !== 'es' && lang !== 'hi' && lang !== 'ru') ||
      (id === 'terms-body-ko' && lang === 'ko') ||
      (id === 'terms-body-ja' && lang === 'ja') ||
      (id === 'terms-body-zh' && lang === 'zh') ||
      (id === 'terms-body-zh-hk' && lang === 'zh-hk') ||
      (id === 'terms-body-th' && lang === 'th') ||
      (id === 'terms-body-vi' && lang === 'vi') ||
      (id === 'terms-body-fil' && lang === 'fil') ||
      (id === 'terms-body-ar' && lang === 'ar') ||
      (id === 'terms-body-de' && lang === 'de') ||
      (id === 'terms-body-fr' && lang === 'fr') ||
      (id === 'terms-body-pt' && lang === 'pt') ||
      (id === 'terms-body-es' && lang === 'es') ||
      (id === 'terms-body-hi' && lang === 'hi') ||
      (id === 'terms-body-ru' && lang === 'ru') ||
      (id === 'terms-body-en' && lang !== 'ko' && lang !== 'ja' && lang !== 'zh' && lang !== 'zh-hk' && lang !== 'th' && lang !== 'vi' && lang !== 'fil' && lang !== 'ar' && lang !== 'de' && lang !== 'fr' && lang !== 'pt' && lang !== 'es' && lang !== 'hi' && lang !== 'ru');
    el.style.display = active ? 'block' : 'none';
  });
}

setLang(currentLang);
