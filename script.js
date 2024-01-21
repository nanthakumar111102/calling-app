let callInterval;

async function startCalling(event) {
    event.preventDefault();

    // Request permission for accessing the phonebook
    try {
        const permission = await navigator.permissions.query({ name: 'contacts' });
        if (permission.state === 'denied') {
            alert('Permission to access the phonebook is denied. Please grant permission in your browser settings.');
            return;
        }
    } catch (error) {
        console.error('Error checking permission:', error);
        return;
    }

    const phoneNumberInput = document.getElementById('phoneNumber');
    const callTimeInput = document.getElementById('callTime');

    const phoneNumber = phoneNumberInput.value;
    const callTime = callTimeInput.value;

    if (!phoneNumber || !callTime) {
        alert('Please enter a valid phone number and call time.');
        return;
    }

    // Perform the calling operation (simulated with alerts)
    alert(`Calling ${phoneNumber} at ${callTime}...`);

    // Simulate continuous calling
    // Note: This still uses the time input for the interval, which may not be accurate for real-world scenarios.
    callInterval = setInterval(() => {
        alert('Simulating a call...');
    }, getTimeDifferenceInSeconds(callTime));
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
