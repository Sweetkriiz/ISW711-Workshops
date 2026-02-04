const API_URL = 'http://localhost:3001/course';

// CREATE COURSE
const form = document.getElementById('courseForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const credits = document.getElementById('credits').value;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, credits })
    });

    const data = await response.json();
    document.getElementById('result').innerText =
      `Course created with ID: ${data._id}`;
  });
}

// LIST COURSES
const list = document.getElementById('courseList');
if (list) {
  fetch(API_URL)
    .then(res => res.json())
    .then(courses => {
      courses.forEach(course => {
        const li = document.createElement('li');
        li.innerText = `${course.name} (${course.credits} credits)`;
        list.appendChild(li);
      });
    });
}
