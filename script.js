let callInterval;

async function startCalling(event) {
    event.preventDefault();

    const phoneNumberInput = document.getElementById('phoneNumber');
    const callTimeInput = document.getElementById('callTime');

    const phoneNumber = phoneNumberInput.value;
    const callTime = callTimeInput.value;

    if (!phoneNumber || !callTime) {
        alert('Please enter a valid phone number and call time.');
        return;
    }

    // Perform the calling operation using Twilio (replace with your credentials)
    const response = await makeTwilioCall(phoneNumber);

    if (response.success) {
        alert(`Calling ${phoneNumber} at ${callTime}...`);
        // Simulate continuous calling
        callInterval = setInterval(() => {
            alert('Simulating a call...');
        }, getTimeDifferenceInSeconds(callTime));
    } else {
        alert('Error initiating call. Please check your Twilio configuration.');
    }
}

function stopCalling() {
    clearInterval(callInterval);
    alert('Calling stopped.');
}

function getTimeDifferenceInSeconds(targetTime) {
    const now = new Date();
    const target = new Date(now.toDateString() + ' ' + targetTime);
    if (target <= now) {
        target.setDate(target.getDate() + 1); // If the target time has passed for today, set it for tomorrow.
    }
    const timeDifferenceInSeconds = (target - now) / 1000; // Convert milliseconds to seconds
    return timeDifferenceInSeconds;
}

async function makeTwilioCall(phoneNumber) {
    const twilioAccountSid = 'YOUR_TWILIO_ACCOUNT_SID';
    const twilioAuthToken = 'YOUR_TWILIO_AUTH_TOKEN';
    const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';

    try {
        const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Calls.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${twilioAccountSid}:${twilioAuthToken}`),
            },
            body: new URLSearchParams({
                To: phoneNumber,
                From: twilioPhoneNumber,
                Url: 'http://demo.twilio.com/docs/voice.xml', // Replace with your TwiML URL
            }),
        });

        if (response.ok) {
            return { success: true };
        } else {
            console.error('Twilio API error:', response.statusText);
            return { success: false };
        }
    } catch (error) {
        console.error('Twilio API error:', error);
        return { success: false };
    }
}
