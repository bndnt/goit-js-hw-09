// Об'єкт для зберігання даних форми
const formData = {
  email: '',
  message: '',
};

// Отримуємо посилання на елементи форми
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

// Функція для збереження даних у локальне сховище
const saveFormData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

// Функція для завантаження даних з локального сховища
const loadFormData = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};

// Завантаження даних при завантаженні сторінки
window.addEventListener('DOMContentLoaded', loadFormData);

// Обробка події input для збереження даних у локальне сховище
form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value;
  saveFormData();
});

// Обробка події submit для перевірки та відправки даних
form.addEventListener('submit', event => {
  event.preventDefault();

  // Перевірка на заповненість полів
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  // Виведення даних у консоль
  console.log('Submitted form data:', formData);

  // Очищення даних
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
});
