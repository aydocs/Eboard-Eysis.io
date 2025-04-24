import { createApp } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            yayinevi: '',
            fullName: '',
            email: '',
            phonenumber: '',
            subject: '',
            message: '',
            loading: false,
            error: '',
            success: '',
            messageVisible: false,
            timer: 3,
            progressWidth: 0
        };
    },
    methods: {
        async submitForm() {
            if (this.yayinevi && this.fullName && this.email && this.phonenumber && this.subject && this.message) {
                try {
                    this.loading = true;
                    const postData = {
                        yayinevi: this.yayinevi,
                        fullName: this.fullName,
                        email: this.email,
                        phonenumber: this.phonenumber,
                        subject: this.subject,
                        message: this.message
                    };

                    const emailData = {
                        mailAdresleri: 'saglam.mehmet@gmail.com',
                        mesaj: `${postData.fullName} adlı kişiden mesaj var: ${postData.message}`
                    };

                    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://digipo.web.tr/api/mail/?tema=mail`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ...postData,
                            ...emailData,
                            fromMail: 'mail@bgs.io',
                            fromName: 'EysisBoard'
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Gönderim başarısız oldu.');
                    }

                    console.log("Form Gönderildi!", postData);

                    // Formu temizle
                    this.clearForm();
                    this.success = 'Form başarıyla gönderildi!';
                    this.error = '';
                } catch (error) {
                    console.error('Gönderim hatası:', error);
                    this.error = 'Form gönderiminde bir hata oluştu.';
                    this.success = '';
                } finally {
                    this.loading = false;
                    this.messageVisible = true; // Mesajı görünür yap
                    this.startTimer(); // Zamanlayıcıyı başlat
                }
            } else {
                alert("Lütfen tüm alanları doldurun.");
            }
        },
        clearForm() {
            this.yayinevi = '';
            this.fullName = '';
            this.email = '';
            this.phonenumber = '';
            this.subject = '';
            this.message = '';
        },
        startTimer() {
            this.timer = 3;
            this.progressWidth = 100;

            const countdown = setInterval(() => {
                this.timer--;
                this.progressWidth -= 33.33; // Her saniyede 33.33 azalt

                if (this.timer <= 0) {
                    clearInterval(countdown);
                    this.messageVisible = false; // Mesajı gizle
                }
            }, 1000);
        }
    },
    template: `
        <form class="form" @submit.prevent="submitForm">
            <p class="title">İletişim Formu</p>
            <label>
                <input v-model="yayinevi" required placeholder="" type="text" class="input">
                <span class="span2">Yayınevi İsmi</span>
            </label>
            <label>
                <input v-model="fullName" required placeholder="" type="text" class="input">
                <span class="span2">Temsilcinin Adı Soyadı</span>
            </label>
            <label>
                <input v-model="email" required placeholder="" type="email" class="input">
                <span class="span2">E-Posta Adresiniz</span>
            </label>
            <label>
                <input v-model="phonenumber" required placeholder="" type="tel" class="input">
                <span class="span2">Telefon Numaranız</span>
            </label>
            <label>
                <input v-model="subject" required placeholder="" type="text" class="input">
                <span class="span2">Konu</span>
            </label>
            <label>
                <textarea v-model="message" required placeholder="" class="input"></textarea>
                <span class="span2">Mesajınız</span>
            </label>
            <button class="submit" type="submit" :disabled="loading">
                <span v-if="loading">Gönderiliyor...</span>
                <span v-else>Mesajı Gönder</span>
            </button>
        </form>
        <transition name="fade">
            <div v-if="messageVisible" class="message" :class="{'success': success, 'error': error}">
                {{ success || error }}
                <div class="progress" :style="{ width: progressWidth + '%' }"></div> <!-- Çizgi -->
            </div>
        </transition>
    `
});

app.mount('#app');
