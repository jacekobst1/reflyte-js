document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');

    forms.forEach(function (form) {
        console.log('REFLYTE: Form found', form);
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('REFLYTE: Form submitted');

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