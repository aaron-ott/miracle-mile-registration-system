document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get form field values
    var fullName = document.getElementById('full-name').value;
    var phoneNumber = document.getElementById('phone-number').value;
    var email = document.getElementById('email').value;
    
    // Reset error message
    document.getElementById('error-message').innerHTML = '';

    // Validate phone number format
    var phoneRegex = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
        document.getElementById('error-message').innerHTML = 'Please enter a valid phone number.';
        return;
    }

    // Validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('error-message').innerHTML = 'Please enter a valid email address.';
        return;
    }

    const data = {
        name: fullName,
        phone_number: phoneNumber,
        email: email
    };
    
    postData(data);
    
});



const postData = async (data) => {
    try {
        const response = await fetch('/person', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    
        if (response.ok) {
          // POST request successful, redirect to /success
          window.location.href = '/registration-success';
        } else {
          // POST request failed
          document.getElementById('error-message').innerHTML = 'Could not register successfully. Most likely a software issue.';
          console.log("Post request failed");
        return;
        }
      } catch (error) {
        document.getElementById('error-message').innerHTML = 'Could not register successfully. Most likely a software issue.';
        console.log(error);
        return;
      }
  };



var phoneNumberInput = document.getElementById('phone-number');

phoneNumberInput.addEventListener('input', function(event) {
    var phoneNumber = event.target.value.replace(/\D/g, '');
    
    if (phoneNumber.length > 10) {
        phoneNumber = phoneNumber.substring(0, 10);
    }
    
    var formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    event.target.value = formattedPhoneNumber;
});

function formatPhoneNumber(phoneNumber) {
    var formattedNumber = '';
    
    if (phoneNumber.length <= 3) {
        formattedNumber += phoneNumber;
    }
    
    if (phoneNumber.length > 3) {
        formattedNumber += '(' + phoneNumber.substring(0, 3) + ')';
        formattedNumber += ' ' + phoneNumber.substring(3, 6);
    }
    
    if (phoneNumber.length > 6) {
        formattedNumber += '-' + phoneNumber.substring(6, 10);
    }
    
    return formattedNumber;
}