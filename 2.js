document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const nickname = document.getElementById('nickname').value;
    const birthday = document.getElementById('birthday').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const sport = document.getElementById('sport').value;

    // Calculate age
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Format the birthdate in DD/MM/YYYY
    const formattedBirthday = birthDate.getDate() + '/' + (birthDate.getMonth() + 1) + '/' + birthDate.getFullYear();

    // WhatsApp message content with greeting, birthday, and age in parentheses
    const message = `السلام عليكم،\nأرغب في التسجيل في رياضة ${sport} وهذه معلوماتي:\n\nالاسم: ${name}\nالنسب: ${nickname}\nتاريخ الميلاد: ${formattedBirthday} (${age} سنة)\nالجنس: ${gender}\nالرياضة المطلوبة: ${sport}`;

    // WhatsApp API URL
    const whatsappUrl = `https://wa.me/212695953628?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp using a hidden link trick for better compatibility
    const a = document.createElement('a');
    a.href = whatsappUrl;
    a.target = '_blank';
    a.click();
});
window.onload = function() {
    var audio = document.getElementById('background-audio');
    audio.play().catch(function(error) {
        console.log("Error playing audio:", error);
    });
};
