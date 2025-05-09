import emailjs from 'emailjs-com';

function youGotMail(name, message, eTmail, link) {
    const eFmail = 'spreadtheh@gmail.com'
    
        const templateParams = {
            from_name: name,
            from_email: eFmail,
            message: message,
            to_email: eTmail,
            link: link
        };

        emailjs.send('service_wikih', 'template_87a4uj', templateParams, 'sooapWbX8EfIHQ0FK')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
                console.log('FAILED...', err);
            });
    };

export { youGotMail };
