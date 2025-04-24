new Vue({
  el: '#app2',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('YOUR_API_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });

        if (response.ok) {
          alert('Form başarıyla gönderildi!');
          this.resetForm();
        } else {
          alert('Form gönderiminde bir hata oluştu.');
        }
      } catch (error) {
        console.error('Hata:', error);
        alert('Bir hata oluştu, lütfen tekrar deneyin.');
      }
    },
    resetForm() {
      this.formData.name = '';
      this.formData.email = '';
      this.formData.phone = '';
    }
  }
});
