/**
 * ملوك الزفاف لتأجير السيارات - FastPage-Melok
 * إدارة: حسام حسن | هاتف وواتساب: +20 11 54345092
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year in Footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 2. Navbar Scroll Glass Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.style.background = 'rgba(8, 9, 12, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
        } else {
            navbar.style.background = 'rgba(8, 9, 12, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    }, { passive: true });

    // 3. Quick Booking Form submission to WhatsApp
    const bookingForm = document.getElementById('quickBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const carChoice = document.getElementById('carChoice').value.trim();
            const weddingDate = document.getElementById('weddingDate').value.trim();
            const location = document.getElementById('location').value.trim();
            const notes = document.getElementById('notes').value.trim();

            const message = 
`👑 *طلب حجز سيارة زفاف - ملوك الزفاف* 👑
--------------------------------
👤 *إلى:* الإدارة (أ. حسام حسن)
🚗 *السيارة المطلوبة:* ${carChoice}
📅 *تاريخ الزفاف:* ${weddingDate || 'غير محدد'}
📍 *المكان / المحافظة:* ${location || 'غير محدد'}
${notes ? `📝 *ملاحظات خاصة:* ${notes}` : ''}
--------------------------------
أرجو تأكيد إمكانية الحجز والأسعار والتفاصيل. شكراً لكم!`;

            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/201154345092?text=${encodedMessage}`;

            window.open(waUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // 4. Copy Phone Number Feature with Toast Notification
    const copyBox = document.getElementById('copyPhoneBox');
    const copyBtn = document.getElementById('copyBtn');
    const copyText = document.getElementById('copyText');
    const toast = document.getElementById('toastNotification');
    const phoneNumber = '+201154345092';

    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return Promise.resolve();
            } catch (err) {
                document.body.removeChild(textArea);
                return Promise.reject(err);
            }
        }
    }

    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            copyToClipboard(phoneNumber).then(() => {
                copyText.textContent = 'تم النسخ!';
                showToast(`تم نسخ رقم أ. حسام حسن: ${phoneNumber}`);
                setTimeout(() => {
                    copyText.textContent = 'نسخ';
                }, 2500);
            }).catch(() => {
                showToast(`الرقم المباشر: ${phoneNumber}`);
            });
        });
    }

    if (copyBox) {
        copyBox.addEventListener('click', () => {
            copyToClipboard(phoneNumber).then(() => {
                if (copyText) copyText.textContent = 'تم النسخ!';
                showToast(`تم نسخ رقم أ. حسام حسن: ${phoneNumber}`);
                setTimeout(() => {
                    if (copyText) copyText.textContent = 'نسخ';
                }, 2500);
            }).catch(() => {
                showToast(`الرقم المباشر: ${phoneNumber}`);
            });
        });
    }

    // 5. Hide floating WhatsApp bubble after 7 seconds so it doesn't distract
    const waBubble = document.getElementById('waBubble');
    if (waBubble) {
        setTimeout(() => {
            waBubble.style.transition = 'opacity 0.6s ease';
            waBubble.style.opacity = '0.85';
        }, 7000);
    }
});
