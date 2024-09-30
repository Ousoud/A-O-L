var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).on('load', function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage(); // Assuming fakeMessage is defined elsewhere
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate() {
  d = new Date();
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  var msg = $('.message-input').val().trim(); // Trim whitespace
  if (msg === '') {
    return false; // Don't proceed if the message is empty
  }
  
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null); // Clear the input field
  updateScrollbar();
  
  setTimeout(function() {
    checkMessage(msg);
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').on('click', function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which === 13) { // Check if Enter key is pressed
    insertMessage();
    return false; // Prevent default action (like form submission)
  }
});

// Define available questions and responses
var questions = [
  'ما هي الأنشطة الرياضية التي تقدمها جمعية أسود العرائش؟',
  'ما هي فوائد حصص الأيروبيك؟',
  'هل يمكنني الاشتراك في حصص إعداد بدني فردية؟',
  'كم عدد الحصص الأسبوعية لرياضة التايكواندو؟',
  'ما هي أسعار الاشتراك في حصص اللياقة البدنية؟',
  'هل يمكنني المشاركة في البطولات عند الاشتراك في التايكواندو؟',
  'أين يقع النادي؟',
  'ما هي الأسعار الخاصة بحصص الأيروبيك؟',
  'هل هناك متابعة من المدرب في حصص اللياقة البدنية؟',
  'ما هو رقم الاتصال بالنادي؟'
];

var answers = [
  'تقدم الجمعية التايكواندو، الأيروبيك، واللياقة البدنية الجماعية والفردية.',
  'تحسن حصص الأيروبيك اللياقة القلبية والتنفسية، وتساعد على حرق الدهون وتعزيز الطاقة.',
  'نعم، نوفر حصص إعداد بدني فردية مصممة لتناسب احتياجاتك الخاصة.',
  'نوفر ثلاث حصص أسبوعياً لرياضة التايكواندو.',
  'سعر الاشتراك في حصص اللياقة البدنية هو 150 درهم مع ثلاث حصص في الأسبوع.',
  'نعم، نوفر فرص المشاركة في البطولات للمشتركين في رياضة التايكواندو.',
  'النادي يقع في المغرب، العرائش، جنان الباشا الشرقي رقم: 711.',
  'سعر حصص الأيروبيك هو 150 درهم للإناث مع ثلاث حصص في الأسبوع.',
  'نعم، يتم متابعة كل شخص من قبل المدرب وفقاً لأهدافه الخاصة.',
  'يمكنك الاتصال بالنادي على الرقم +212 695 953 628.'
];

// Function to check the message and respond accordingly
// Refined function to check the message and respond
function checkMessage(msg) {
  console.log("Checking message:", msg); // Log the message
  const matchedIndex = fuzzyMatch(msg); // Use the improved fuzzy match
  
  if (matchedIndex !== -1) {
    console.log("Matched Index:", matchedIndex); // Log the matched index
    respondWithAnswer(matchedIndex); // Respond with the matching answer
  } else {
    console.log("No match found, responding with available questions.");
    
    // Provide a hint to the user about asking a specific type of question
    if (msg.includes('رياضة') || msg.includes('نادي')) {
      respondWithAvailableSports();
    } else {
      respondWithAvailableQuestions(); // Default fallback
    }
  }
}


// Function for improved fuzzy matching
function fuzzyMatch(input) {
  input = input.toLowerCase().trim(); // Normalize and trim input

  // Loop through the questions to find the best match
  for (let j = 0; j < questions.length; j++) {
    const question = questions[j].toLowerCase(); // Normalize question to lowercase

    // Compute a similarity ratio between the input and the question
    let similarity = calculateSimilarity(input, question);
    
    // If similarity is above a threshold (e.g., 0.5), consider it a match
    if (similarity > 0.5) { 
      return j; // Return the index of the matched question
    }
  }

  return -1; // No match found
}

// Function to calculate similarity between two strings
function calculateSimilarity(str1, str2) {
  const words1 = str1.split(' ');
  const words2 = str2.split(' ');

  let matchCount = 0;
  words1.forEach(word => {
    if (words2.some(qWord => qWord.startsWith(word))) {
      matchCount++;
    }
  });

  return matchCount / Math.max(words1.length, words2.length); // Ratio of matches
}






function respondWithAvailableQuestions() {
  // Map through the questions and join them with <br> and a dash (-) for each question
  const availableQuestions = questions.map((question) => `• ${question}`).join('<br>');

  $('<div class="message loading new"><figure class="avatar"><img src="yk.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    // Organize the message with a colon after the introduction and a bullet list for the questions
    $('<div class="message new"><figure class="avatar"><img src="yk.jpg" /></figure>عذرًا، لم أفهم. يمكنك طرح أحد الأسئلة التالية:<br><br>' + availableQuestions + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 1000 + (Math.random() * 20) * 100);
}
function respondWithAnswer(index) {
  // Add a log to verify the matched index and corresponding answer
  console.log("Responding with answer for question index:", index);
  
  const answer = answers[index]; // Get the matched answer
  $('<div class="message loading new"><figure class="avatar"><img src="yk.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="yk.jpg" /></figure>' + answer + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 1000 + (Math.random() * 20) * 100);
}
