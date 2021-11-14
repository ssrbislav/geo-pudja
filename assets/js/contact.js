$(document).ready(function () {
  (function ($) {
    'use strict';

    jQuery.validator.addMethod(
      'answercheck',
      function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
      },
      'Unesite neki odgovor.'
    );

    // validate contactForm form
    $(function () {
      $('#contactForm').validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
          },
          subject: {
            required: true,
            minlength: 4,
          },
          number: {
            required: true,
            minlength: 5,
          },
          email: {
            required: true,
            email: true,
          },
          message: {
            required: true,
            minlength: 20,
          },
        },
        messages: {
          name: {
            required: 'Ime je obavezno',
            minlength: 'Ime mora da zadrži bar dva karaktera',
          },
          subject: {
            required: 'Naslov poruke je obavezan.',
            minlength: 'Naslov mora da sadrži bar 4 karaktera.',
          },
          number: {
            required: 'Broj telefona je obavezan.',
            minlength: 'Broj telefona mora da sadrži minimum 9 karaktera.',
          },
          email: {
            required: 'Email adresa je obavezna.',
            email: 'Unesite validnu email adresu (ex: example@email.com).',
          },
          message: {
            required: 'Molimo Vas da unesete neku poruku.',
            minlength: 'Unesite bar dvadeset karaketera.',
          },
        },
        submitHandler: function (form) {
          $(form).ajaxSubmit({
            type: 'POST',
            data: $(form).serialize(),
            url: 'contact_process.php',
            success: function () {
              $('#contactForm :input').attr('disabled', 'disabled');
              $('#contactForm').fadeTo('slow', 1, function () {
                $(this).find(':input').attr('disabled', 'disabled');
                $(this).find('label').css('cursor', 'default');
                $('#success').fadeIn();
                $('.modal').modal('hide');
                $('#success').modal('show');
              });
            },
            error: function () {
              $('#contactForm').fadeTo('slow', 1, function () {
                $('#error').fadeIn();
                $('.modal').modal('hide');
                $('#error').modal('show');
              });
            },
          });
        },
      });
    });
  })(jQuery);
});
