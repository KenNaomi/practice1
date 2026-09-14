// ---------- تغییر ظاهر هدر هنگام اسکرول ----------
const header = document.getElementById('siteHeader');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});


// ---------- باز و بسته کردن منوی موبایل ----------
const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');

burgerBtn.addEventListener('click', () => {
  mobileNav.classList.add('open');
});

mobileClose.addEventListener('click', () => {
  mobileNav.classList.remove('open');
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });
});


// ---------- فیلتر کردن منو با تب‌ها ----------
const tabBtns = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    menuItems.forEach((item) => {
      item.classList.toggle('show', item.dataset.cat === cat);
    });
  });
});

const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
const reserveForm = document.getElementById('reserveForm');
const formMsg = document.getElementById('formMsg');
reserveForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('nameInput').value.trim();
  const phone = document.getElementById('phoneInput').value.trim();
  const date = document.getElementById('dateInput').value;
  const guests = document.getElementById('guestsInput').value;
  if (!name || !phone || !date || !guests) {
    formMsg.textContent = 'لطفاً همه‌ی فیلدها را پر کنید.';
    formMsg.classList.add('error');
    return;
  }
  const phoneOk = /^[\d۰-۹\s+\-]{7,15}$/.test(phone);
  if (!phoneOk) {
    formMsg.textContent = 'شماره تماس را درست وارد کنید.';
    formMsg.classList.add('error');
    return;
  }
  formMsg.classList.remove('error');
  formMsg.textContent = '';
  showToast(`ممنون ${name} عزیز، رزروتان ثبت شد ☕`);
  reserveForm.reset();
});
document.getElementById('footBottom').textContent =
  `© ${new Date().getFullYear()} کافه دارچین. تمام حقوق محفوظ است.`;