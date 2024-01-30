document.addEventListener('DOMContentLoaded', function () {
    console.log('REFLYTE: Script loaded');
    const forms = document.querySelectorAll('form');

    forms.forEach(function (form) {
        console.log('REFLYTE: Form found', form);
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('REFLYTE: Form submitted');

            const inputs = form.querySelectorAll('input');
            let emailAddress = '';
            inputs.forEach(function (input) {
                if (input.value.includes('@')) {
                    emailAddress = input.value;
                    return true;
                }
            });

            if (emailAddress) {
                sendEmailToApp(emailAddress);
            } else {
                console.error('REFLYTE: No email input found in the form');
            }
        });
    });

    function sendEmailToApp(email) {
        const url = 'https://api.reflyte.com/api/subscribers/from-landing';
        const refCode = getRefCode();

        if (!refCode) {
            return;
        }

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, ref_code: refCode}),
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

    function getRefCode()
    {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        return urlParams.get('reflyteCode');
    }
});