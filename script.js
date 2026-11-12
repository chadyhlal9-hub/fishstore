/* =========================================================
   FishStore — منطق المتجر
   عدّل قائمة PRODUCTS لتغيير المنتجات.
   لإضافة صورة حقيقية: img: "images/betta.jpg"
   ========================================================= */
(() => {
  "use strict";

  /* ---------- الإعدادات ---------- */
  const CURRENCY = "د.ت";
  const FREE_DELIVERY = 150;    // توصيل مجاني فوق هذا المبلغ
  const DELIVERY_FEE = 7;       // سعر التوصيل
  const WHATSAPP = "";          // مثال: "21622123456" لإرسال الطلب إلى واتساب (اتركه فارغاً للنسخة التجريبية)

  const GOVERNORATES = ["تونس", "أريانة", "بن عروس", "منوبة", "نابل", "بنزرت", "زغوان", "باجة", "جندوبة", "الكاف", "سليانة", "القيروان", "القصرين", "سيدي بوزيد", "سوسة", "المنستير", "المهدية", "صفاقس", "قفصة", "توزر", "قبلي", "قابس", "مدنين", "تطاوين"];

  /* ---------- المنتجات ----------
     type: fish | betta | tank | filter | heater | food | plant | rock | bottle | box
     c / d: لونان للرسم — live: true لعرض شارة «حي»                                */
  const PRODUCTS = [
    { id: 1,  name: "سمك البيتا (Betta) كبير الذيل", cat: "fish",  price: 25,  old: 35,  rating: 4.9, reviews: 187, type: "betta", c: "#e0483d", d: "#7a2bd9", live: true },
    { id: 2,  name: "سمك الذهب (Goldfish)",           cat: "fish",  price: 15,  old: 22,  rating: 4.8, reviews: 143, type: "fish",  c: "#ff8a3d", d: "#ffd27a", live: true },
    { id: 3,  name: "سمك الملاك (Angelfish)",         cat: "fish",  price: 30,  old: 40,  rating: 4.7, reviews: 96,  type: "fish",  c: "#e8eef3", d: "#8d9db0", live: true },
    { id: 4,  name: "نيون تترا — مجموعة 6 أسماك",     cat: "fish",  price: 18,  old: null, rating: 4.8, reviews: 121, type: "fish",  c: "#29c3e8", d: "#e0483d", live: true },
    { id: 5,  name: "حوض زجاجي 60 لتر مع غطاء",       cat: "tank",  price: 189, old: 239, rating: 4.9, reviews: 74,  type: "tank",  c: "#ff8a3d" },
    { id: 6,  name: "فلتر داخلي هادئ",                cat: "equip", price: 59,  old: 79,  rating: 4.7, reviews: 109, type: "filter", c: "#29b6e8" },
    { id: 7,  name: "مدفأة مياه 100W قابلة للتعديل",  cat: "equip", price: 45,  old: null, rating: 4.6, reviews: 63,  type: "heater", c: "#ff5a5f" },
    { id: 8,  name: "غذاء أسماك الزينة 100 غ",        cat: "food",  price: 14,  old: null, rating: 4.8, reviews: 212, type: "food",  c: "#ffb300" },
    { id: 9,  name: "نباتات مائية طبيعية (حزمة)",     cat: "decor", price: 22,  old: 30,  rating: 4.6, reviews: 58,  type: "plant", c: "#2fb36b" },
    { id: 10, name: "ديكور كهف وصخور",                cat: "decor", price: 35,  old: 49,  rating: 4.5, reviews: 47,  type: "rock",  c: "#7d8b99" },
    { id: 11, name: "مكيّف مياه الحوض 250 مل",         cat: "care",  price: 19,  old: 29,  rating: 4.8, reviews: 135, type: "bottle", c: "#29b6e8" },
    { id: 12, name: "باقة المبتدئ الكاملة",           cat: "packs", price: 249, old: 329, rating: 4.9, reviews: 52,  type: "box",   c: "#0b5fa8" }
  ];

  /* ---------- رسومات SVG بديلة للصور ---------- */
  let uid = 0;
  function art(type, c = "#29b6e8", d = "#0b5fa8") {
    const id = "g" + (++uid);
    switch (type) {
      case "fish":
        return `<svg viewBox="0 0 140 100" aria-hidden="true">
          <path d="M96 50 L132 22 Q122 50 132 78Z" fill="${d}"/>
          <path d="M44 26 Q62 2 88 24Z" fill="${d}"/>
          <path d="M54 74 Q66 94 84 74Z" fill="${d}" opacity=".9"/>
          <ellipse cx="60" cy="50" rx="46" ry="29" fill="${c}"/>
          <path d="M64 24 Q76 50 64 76" stroke="#fff" stroke-width="5" opacity=".35" fill="none"/>
          <ellipse cx="52" cy="36" rx="24" ry="8" fill="#fff" opacity=".22"/>
          <circle cx="34" cy="44" r="7.5" fill="#fff"/><circle cx="32" cy="44" r="3.8" fill="#12243a"/>
        </svg>`;
      case "betta":
        return `<svg viewBox="0 0 170 110" aria-hidden="true">
          <path d="M104 55 C128 0 168 20 156 55 C168 90 128 110 104 55Z" fill="${d}" opacity=".92"/>
          <path d="M58 32 C70 4 100 6 108 34Z" fill="${d}"/>
          <path d="M50 78 C54 108 84 108 98 80Z" fill="${d}"/>
          <ellipse cx="64" cy="55" rx="42" ry="26" fill="${c}"/>
          <ellipse cx="56" cy="42" rx="22" ry="7" fill="#fff" opacity=".22"/>
          <circle cx="38" cy="48" r="7" fill="#fff"/><circle cx="36" cy="48" r="3.5" fill="#12243a"/>
        </svg>`;
      case "tank":
        return `<svg viewBox="0 0 140 120" aria-hidden="true">
          <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6f2fc"/><stop offset="1" stop-color="#62c4ee"/></linearGradient></defs>
          <rect x="8" y="24" width="124" height="86" rx="10" fill="url(#${id})" stroke="#fff" stroke-width="3"/>
          <rect x="8" y="90" width="124" height="20" rx="8" fill="#ecd9aa"/>
          <path d="M28 92 Q22 66 32 52 Q40 70 36 92Z" fill="#2fb36b"/>
          <path d="M38 92 Q40 70 52 60 Q50 80 44 92Z" fill="#23a05d"/>
          <path d="M112 92 Q106 68 116 56 Q124 74 120 92Z" fill="#2fb36b"/>
          <ellipse cx="76" cy="58" rx="15" ry="9.5" fill="${c}"/>
          <path d="M88 58 L102 48 Q98 58 102 68Z" fill="${c}"/>
          <circle cx="68" cy="56" r="2.3" fill="#12243a"/>
          <circle cx="58" cy="40" r="3" fill="#fff" opacity=".8"/><circle cx="64" cy="32" r="2" fill="#fff" opacity=".8"/>
          <rect x="4" y="16" width="132" height="12" rx="6" fill="#1d2b3a"/>
        </svg>`;
      case "filter":
        return `<svg viewBox="0 0 100 130" aria-hidden="true">
          <rect x="26" y="8" width="14" height="36" rx="4" fill="#2a3340"/>
          <rect x="18" y="38" width="64" height="86" rx="14" fill="#1f2d3d"/>
          <rect x="26" y="58" width="48" height="32" rx="6" fill="${c}" opacity=".92"/>
          <rect x="30" y="100" width="40" height="5" rx="2.5" fill="#3d546b"/>
          <path d="M82 52 h12 v12 h-12" fill="#2a3340"/>
          <circle cx="96" cy="44" r="3" fill="#fff" opacity=".8"/><circle cx="92" cy="32" r="2" fill="#fff" opacity=".7"/>
        </svg>`;
      case "heater":
        return `<svg viewBox="0 0 60 140" aria-hidden="true">
          <rect x="21" y="14" width="18" height="116" rx="9" fill="#cdeefb" stroke="#9ed3ea" stroke-width="2"/>
          <rect x="28" y="40" width="4" height="80" rx="2" fill="${c}"/>
          <rect x="14" y="4" width="32" height="26" rx="8" fill="#1d2b3a"/>
          <circle cx="30" cy="17" r="6" fill="${c}"/>
        </svg>`;
      case "food":
        return `<svg viewBox="0 0 120 120" aria-hidden="true">
          <defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#eef6fa"/><stop offset="1" stop-color="#c9dde8"/></linearGradient></defs>
          <rect x="18" y="20" width="84" height="22" rx="8" fill="#1d2b3a"/>
          <rect x="14" y="38" width="92" height="76" rx="14" fill="url(#${id})" stroke="#cfe0ea"/>
          <rect x="14" y="56" width="92" height="44" fill="${c}"/>
          <ellipse cx="58" cy="78" rx="16" ry="9" fill="#fff"/>
          <path d="M72 78 L86 68 Q83 78 86 88Z" fill="#fff"/>
          <circle cx="48" cy="76" r="2.2" fill="${c}"/>
        </svg>`;
      case "plant":
        return `<svg viewBox="0 0 100 130" aria-hidden="true">
          <path d="M50 100 Q26 62 38 16 Q58 58 50 100Z" fill="${c}"/>
          <path d="M50 100 Q60 56 80 30 Q82 70 50 100Z" fill="#23a05d"/>
          <path d="M50 100 Q20 84 14 54 Q42 66 50 100Z" fill="#43c77f"/>
          <path d="M28 102 h44 l-6 24 h-32z" fill="#c0623a"/>
          <rect x="26" y="98" width="48" height="8" rx="4" fill="#d97a4d"/>
        </svg>`;
      case "rock":
        return `<svg viewBox="0 0 140 100" aria-hidden="true">
          <path d="M8 92 Q12 40 50 34 Q72 8 102 36 Q132 46 132 92Z" fill="${c}"/>
          <path d="M44 92 Q44 62 70 62 Q96 62 96 92Z" fill="#26303b"/>
          <path d="M20 90 Q22 60 40 52" stroke="#fff" opacity=".28" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M104 40 Q118 54 116 70" stroke="#fff" opacity=".2" stroke-width="4" fill="none" stroke-linecap="round"/>
        </svg>`;
      case "bottle":
        return `<svg viewBox="0 0 100 160" aria-hidden="true">
          <defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#1f6f9c"/><stop offset=".45" stop-color="#3aa7d8"/><stop offset="1" stop-color="#175a82"/></linearGradient></defs>
          <rect x="40" y="4" width="20" height="32" rx="9" fill="#17191d"/>
          <rect x="33" y="34" width="34" height="15" rx="4" fill="#2a2d33"/>
          <rect x="22" y="48" width="56" height="106" rx="15" fill="url(#${id})"/>
          <rect x="22" y="84" width="56" height="46" fill="#fff"/>
          <path d="M34 108 Q50 92 66 108 Q50 124 34 108Z" fill="${c}"/>
          <rect x="30" y="56" width="6" height="88" rx="3" fill="#fff" opacity=".22"/>
        </svg>`;
      default: /* box */
        return `<svg viewBox="0 0 120 120" aria-hidden="true">
          <rect x="12" y="20" width="96" height="88" rx="10" fill="${c}"/>
          <rect x="12" y="20" width="96" height="26" rx="10" fill="#0b2a4d" opacity=".3"/>
          <ellipse cx="56" cy="70" rx="20" ry="12" fill="#fff" opacity=".95"/>
          <path d="M74 70 L90 58 Q86 70 90 82Z" fill="#fff" opacity=".95"/>
          <circle cx="44" cy="67" r="2.6" fill="${c}"/>
          <rect x="30" y="94" width="60" height="4" rx="2" fill="#fff" opacity=".85"/>
        </svg>`;
    }
  }
  const visual = (p) => p.img
    ? `<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.outerHTML=this.dataset.fb" data-fb='${art(p.type, p.c, p.d).replace(/'/g, "&#39;")}'>`
    : art(p.type, p.c, p.d);

  /* ---------- أدوات ---------- */
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const fmt = (n) => `${n.toFixed(2).replace(".", ",")} ${CURRENCY}`;
  const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const discount = (p) => (p.old ? Math.round((1 - p.price / p.old) * 100) : 0);
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };

  /* ---------- الحالة ---------- */
  let cart = store.get("fishstore-cart", []);
  let cat = "all", sort = "default", query = "";

  /* ---------- Toast ---------- */
  let tt;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2400);
  }

  /* ---------- رسومات الواجهة ---------- */
  $$("[data-art]").forEach((el) => { el.innerHTML = art(el.dataset.art, el.dataset.c, el.dataset.d); });

  /* ---------- عرض المنتجات ---------- */
  function renderProducts() {
    let list = PRODUCTS.filter((p) => cat === "all" || p.cat === cat);
    if (query) { const q = query.toLowerCase(); list = list.filter((p) => p.name.toLowerCase().includes(q)); }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

    $("#products").innerHTML = list.map((p, i) => `
      <article class="card" style="animation-delay:${i * 60}ms">
        <div class="thumb">
          ${p.old ? `<span class="badge">-${discount(p)}%</span>` : ""}
          ${p.live ? `<span class="live">🐟 حي</span>` : ""}
          <div class="art">${visual(p)}</div>
        </div>
        <h3>${p.name}</h3>
        <div class="rating">${stars(p.rating)}<small>(${p.reviews})</small></div>
        <p class="prices">${p.old ? `<del>${fmt(p.old)}</del>` : ""}${fmt(p.price)}</p>
        <button class="add" data-add="${p.id}">أضف إلى السلة</button>
      </article>`).join("");
    $("#empty").hidden = list.length > 0;
  }

  /* ---------- السلة ---------- */
  const subtotal = () => cart.reduce((n, i) => n + byId(i.id).price * i.qty, 0);
  const shipping = (sub) => (sub === 0 || sub >= FREE_DELIVERY ? 0 : DELIVERY_FEE);

  function saveCart() { store.set("fishstore-cart", cart); renderCart(); }

  function addToCart(id) {
    const f = cart.find((i) => i.id === id);
    f ? f.qty++ : cart.push({ id, qty: 1 });
    saveCart();
    const c = $("#cartCount"); c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
    toast(`✓ تمت إضافة «${byId(id).name}» إلى السلة`);
  }

  function renderCart() {
    const count = cart.reduce((n, i) => n + i.qty, 0);
    const badge = $("#cartCount");
    badge.textContent = count; badge.classList.toggle("show", count > 0);

    $("#cartItems").innerHTML = !cart.length
      ? `<div class="cart-empty"><span>🐠</span><p>سلتك فارغة حالياً.</p><p>اكتشف أسماكنا وأضف ما يعجبك!</p></div>`
      : cart.map(({ id, qty }) => {
          const p = byId(id);
          return `<div class="ci">
            <div class="ci-img">${visual(p)}</div>
            <div>
              <div class="ci-name">${p.name}</div>
              <div class="ci-price">${fmt(p.price)}</div>
              <div class="qty"><button data-dec="${id}" aria-label="تقليل">−</button><span>${qty}</span><button data-inc="${id}" aria-label="زيادة">+</button></div>
            </div>
            <div><div class="ci-total">${fmt(p.price * qty)}</div><button class="ci-remove" data-remove="${id}">حذف</button></div>
          </div>`;
        }).join("");

    const sub = subtotal(), ship = shipping(sub), left = FREE_DELIVERY - sub;
    $("#subTotal").textContent = fmt(sub);
    $("#shipCost").textContent = sub === 0 ? "—" : ship === 0 ? "مجاني 🎉" : fmt(ship);
    $("#grandTotal").textContent = fmt(sub + ship);
    $("#shipText").innerHTML = sub === 0
      ? `التوصيل مجاني للطلبات فوق <b>${fmt(FREE_DELIVERY)}</b> 🚚`
      : left > 0 ? `أضف <b>${fmt(left)}</b> للحصول على توصيل مجاني 🚚` : `🎉 مبروك! توصيلك <b>مجاني</b>`;
    $("#shipBar").style.width = Math.min(100, (sub / FREE_DELIVERY) * 100) + "%";
    $("#checkoutBtn").disabled = !cart.length;
  }

  const openCart = () => { $("#drawer").classList.add("open"); $("#drawer").setAttribute("aria-hidden", "false"); $("#overlay").classList.add("show"); document.body.classList.add("lock"); };
  const closeCart = () => { $("#drawer").classList.remove("open"); $("#drawer").setAttribute("aria-hidden", "true"); $("#overlay").classList.remove("show"); if (!$("#orderModal").classList.contains("show")) document.body.classList.remove("lock"); };

  /* ---------- الأحداث ---------- */
  function setCat(c) {
    cat = c;
    $$(".chip").forEach((b) => b.classList.toggle("active", b.dataset.cat === c));
    renderProducts();
  }

  document.addEventListener("click", (e) => {
    const t = e.target;
    const add = t.closest("[data-add]"), inc = t.closest("[data-inc]"), dec = t.closest("[data-dec]"), rem = t.closest("[data-remove]");
    const catLink = t.closest("[data-cat]");
    if (add) return addToCart(+add.dataset.add);
    if (inc) { cart.find((i) => i.id === +inc.dataset.inc).qty++; return saveCart(); }
    if (dec) { const it = cart.find((i) => i.id === +dec.dataset.dec); it.qty > 1 ? it.qty-- : (cart = cart.filter((i) => i !== it)); return saveCart(); }
    if (rem) { cart = cart.filter((i) => i.id !== +rem.dataset.remove); return saveCart(); }
    if (catLink) { setCat(catLink.dataset.cat); closeNav(); }
  });

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); closeOrder(); closeNav(); } });
  $("#cartBtn").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  $("#continueBtn").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", closeCart);
  $("#sortSelect").addEventListener("change", (e) => { sort = e.target.value; renderProducts(); });
  $("#searchInput").addEventListener("input", (e) => { query = e.target.value.trim(); renderProducts(); });

  /* ---------- القائمة على الجوال ---------- */
  const menuBtn = $("#menuBtn"), nav = $("#nav");
  function closeNav() { nav.classList.remove("open"); menuBtn.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", String(open));
  });
  $$("#nav a").forEach((a) => a.addEventListener("click", closeNav));

  /* ---------- الطلب ---------- */
  const modal = $("#orderModal"), form = $("#orderForm");
  $("#oGov").innerHTML = `<option value="">اختر الولاية</option>` + GOVERNORATES.map((g) => `<option>${g}</option>`).join("");

  function openOrder() {
    if (!cart.length) return;
    const sub = subtotal(), ship = shipping(sub);
    $("#orderSummary").innerHTML = `
      <div class="row"><span>المنتجات (${cart.reduce((n, i) => n + i.qty, 0)})</span><span>${fmt(sub)}</span></div>
      <div class="row"><span>التوصيل</span><span>${ship === 0 ? "مجاني" : fmt(ship)}</span></div>
      <div class="row total"><span>المجموع عند الاستلام</span><span>${fmt(sub + ship)}</span></div>`;
    form.hidden = false; $("#orderSuccess").hidden = true;
    closeCart();
    modal.classList.add("show"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("lock");
  }
  function closeOrder() { modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("lock"); }

  $("#checkoutBtn").addEventListener("click", openOrder);
  $("#closeOrder").addEventListener("click", closeOrder);
  $("#doneBtn").addEventListener("click", closeOrder);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeOrder(); });

  const rules = {
    name: (v) => (v.trim().length < 3 ? "يرجى إدخال الاسم الكامل." : ""),
    phone: (v) => {
      const digits = v.replace(/\D/g, "").replace(/^216/, "");
      return /^[2-9]\d{7}$/.test(digits) ? "" : "أدخل رقم هاتف تونسي صحيح (8 أرقام).";
    },
    gov: (v) => (v ? "" : "يرجى اختيار الولاية."),
    addr: (v) => (v.trim().length < 8 ? "يرجى إدخال عنوان مفصّل." : "")
  };
  function check(el) {
    const msg = rules[el.name](el.value);
    const f = el.closest(".field"); f.classList.toggle("invalid", !!msg); $(".err", f).textContent = msg;
    return !msg;
  }
  $$("input, select, textarea", form).forEach((el) => el.addEventListener("blur", () => check(el)));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = $$("input, select, textarea", form).map(check).every(Boolean);
    if (!ok) return;

    const sub = subtotal(), ship = shipping(sub), total = sub + ship;
    const data = { name: form.name.value.trim(), phone: form.phone.value.trim(), gov: form.gov.value, addr: form.addr.value.trim() };
    const lines = cart.map((i) => `• ${byId(i.id).name} × ${i.qty} = ${fmt(byId(i.id).price * i.qty)}`).join("\n");
    const message = `طلب جديد 🐟\n${lines}\n\nالتوصيل: ${ship === 0 ? "مجاني" : fmt(ship)}\nالمجموع: ${fmt(total)}\n\nالاسم: ${data.name}\nالهاتف: ${data.phone}\nالولاية: ${data.gov}\nالعنوان: ${data.addr}`;

    /* TODO: أرسل الطلب إلى خادمك أو إلى Google Sheets / Formspree حتى تحتفظ به.
       مثال: fetch("/api/orders", { method: "POST", body: JSON.stringify({ data, cart }) }) */
    if (WHATSAPP) window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener");

    $("#successText").textContent = WHATSAPP
      ? "شكراً لك! سنتواصل معك لتأكيد الطلب قريباً."
      : "شكراً لك! (نسخة تجريبية — اربط المتجر بخادم أو واتساب لاستقبال الطلبات الحقيقية.)";
    form.hidden = true; $("#orderSuccess").hidden = false;
    cart = []; saveCart(); form.reset();
  });

  /* ---------- البداية ---------- */
  $("#year").textContent = new Date().getFullYear();
  renderProducts();
  renderCart();
})();