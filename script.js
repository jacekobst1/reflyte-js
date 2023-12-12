document.addEventListener('DOMContentLoaded', function () {
    console.log('REFLYTE: Script loaded');
    const forms = document.querySelectorAll('form');

    forms.forEach(function (form) {
        console.log('REFLYTE: Form found', form);
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('REFLYTE: Form submitted');

            // TODO
            //  1. trzeba wziąć pod uwagę sytuację, w której pole email nie jest typu email, a text
            // sprawdzimy wtedy name, aria-label, placeholder i class
            // można też po prostu sprawdzić każde po kolei, czy wartość pola zawiera w sobie znak @
            // 2. trzeba sprawdzić jak zachowuje się skrypt, gdy formularz nie jest zwykłym formem POST, ale jest obsługiwany przez JS (np. axios.POST)
            // 3. trzeba sprawdzić, czy skrypt działa na danych, które nie zostają poprawnie zwalidowane w formularzu - wtedy nie możemy słać danych do Reflyte
            // https://klosinski.net/
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput) {
                const email = emailInput.value;

                sendEmailToApp(email);
            } else {
                console.error('REFLYTE: No email input found in the form');
            }
        });
    });

    function sendEmailToApp(email) {
        const url = 'https://eoesnoxm4v1ivdg.m.pipedream.net';
        const newsletterId = getNewsletterId();

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, newsletterId: newsletterId}),
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('REFLYTE: Response status: ' + response.status + '. Response status text: ' + response.statusText);
                }
                return response.json();
            })
            .then(function (data) {
                console.log('REFLYTE: Request sent successfully', data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function getNewsletterId() {
        const scriptTag = document.getElementById('reflyte-script');

        return scriptTag.getAttribute('data-newsletter-id');
    }
});