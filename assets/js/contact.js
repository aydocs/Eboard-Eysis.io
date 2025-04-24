import { createApp } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            fullName: '',
            email: '',
            subject: '',
            message: ''
        };
    },
    methods: {
        submitForm() {
            if (this.fullName && this.email && this.subject && this.message) {
                console.log("Form Gönderildi!", {
                    fullName: this.fullName,
                    email: this.email,
                    subject: this.subject,
                    message: this.message
                });

                this.fullName = '';
                this.email = '';
                this.subject = '';
                this.message = '';
            } else {
                alert("Lütfen tüm alanları doldurun.");
            }
        }
    },
    template: `
        <form class="form" @submit.prevent="submitForm">
            <p class="title">İletişim Formu</p>
            <label>
                <input v-model="fullName" required="" placeholder="" type="text" class="input">
                <span class="span2">İsminiz ve Soyisminiz</span>
            </label>
            <label>
                <input v-model="email" required="" placeholder="" type="text" class="input">
                <span class="span2">E-Posta Adresiniz</span>
            </label>
            <label>
                <input v-model="subject" required="" placeholder="" type="text" class="input">
                <span class="span2">Konu</span>
            </label>
            <label>
                <input v-model="message" required="" placeholder="" style="height:75px;" type="text" class="input">
                <span class="span2">Mesajınızı buraya yazınız</span>
            </label>
            <button class="submit" type="submit">Mesajı Gönder</button>
        </form>
    `
});

app.mount('#app');
