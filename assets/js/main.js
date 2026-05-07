/* ===== ملف JavaScript الرئيسي ===== */
/* بناءً على منهاج ويب 1 - الجامعة الافتراضية السورية */

// ===== فلترة الفعاليات في صفحة events.html =====
// تستخدم دوال JavaScript لتصفية البطاقات

function filterEvents() {
    // الحصول على قيم عناصر الفلترة
    var searchVal = "";
    var categoryVal = "";
    var dateVal = "";

    // التحقق من وجود عناصر الفلترة قبل قراءتها
    if (document.getElementById("searchInput")) {
        searchVal = document.getElementById("searchInput").value.toLowerCase();
    }
    if (document.getElementById("categoryFilter")) {
        categoryVal = document.getElementById("categoryFilter").value;
    }
    if (document.getElementById("dateFilter")) {
        dateVal = document.getElementById("dateFilter").value;
    }

    // الحصول على كل بطاقات الفعاليات
    var cards = document.getElementsByClassName("event-card-wrapper");

    // تطبيق الفلترة على كل بطاقة
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var title = "";
        var category = card.getAttribute("data-category") || "";
        var date = card.getAttribute("data-date") || "";

        // الحصول على عنوان البطاقة
        var titleEl = card.getElementsByClassName("card-title")[0];
        if (titleEl) {
            title = titleEl.textContent.toLowerCase();
        }

        // التحقق من تطابق كل شرط
        var matchSearch = (searchVal === "" || title.indexOf(searchVal) !== -1);
        var matchCategory = (categoryVal === "" || category === categoryVal);
        var matchDate = (dateVal === "" || date === dateVal);

        // إظهار أو إخفاء البطاقة
        if (matchSearch && matchCategory && matchDate) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }
}

// ===== إعادة تعيين الفلتر =====
function resetFilter() {
    if (document.getElementById("searchInput")) {
        document.getElementById("searchInput").value = "";
    }
    if (document.getElementById("categoryFilter")) {
        document.getElementById("categoryFilter").value = "";
    }
    if (document.getElementById("dateFilter")) {
        document.getElementById("dateFilter").value = "";
    }
    filterEvents();
}

// ===== التحقق من نموذج اتصل بنا =====
// يستخدم التعابير المنتظمة Pattern Matching من المنهاج

function submitContactForm() {
    // الحصول على قيم الحقول
    var name = document.getElementById("userName").value;
    var email = document.getElementById("userEmail").value;
    var message = document.getElementById("userMessage").value;

    // إخفاء الرسائل السابقة
    var successAlert = document.getElementById("successAlert");
    var errorAlert = document.getElementById("errorAlert");
    successAlert.style.display = "none";
    errorAlert.style.display = "none";

    // التحقق من الاسم - يجب أن يكون 3 أحرف على الأقل
    // استخدام trim() لإزالة المسافات الزائدة
    name = name.replace(/^\s+|\s+$/g, ""); // إزالة المسافات من البداية والنهاية

    if (name.length < 3) {
        errorAlert.textContent = "يرجى إدخال اسم صحيح (3 أحرف على الأقل)";
        errorAlert.style.display = "block";
        return;
    }

    // التحقق من البريد الإلكتروني باستخدام التعابير المنتظمة
    // نموذج البريد الإلكتروني من المنهاج
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.search(emailPattern) === -1) {
        errorAlert.textContent = "يرجى إدخال بريد إلكتروني صحيح (مثال: name@domain.com)";
        errorAlert.style.display = "block";
        return;
    }

    // التحقق من الرسالة - يجب أن تكون 10 أحرف على الأقل
    message = message.replace(/^\s+|\s+$/g, "");
    if (message.length < 10) {
        errorAlert.textContent = "يرجى كتابة رسالة لا تقل عن 10 أحرف";
        errorAlert.style.display = "block";
        return;
    }

    // إذا نجح التحقق، أظهر رسالة النجاح
    successAlert.textContent = "شكراً " + name + "! تم إرسال رسالتك بنجاح. سنتواصل معك على " + email + " قريباً ✅";
    successAlert.style.display = "block";

    // مسح حقول النموذج
    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("userMessage").value = "";
}

// ===== تفعيل الفلترة عند الكتابة في حقل البحث =====
// يضاف هذا الحدث بعد تحميل الصفحة

window.onload = function() {
    // إضافة حدث البحث الفوري
    var searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.onkeyup = function() {
            filterEvents();
        };
    }

    // تحديث النشط في شريط التنقل
    var currentPage = window.location.pathname.split("/").pop();
    var navLinks = document.getElementsByClassName("nav-link");
    for (var i = 0; i < navLinks.length; i++) {
        var href = navLinks[i].getAttribute("href");
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            navLinks[i].className += " active";
        }
    }
};

// ===== وظيفة مشاركة الفعالية =====
function shareEvent(title) {
    // استخدام alert من الغرض window كما في المنهاج
    var shareMsg = "تمت مشاركة فعالية: " + title + "\nالرابط: " + window.location.href;
    alert(shareMsg);
}

// ===== وظيفة تأكيد الحجز =====
function confirmBooking(eventName) {
    // استخدام confirm من الغرض window كما في المنهاج
    var result = confirm("هل تريد حجز مكان في فعالية: " + eventName + "؟");
    if (result === true) {
        alert("تم تسجيل حجزك بنجاح في فعالية: " + eventName + "\nسيتم التواصل معك قريباً.");
    }
}

// ===== وظيفة Scroll to Top =====
// إضافة زر للعودة لأعلى الصفحة
function scrollToTop() {
    window.scrollTo(0, 0);
}

// إظهار/إخفاء زر العودة للأعلى
window.onscroll = function() {
    var scrollBtn = document.getElementById("scrollTopBtn");
    if (scrollBtn) {
        if (document.documentElement.scrollTop > 300) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    }
};


const themeToggler = document.getElementById('themeToggler');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement; // للوصول لوسم <html>

// 1. التحقق من التفضيل المحفوظ سابقاً
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-bs-theme', savedTheme);
updateIcon(savedTheme);

// 2. عند الضغط على الزر
themeToggler.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // تطبيق السمة الجديدة
    htmlElement.setAttribute('data-bs-theme', newTheme);
    // حفظ السمة في المتصفح
    localStorage.setItem('theme', newTheme);
    // تحديث الأيقونة
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    } else {
        themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    }
}
