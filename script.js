/**
 * ملوك الزفاف لتأجير السيارات - Ultra Chic Royal Facade
 * إدارة: حسام حسن | هاتف وواتساب: +20 11 54345092
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year in Footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 2. Navbar Scroll Dynamic Glass
    const nav = document.getElementById('headerNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            nav.style.background = 'rgba(6, 7, 9, 0.96)';
            nav.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.7)';
        } else {
            nav.style.background = 'rgba(6, 7, 9, 0.85)';
            nav.style.boxShadow = 'none';
        }
    }, { passive: true });

    // 3. Royal Instant Booking to WhatsApp (No car types)
    const royalForm = document.getElementById('royalBookingForm');
    if (royalForm) {
        royalForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const clientName = document.getElementById('clientName').value.trim();
            const weddingDate = document.getElementById('weddingDate').value.trim();
            const locationCity = document.getElementById('locationCity').value.trim();

            const message = 
`👑 *طلب حجز واستفسار - ملوك الزفاف* 👑
--------------------------------
👤 *إلى:* الإدارة العامة (أ. حسام حسن)
🤵 *الاسم:* ${clientName || 'عميل محترم'}
📅 *تاريخ ليلة العمر:* ${weddingDate || 'غير محدد'}
📍 *المكان / المحافظة:* ${locationCity || 'غير محدد'}
--------------------------------
أود الاستفسار عن الأسعار وتأكيد إمكانية الحجز. شكراً جزيلاً!`;

            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/201154345092?text=${encodedMessage}`;

            window.open(waUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // 4. One-click Copy Phone Number with Toast
    const phoneBox = document.getElementById('phoneBox');
    const copyActionBtn = document.getElementById('copyActionBtn');
    const copyFeedback = document.getElementById('copyFeedback');
    const toast = document.getElementById('toastNotification');
    const directPhone = '+201154345092';

    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(ta);
                return Promise.resolve();
            } catch (err) {
                document.body.removeChild(ta);
                return Promise.reject(err);
            }
        }
    }

    function showToastNotification(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    function handleCopy() {
        copyToClipboard(directPhone).then(() => {
            if (copyFeedback) copyFeedback.textContent = 'تم النسخ!';
            showToastNotification(`تم نسخ رقم أ. حسام حسن: ${directPhone}`);
            setTimeout(() => {
                if (copyFeedback) copyFeedback.textContent = 'نسخ الرقم';
            }, 2500);
        }).catch(() => {
            showToastNotification(`الرقم: ${directPhone}`);
        });
    }

    if (copyActionBtn) {
        copyActionBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleCopy();
        });
    }

    if (phoneBox) {
        phoneBox.addEventListener('click', handleCopy);
    }

    // 5. Floating WhatsApp Tooltip Fade
    const waTooltip = document.getElementById('waTooltip');
    if (waTooltip) {
        setTimeout(() => {
            waTooltip.style.transition = 'opacity 0.6s ease';
            waTooltip.style.opacity = '0.8';
        }, 6000);
    }
});
