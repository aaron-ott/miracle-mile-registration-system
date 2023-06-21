const nameInput = document.getElementById('name-input');
const buttonsContainer = document.getElementById('buttons');

const namesList = [];

async function get_names_list() {
  try{
    const request = (await fetch('/people')).json().then(result => namesList.push(...result));
  } catch (error) {
    console.log('Error:', error);
  }
}

get_names_list();

function showSubmitButton() {
  buttonsContainer.innerHTML = '<a href="/check-in-success" class="button button-green" onclick="postData(event);">Submit</a>';
  buttonsContainer.style.display = 'block';
}

function showRegisterButton() {
  buttonsContainer.innerHTML = '<a href="/register" class="button button-yellow">Register</a>';
  buttonsContainer.style.display = 'block';
}

function hideButtons() {
  buttonsContainer.innerHTML = '';
  buttonsContainer.style.display = 'none';
}

function hideDropdown() {
  dropdownList.style.display = 'none';
}

function showDropdown() {
  dropdownList.style.display = 'block';
}



const dropdownList = document.getElementById('dropdown-list');

function nameInputOrFocus() {
  const input = nameInput.value.trim();
  const matches = getMatches(input);

  if (input.length === 0) {
    hideDropdown();
  } else {
    showDropdown(matches);
  }
}

nameInput.addEventListener('input', nameInputOrFocus);

nameInput.addEventListener('focus', nameInputOrFocus);

nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    const activeItem = dropdownList.querySelector('.active');
    if (activeItem) {
      nameInput.value = activeItem.textContent;
      hideDropdown();
      hideButtons();
      showSubmitButton();
    }
  }
});

nameInput.addEventListener('blur', () => {
  setTimeout(hideDropdown, 200);
});


function getMatches(input) {
  const matches = namesList.filter(name => name.toLowerCase().startsWith(input.toLowerCase()));
  return matches.slice(0, 5);
}

function showDropdown(matches) {
  dropdownList.innerHTML = '';

  if (matches.length === 0) {
    hideDropdown();
    hideButtons();
    showRegisterButton();
  }

  if (matches.length === 1 && matches[0].toLowerCase().startsWith(nameInput.value.toLowerCase()) && matches[0].length == nameInput.value.length) {
    hideDropdown();
    hideButtons();
    showSubmitButton();
    return;
  } else {
    hideButtons();
    showRegisterButton();
  }

  for (let match of matches) {
    const dropdownItem = document.createElement('li');
    dropdownItem.classList.add('dropdown-item');
    dropdownItem.textContent = match;
    dropdownItem.addEventListener('click', () => {
      nameInput.value = match;
      hideDropdown();
      hideButtons();
      showSubmitButton();
    });
    dropdownList.appendChild(dropdownItem);
  }

  dropdownList.style.display = 'block';
  if (dropdownList.children.length > 0) {
    dropdownList.firstChild.classList.add('active');
  }
  
}


const postData = async (event) => {
  event.preventDefault(); // Prevent form submission
  try {
    const data = { name: nameInput.value };
    const response = await fetch('/checkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      // POST request successful, redirect to /success
      window.location.href = '/check-in-success';
    } else {
      // POST request failed
      console.log("Post request failed");
    return;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};